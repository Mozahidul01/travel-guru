import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '400px' }}>

        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text=  " hotel, Bangladesh"
            
          />
        </GoogleMapReact>
        
      </div>
    );
  }
}

export default GMap;