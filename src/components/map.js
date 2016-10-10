import React from 'react';
import svgPanZoom from 'svg-pan-zoom';
import countrySvg from '../countrySvg';

class Map extends React.Component {
  constructor() {
    super();

    var self = this;
    var zoom;
    var customPanBy;
  }

  componentDidMount() {
    var mapImage = document.querySelector('.map__image');
    var usedSpace = this.map.offsetTop;
    var documentHeight = document.body.offsetHeight;
    var self = this;

    function resizeMap() {
      document.querySelector('.map').style.height = (documentHeight - usedSpace) + 'px';
    }

    resizeMap();

    this.zoom = svgPanZoom(mapImage, {
      viewportSelector: '.svg-pan-zoom_viewport'
      , panEnabled: true
      , controlIconsEnabled: true
      , zoomEnabled: true
      , mouseWheelZoomEnabled: true
      , preventMouseEventsDefault: true
      , zoomScaleSensitivity: 0.2
      , minZoom: 0.9
      , maxZoom: 100
      , center: true
      , refreshRate: 'auto'
      , contain: true
    });

    this.customPanBy = function(amount){ // {x: 1, y: 2}
      var animationTime = 300 // ms
      , animationStepTime = 15 // one frame per 30 ms
      , animationSteps = animationTime / animationStepTime
      , animationStep = 0
      , intervalID = null
      , stepX = amount.x / animationSteps
      , stepY = amount.y / animationSteps

      intervalID = setInterval(function(){
        if (animationStep++ < animationSteps) {
          self.zoom.panBy({x: stepX, y: stepY})
        } else {
          // Cancel interval
          clearInterval(intervalID)
        }
      }, animationStepTime)
    };

    this.zoom.zoom(2);

    window.addEventListener('resize', function() {
      documentHeight = document.body.offsetHeight;

      resizeMap();
      this.zoom.resize();
      this.zoom.fit();
      this.zoom.center();
    });

  }

  buttonClick() {
    var paths = document.querySelectorAll('path');
    var pathDraw = paths[1].getAttribute('d');
    var pathDimensions = paths[36].getBoundingClientRect();
    var pathCenter = {x: Math.round(pathDimensions.left + (pathDimensions.width/2)), y: Math.round(pathDimensions.top)}

    console.log(pathCenter.x);
    console.log(pathCenter.y);
    // console.log(pathCenter.x + ' ' + pathCenter.y);

    // 480.487,331.376
    // 633.699,388.616

    // Pan by any values from -80 to 80
    // this.zoom.panBy=({x: pathCenter.x, y: pathCenter.y})
    this.customPanBy({x: pathCenter.x , y: pathCenter.y});
    console.log('after');
  }

  render() {
    var self = this;

    return(
      <div className="map" ref={(map) => {this.map = map}}>
      <button className="test" onClick={this.buttonClick.bind(this)}>Click me</button>

      <svg className="map__image" x="0px" y="0px" viewBox="0 0 1009.6 666">
        <g>

        {
          countrySvg.map(function(item) {
            var countryId;

            for (var i = 0; i < self.props.state.countries.length; i++) {
              if(self.props.state.countries[i].alpha2Code === item.id) {
                countryId = i;
              }
            }

            if(self.props.state.countries[countryId].independent) {
              return <path id={item.id} title={item.title} className={(self.props.state.countries[countryId].answeredCountry) ? 'land land--active' : 'land'} d={item.d} key={item.id} />;
            } else {
              return <path id={item.id} title={item.title} className="land land--not-independent" d={item.d} key={item.id} />;
            }
          })
        }

        </g>
      </svg>
      </div>
    );
  }
}

export default Map;
