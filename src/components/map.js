import React from 'react';
import leaflet from 'leaflet';
import pin from '../img/pin.png';
import countryBoundaries from '../data/country_boundaries.js'

class Map extends React.Component {
  componentDidMount() {
    var mapWrapper = document.querySelector('.map-wrapper');
    var documentHeight = document.body.offsetHeight;

    function resizeMapWrapper() {
      mapWrapper.style.height = (documentHeight - mapWrapper.offsetTop) + 'px';
    }

    resizeMapWrapper()

    this.props.state.map = leaflet.map('map',{
      center: [43.64701, -79.39425],
      minZoom: 2,
      zoom: 3,
      maxBoundsViscosity: 0.1,
      attributionControl: false
      // zoomAnimation: false
    });

    this.props.state.map.setMaxBounds([[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]);

    this.greenIcon = leaflet.icon({
      iconUrl: pin,

      iconSize:     [37.5, 44], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [18.5, 44], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}').addTo(this.props.state.map);
    leaflet.geoJson(countryBoundaries, {
      style: {
      weight: 0.8,
      opacity: 0.4,
      color: 'black',
      //  dashArray: '3',
      fillOpacity: 0,
      //  fillColor: 'green'
      }
    }).addTo(this.props.state.map);
    // leaflet.marker([40.080000000000005, 116.58444444444444], {icon: this.greenIcon}).addTo(this.map);
    // leaflet.marker([45.322500000000005, -75.66916666666667], {icon: this.greenIcon}).addTo(this.map);

    

    // var markers = [];
    //
    // for (var i = 0; i < this.props.state.countries.length; i++) {
    //   markers.push([this.props.state.countries[i].latlng[0], this.props.state.countries[i].latlng[1]])
    // }
    //
    // var route = leaflet.featureGroup().addTo(this.map);
    //
    // var n = markers.length;
    //
    // for (var a = 0; a < n-1; a++) {
    //   var marker = new leaflet.Marker(markers[a]);
    //   route.addLayer(marker);
    // };

    // route.addLayer(new leaflet.Marker(markers[n-1]));

    // this.map.fitBounds(route.getBounds());

    for (var i = 0; i < this.props.state.countries.length; i++) {
      if(this.props.state.countries[i].independent) {
        this.props.state.countries[i].marker = leaflet.marker([this.props.state.countries[i].latlng[0], this.props.state.countries[i].latlng[1]], {icon: this.greenIcon}).addTo(this.props.state.map);
      }
    }


    window.addEventListener('resize', function() {
      documentHeight = document.body.offsetHeight;
      resizeMapWrapper();
    });
  }

  render() {
    return(
      <div className="map-wrapper">
        <div className="map" id="map">
        </div>
      </div>
    );
  }
}

export default Map;
