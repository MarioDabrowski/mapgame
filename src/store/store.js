import Vue from 'vue'
import Vuex from 'vuex'
import countries from './../assets/countries.js';
import pin from './../assets/pin_blue.png';
import pinRed from './../assets/pin.png';
import leaflet from 'leaflet';

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    gameType: null,
    timeLimit: null,
    remainingTime: null,
    countdownEvent: null,
    options: {
      pan: true,
      enter: true
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
  actions: {
    restartGame (context) {
      context.commit('resetGame');
      context.commit('populateMarkers');
    }
  },
  mutations: {
    gameOver (state) {
      state.gameOver = true;
      stopClock(state);
    },
    resetGame (state) {
      state.remainingTime = state.timeLimit;
      state.gameOver = false;
      state.correctCountries = 0;
      state.correctCapitals = 0;

      for (let i = 0; i < state.continents.length; i++) {
        state.continents[i].correctCapitals = 0;
        state.continents[i].correctCountries = 0;

        for (let a = 0; a < state.continents[i].countries.length; a++) {
          state.continents[i].countries[a].answeredCapital = false;
          state.continents[i].countries[a].answeredCountry = false;
          state.continents[i].countries[a].marker = null;
        }
      }
    },
    setGameType (state, type) {
      state.gameType = type;
    },
    setTimeLimit (state, limit) {
      state.timeLimit = limit;
      state.remainingTime = limit;
    },
    setOptionsPan (state) {
      state.options.pan = !state.options.pan;
    },
    setOptionsEnter (state) {
      state.options.enter = !state.options.enter;
    },
    countIndependent (state) {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].independent) {
          state.independentCountries += 1;
        }
      }
    },
    populateContinents (state) {
      // Split out the countries into seperate continent objects
      for (let i = 0; i < state.continents.length; i++) {
        for (let a = 0; a < countries.length; a++) {
          if(countries[a].region === state.continents[i].location && countries[a].independent) {
            state.continents[i].countries.push(countries[a]);
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
    markCountry (state, indexes) {
      state.correctCountries += 1;
      state.continents[indexes[0]].correctCountries += 1;
      state.continents[indexes[0]].countries[indexes[1]].answeredCountry = true;

      if (state.options.pan) {
        state.leaflet.panTo(new leaflet.LatLng(state.continents[indexes[0]].countries[indexes[1]].latlng[0], state.continents[indexes[0]].countries[indexes[1]].latlng[1]));
      }

      beginClock(state);
      checkForCompleteGame(state);
    },
    markCapital (state, indexes) {
      state.correctCapitals += 1;
      state.continents[indexes[0]].correctCapitals += 1;
      state.continents[indexes[0]].countries[indexes[1]].answeredCapital = true;

      if (state.options.pan) {
        state.leaflet.panTo(new leaflet.LatLng(state.continents[indexes[0]].countries[indexes[1]].latlng[0], state.continents[indexes[0]].countries[indexes[1]].latlng[1]));
      }

      beginClock(state);
      checkForCompleteGame(state);
    },
    populateMarkers (state) {
      var redIcon = leaflet.icon({
        iconUrl: pinRed,
        iconSize:     [9, 16], // size of the icon
        className: 'marker-countries'
      });

      console.log('adding markers');

      for (let i = 0; i < state.continents.length; i++) {
        for (let a = 0; a < state.continents[i].countries.length; a++) {
          state.continents[i].countries[a].marker = leaflet.marker(
            [state.continents[i].countries[a].latlng[0], state.continents[i].countries[a].latlng[1]],
            {icon: redIcon}
          ).addTo(state.leaflet);
        }
      }
    },
    clearMarker (state, indexes) {
      state.leaflet.removeLayer(state.continents[indexes[0]].countries[indexes[1]].marker);
      state.continents[indexes[0]].countries[indexes[1]].marker = null;
    },
    changeMarker (state, indexes) {
      var blueIcon = leaflet.icon({
        iconUrl: pin,
        iconSize:     [9, 16], // size of the icon
        iconAnchor:   [4, 8], // point of the icon which will correspond to marker's location
        className: 'marker-countries'
      });

      state.continents[indexes[0]].countries[indexes[1]].marker.setIcon(blueIcon);
    }
  }
})

function beginClock(state) {
  if (!state.countdownEvent) {
    if (state.remainingTime > 0) {
      state.countdownEvent = window.setInterval(() => {
        state.remainingTime -= 1;

        if (state.remainingTime <= 0) {
          state.gameOver = true;
          clearInterval(state.countdownEvent);
        }
      }, 1000);
    }
  }
}

function stopClock(state) {
  if (state.countdownEvent) {
    clearInterval(state.countdownEvent);
  }
}

function checkForCompleteGame(state) {
  if (state.gameType === 'countries') {
    if (state.correctCountries === state.independentCountries) {
      store.commit('gameOver');
    }
  } else if (state.gameType === 'capitals') {
    if (state.correctCapitals === state.independentCountries) {
      store.commit('gameOver');
    }
  } else {
    if (state.correctCapitals === state.independentCountries && state.correctCountries === state.independentCountries) {
      store.commit('gameOver');
    }
  }
}

export default store;