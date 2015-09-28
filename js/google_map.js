var map;

// Update the query sent to the Fusion Table Layer based on correctAnswers
function updateMap(layer, tableId, locationColumn) {
  layer.setOptions({
    query: {
      select: 'geometry',
      from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
      where: "ISO_2DIGIT IN (" + correctAnswers.join(", ") + ")"
    }
  });
}

function initialize() {

  var mapCanvas = document.getElementById('map');

  // Google map styles
  var styles = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      featureType: "road",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  // Initial map options
  var mapOptions = {
    center: {lat: 34.047863, lng: 100.619655},
    zoom: 3,
    minZoom: 3,
    maxZoom: 8,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  }

  map = new google.maps.Map(mapCanvas, mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var tableId = '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk';
  var locationColumn = 'geometry';

  // Styling and data for the country outlines
  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: locationColumn,
      from: tableId,
      where: "ISO_2DIGIT IN ('')"
    },
    options : {suppressInfoWindows:true},
    styles: [{
      polygonOptions: {
        fillColor: "#000000",
        strokeWeight: "0",
        fillOpacity: 0.4
      }
    }]
  });

  layer.setMap(map);

  // Update the query sent to the Fusion Table Layer based on correctAnswers
  google.maps.event.addDomListener(document.getElementById('invisibleButton'),
  'click', function() {
    updateMap(layer, tableId, locationColumn);
  });
}

$(document).ready(function(){

  // Initialize the google map
  initialize();

});
