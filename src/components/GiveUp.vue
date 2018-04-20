<template>
  <button class="btn-1" @click="restartGame" v-if="$store.state.gameOver">Restart</button>
  <button class="btn-1" @click="endGame" v-else>Give Up</button>
</template>

<script>
import leaflet from 'leaflet';

export default {
  name: 'HeaderLeft',
  data() {
    return {
      endgameMarkers: []
    }
  },
  methods: {
    restartGame () {
      this.$store.dispatch('restartGame');
      for (let i = 0; i < this.endgameMarkers.length; i++) {
        this.$store.state.leaflet.removeLayer(this.endgameMarkers[i]);
      }
    },
    setMarker (i, a, name) {
      var myIcon = leaflet.divIcon({ 
        iconSize: new leaflet.Point(62, 4), 
        html: name,
        className: 'label',
      });
      this.endgameMarkers.push(leaflet.marker([this.$store.state.continents[i].countries[a].latlng[0], this.$store.state.continents[i].countries[a].latlng[1]], {icon: myIcon}))
    },
    endGame: function () {        
      for (let i = 0; i < this.$store.state.continents.length; i++) {
        for (let a = 0; a < this.$store.state.continents[i].countries.length; a++) {
          if(this.$store.state.continents[i].countries[a].independent) {

            if (this.$store.state.gameType === 'countries') {
              if (!this.$store.state.continents[i].countries[a].answeredCountry) {
                this.setMarker(i, a, this.$store.state.continents[i].countries[a].name);
              }
            } else if (this.$store.state.gameType === 'capitals') {
              if (!this.$store.state.continents[i].countries[a].answeredCapital) {
                this.setMarker(i, a, this.$store.state.continents[i].countries[a].name + ', ' + this.$store.state.continents[i].countries[a].capital);
              }
            } else {
              if (!this.$store.state.continents[i].countries[a].answeredCountry && !this.$store.state.continents[i].countries[a].answeredCapital) {
                this.setMarker(i, a, this.$store.state.continents[i].countries[a].name + ', ' + this.$store.state.continents[i].countries[a].capital);
              } else if (!this.$store.state.continents[i].countries[a].answeredCountry) {
                this.setMarker(i, a, this.$store.state.continents[i].countries[a].name);
              } else if (!this.$store.state.continents[i].countries[a].answeredCapital) {
                this.setMarker(i, a, this.$store.state.continents[i].countries[a].capital);
              }
            }

          }
        }
      }
    
    for (let i = 0; i < this.endgameMarkers.length; i++) {
      this.endgameMarkers[i].addTo(this.$store.state.leaflet);
    }

    this.$store.commit('gameOver');
    }
  },
} // export default

</script>
<style scoped>
</style>
