import React, { useState } from 'react';
import './Booking.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Places from '../../FakeData/Places';
import DatePicker from "react-datepicker";
import calender from '../../Images/icons/calender_icon.png';
import "react-datepicker/dist/react-datepicker.css";


const Booking = () => {

    const { id } = useParams()
    const places = [...Places];
    const data = places[id];
    const { name, details } = data;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    return (
        <div className="booking">
            <Container>
                <Row >
                    
                    <Col md={6}>
                        <Link to="/" className='back-btn'> <FontAwesomeIcon icon={faArrowLeft}/> Back</Link>
                        
                        <div className="place-details">
                            <h1 className="place-details-name-style">{name}</h1>
                            <p className="details-style">{details}</p>
                        </div>
                    </Col>
                   
                    <Col md={6}>
                        <div className="booking-area">
                       
                            <form action="" className="booking-form">
                                
                                <label htmlFor="Origin">Origin</label>
                                <input className="booking-place" defaultValue="Dhaka" type="text" required />
                                <label htmlFor="Destination">Destination</label>
                                <input className="booking-place" value={name} type="text" required />
                                
                                <div className="d-flex justify-content-between">
                                
                                    <div className="date">
                                            <label>From</label><br />
                                            <div className="d-flex wrap date-input">
                                                <img src={calender} height="20" alt=""/>
                                                <DatePicker className="date-field" closeOnScroll={true} selected={startDate} calendarIcon onChange={date => setStartDate(date)}/>
                                            </div>
                                        </div>
                                        
                                        <div className="date">
                                            <label>To</label>
                                            <div className="d-flex wrap date-input">
                                                <img src={calender} height="20" alt=""/>
                                                <DatePicker className="date-field" closeOnScroll={true} selected={endDate} calendarIcon onChange={date => setEndDate(date)}/>
                                            </div>
                                        </div>
                                    
                                </div>
                                <br/>
                                
                                <Link to={`/hotels/${data.name}`}><button className="book-btn" type="submit">Start Booking</button></Link>
                            </form>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Booking;