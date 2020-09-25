import React from 'react';

const HotelInfo = (props) => {
    const {id, image, title, type, type1, type2, star, dollars} = props.hotelInfo;
    
    return (
        <div className='d-flex mb-5'>

            <div>
                <img style={{width:'180px', height:'180px'}} src={image} alt=""/>
            </div>
            
            <div className='ml-2'>
                <h6>{title}</h6>
                <p>{type}</p>
                <p>{type1}</p>
                <p>{type2}</p> 

                <div className="d-flex">
                    <h6>{star}</h6>
                    <h6 className="ml-3">{dollars}</h6>
                </div>
                
            </div>

        </div>
    );
};

export default HotelInfo;