import React from 'react';
import leaflet from 'leaflet';
import pin from '../img/pin.png';
import countryBoundaries from '../data/country_boundaries.js'

class Map extends React.Component {
  constructor() {
    super();

    this.showHidePins = this.showHidePins.bind(this);
  }

  componentDidMount() {
    var mapWrapper = document.querySelector('.map-wrapper');
    var documentHeight = document.body.offsetHeight;

    function resizeMapWrapper() {
      mapWrapper.style.height = (documentHeight - mapWrapper.offsetTop) + 'px';
    }

    resizeMapWrapper()

    // Initialize the map
    this.props.state.map = leaflet.map('map',{
      center: [43.64701, -79.39425],
      minZoom: 2,
      zoom: 3,
      maxBoundsViscosity: 0.1,
      attributionControl: false
      // zoomAnimation: false
    });

    // Don't allow people to pan out of the map
    this.props.state.map.setMaxBounds([[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]);

    this.greenIcon = leaflet.icon({
      iconUrl: pin,
      iconSize:     [9, 16], // size of the icon
      iconAnchor:   [4, 8], // point of the icon which will correspond to marker's location
      className: 'marker-countries'
    });

    // Add the map image tiles
    leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}').addTo(this.props.state.map);

    // Add the country outlines
    var geoJsonCountries = leaflet.geoJson(countryBoundaries, {
      style: function (feature, layer) {
        return {
          weight: 0.8,
          opacity: 0.2,
          color: 'black',
          fillOpacity: 0,
          className: feature.id,
        }
      }
    }).addTo(this.props.state.map);

    console.log(geoJsonCountries.getLayer(23));

    // Add the country pins
    for (var i = 0; i < this.props.state.countries.length; i++) {
      if(this.props.state.countries[i].independent) {
        this.props.state.countries[i].marker = leaflet.marker([this.props.state.countries[i].latlng[0], this.props.state.countries[i].latlng[1]], {icon: this.greenIcon}).addTo(this.props.state.map);
      }
    }

    //
    // for (var b = 0; b < this.props.state.countries.length; b++) {
    //   if(this.props.state.countries[b].answeredCountry) {
    //     console.log('answered');
    //     var shape = document.querySelectorAll('path.' + self.props.state.countries[b].countryCode);
    //     console.log(shape);
    //
    //     for (var a = 0; a < shape.length; a++) {
    //       shape[a].setAttribute('fill-opacity', 0.3);
    //       console.log('hello');
    //     }
    //   }
    // }
    // for (let i = 0; i < geoJson._layers.length; i++) {
    //   console.log(geoJson._layers[i].options.className);
    // }

    console.log(leaflet);

    // When the window is resized update the height of the map-wrapper
    window.addEventListener('resize', function() {
      documentHeight = document.body.offsetHeight;
      resizeMapWrapper();
    });
  }

  showHidePins() {
    this.mapWrapper.classList.toggle('markers-hidden');
  }

  render() {
    return(
      <div className="map-wrapper" ref={(mapWrapper) => {this.mapWrapper = mapWrapper}}>
        <div className="map" id="map">
          <div className="map__legend">
            <button className="show-hide" onClick={this.showHidePins}>Pin what's left</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
