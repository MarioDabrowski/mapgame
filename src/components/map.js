import React from 'react';

class Map extends React.Component {
  render() {
    return(
      <div className="map" ref={(map) => {this.map = map}}>
        Map
      </div>
    );
  }
}

export default Map;
