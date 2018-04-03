<template>
  <button class="btn-1" :disabled="$store.state.gameOver" @click="endGame">Give Up</button>
</template>

<script>
import leaflet from 'leaflet';

export default {
  name: 'HeaderLeft',
  methods: {
    getCountryName (i, that) {
      if (!that.$store.state.countries[i].answeredCountry) {
        return that.$store.state.countries[i].name;
      }
    },
    getCapitalName (i, that) {
      if (!that.$store.state.countries[i].answeredCapital) {
        return that.$store.state.countries[i].capital;
      }
    },
    setMarker (i, name) {      
      var myIcon = leaflet.divIcon({ 
        iconSize: new leaflet.Point(62, 4), 
        html: name,
        className: 'label'
      });
      leaflet.marker([this.$store.state.countries[i].latlng[0], this.$store.state.countries[i].latlng[1]], {icon: myIcon}).addTo(this.$store.state.leaflet)
    },
    endGame: function () {
      if (!this.$store.state.gameOver) {
        for (var i = 0; i < this.$store.state.countries.length; i++) {
          if(this.$store.state.countries[i].independent) {

            if (this.$store.state.gameType === 'countries') {
              if (!this.$store.state.countries[i].answeredCountry) {
                this.setMarker(i, this.getCountryName(i, this));
              }
            } else if (this.$store.state.gameType === 'capitals') {
              if (!this.$store.state.countries[i].answeredCapital) {
                this.setMarker(i, this.getCapitalName(i, this));
              }
            } else {
              if (!this.$store.state.countries[i].answeredCountry && !this.$store.state.countries[i].answeredCapital) {
                this.setMarker(i, this.getCountryName(i, this) + ', ' + this.getCapitalName(i, this));
              } else if (!this.$store.state.countries[i].answeredCountry) {
                this.setMarker(i, this.getCountryName(i, this));
              } else {
                this.setMarker(i, this.getCapitalName(i, this));
              }
            }

            this.$store.commit('gameOver');
          }
        }
      }
    }
  },
} // export default

</script>
<style scoped>
</style>
