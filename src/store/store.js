import Vue from 'vue'
import Vuex from 'vuex'
import countries from './../assets/countries.js';
import pin from './../assets/pin_blue.png';
import leaflet from 'leaflet';

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    countries,
    gameType: null,
    options: {
      pan: null,
      enter: null
    },
    gameOver: false,
    leaflet: null,
    listActive: false,
    correctCountries: 0,
    correctCapitals: 0,
    independentCountries: 0,
    continents: [
      {
        location: 'North America',
        countries: [],
        correctCountries: 0,
        correctCapitals: 0
      },
      {
        location: 'South America',
        countries: [],
        correctCountries: 0,
        correctCapitals: 0
      },
      {
        location: 'Europe',
        countries: [],
        correctCountries: 0,
        correctCapitals: 0
      },
      {
        location: 'Africa',
        countries: [],
        correctCountries: 0,
        correctCapitals: 0
      },
      {
        location: 'Asia',
        countries: [],
        correctCountries: 0,
        correctCapitals: 0
      },
      {
        location: 'Oceania',
        countries: [],
        correctCountries: 0,
        correctCapitals: 0
      }
    ]
  },
  mutations: {
    gameOver (state) {
      state.gameOver = true;
    },
    setGameType (state, type) {
      state.gameType = type;
    },
    setOptions (state, options) {
      state.options = options;
    },
    countIndependent (state) {
      for (let i = 0; i < state.countries.length; i++) {
        if (state.countries[i].independent) {
          state.independentCountries += 1;
        }
      }
    },
    populateContinents (state) {
      // Split out the countries into seperate continent objects
      for (let i = 0; i < state.continents.length; i++) {
        for (let a = 0; a < state.countries.length; a++) {
          if(state.countries[a].region === state.continents[i].location && this.state.countries[a].independent) {
            state.continents[i].countries.push(state.countries[a]);
          }
        }
      }
    },
    toggleList (state) {
      state.listActive = !state.listActive;
    },
    initializeMap (state, reference) {
      state.leaflet = reference;
    },
    markCountry (state, index) {
      state.countries[index].answeredCountry = true;
      state.correctCountries += 1;
      
      for (let i = 0; i < state.continents.length; i++) {
        if (state.continents[i].location === state.countries[index].region) {
          state.continents[i].correctCountries += 1;

          for (let a = 0; a < state.continents[i].countries; a++) {
            if (state.continents[i].countries[a].name === state.countries[index].name) {
              state.continents[i].countries[a].answeredCountry = true;
              break;
            }
          }

          if (state.options.pan) {
            state.leaflet.panTo(new leaflet.LatLng(state.countries[index].latlng[0], state.countries[index].latlng[1]));
          }

          break;
        }
      }
    },
    markCapital (state, index) {
      state.countries[index].answeredCapital = true
      state.correctCapitals += 1;

      for (let i = 0; i < state.continents.length; i++) {
        if (state.continents[i].location === state.countries[index].region) {
          state.continents[i].correctCapitals += 1;

          for (let a = 0; a < state.continents[i].countries; a++) {
            if (state.continents[i].countries[a].name === state.countries[index].name) {
              state.continents[i].countries[a].answeredCapital = true;
              break;
            }
          }

          if (state.options.pan) {
            state.leaflet.panTo(new leaflet.LatLng(state.countries[index].latlng[0], state.countries[index].latlng[1]));
          }

          break;
        }
      }
    },
    clearMarker (state, index) {
      state.leaflet.removeLayer(state.countries[index].marker);
    },
    changeMarker (state, index) {
      var blueIcon = leaflet.icon({
        iconUrl: pin,
        iconSize:     [9, 16], // size of the icon
        iconAnchor:   [4, 8], // point of the icon which will correspond to marker's location
        className: 'marker-countries'
      });

      state.countries[index].marker.setIcon(blueIcon);
    }
  }
})

export default store;