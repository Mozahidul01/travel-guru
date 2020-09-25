import React, { useState } from 'react';
import './Home.css'
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sajek from '../../Images/Sajek.png';
import sundorbon from '../../Images/sundorbon.png';
import sreemongol from '../../Images/Sreemongol.png'
import Places from '../../FakeData/Places';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const place = [...Places]
    const [value, setValue] = useState(place[0]);
    const placeClick = (id) => {
        setValue(place[id]);
    };
    
    return (
        <div className="home">
            <Container fluid>
                <Row >
                    <Col md={5}>
                        <div className="place-details">
                            <h1 className="place-details-name-style">{value.name}</h1>
                            <p className="details-style">{value.details}</p>
                        </div>
                        <Link to={`/travel/${value.id}`} className="booking-btn">Booking <FontAwesomeIcon icon={faArrowRight}/></Link>
                    </Col>
                    
                   
                    <Col  md={7}>
                    
                        <div>
                            
                            <button onClick={() => placeClick(0)} className="place-btn">
                                <img src={sajek}  className="card-img img-responsive" alt="" />
                                <div class="place-name">
                                    <h4>Sajek valley</h4>
                                </div>
                            </button>
                            
                            <button onClick={() => placeClick(1)} className="place-btn">
                                <img src={sreemongol} className="card-img" alt="" />
                                <div class="place-name">
                                    <h4>Sreemangal</h4>
                                </div>
                            </button>
                            
                            <button onClick={() => placeClick(2)} className="place-btn">
                                <img src={sundorbon} className="card-img" alt="" />
                                <div class="place-name">
                                    <h4>Sundarban</h4>
                                </div>
                            </button>
                            
                        </div>
        
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;