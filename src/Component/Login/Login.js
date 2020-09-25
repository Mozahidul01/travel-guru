import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { PlaceContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import { Col, Container, Row } from 'react-bootstrap';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(PlaceContext)
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isLogin: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirectAuth) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirectAuth) {
            history.replace(from);
        }
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const googleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const userInfo = {
                    isLogin: true,
                    name: displayName,
                    email: email
                }
                handleResponse(userInfo, true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const fbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const userInfo = {
                    isLogin: true,
                    name: displayName,
                    email: email
                }
                handleResponse(userInfo, true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleLogOut = () => {
        firebase.auth().signOut()
            .then(() => {
                const userInfo = {
                    isLogin: false,
                    name: '',
                    email: ''
                }
                handleResponse(userInfo, false)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleBlur = (event) => {
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isFormValid = event.target.value.length >= 6;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    handleResponse(newUserInfo, true);
                    updateNewUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    handleResponse(newUserInfo, true)
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        event.preventDefault();
    }

    const updateNewUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        })
            .then(() => {
                console.log("user name updated")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Container>
        
            <Row className="justify-content-md-center">
                <Col md={6}>
                
                    <form className="form-box" onSubmit={handleSubmit} >
                        {
                            newUser && <>
                                <input className="input-field" name="lastName" type="text" onBlur={handleBlur} placeholder="Your first name" />
                                
                                <input className="input-field" name="lastName" type="text" onBlur={handleBlur} placeholder="Your last name" />
                                
                                <input className="input-field" name="name" type="text" onBlur={handleBlur} placeholder="Your full name" required />
                            </>
                        }
                        <input className="input-field" type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email " required />

                        <input className="input-field" type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required /><br/>
                        
                        <div className="new-user">
                            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
                            <label htmlFor="newUser">Create New User</label>
                        </div>
                        
                        <input className="signIn-btn" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                        
                    </form>
                    
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col md={6} className="google-login">
                    {
                        user.isLogin ? <button onClick={handleLogOut}>LogOut</button> : <button onClick={googleLogin}>Continue with Google</button>
                    }
                </Col>
            </Row>
            
            <Row className="justify-content-md-center">
                <Col md={6} className="fb-login">
                    <button onClick={fbSignIn}>Continue with Facebook</button>
                </Col>
            </Row>
            
        </Container>
    );
};

export default Login;