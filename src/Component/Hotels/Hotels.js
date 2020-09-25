import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlaceContext } from '../../App';
import HotelData from '../../FakeData/Hotels';
import HotelInfo from '../HotelInfo/HotelInfo';
import GMap from '../GMap/GMap';

const Hotels = () => {
    const [place, setPlace] = useContext(PlaceContext)

    return (
        <div>
            
            <div className="mt-5 d-flex">

                <div style={{width: '50%'}} className="ml-5">
                    <p>252 stays Sep 21-20 3 guests</p>
                    <h4>Stay in Sajek Valley</h4>  
                    {/* {place.place}  */}

                    {
                        HotelData.map(info => <HotelInfo key={info.id} hotelInfo={info}></HotelInfo>)
                    }
                </div>

                <div className="ml-5">
                    <GMap></GMap>
                </div>
                
            </div>
        </div>
    );
};

export default Hotels;