<template>
  <div class="answer-box">
    <input type="text" v-if="$store.state.options.enter" v-model="inputValue" v-on:keyup="submitAnswer" :disabled="$store.state.gameOver" />
    <input type="text" v-else v-model="inputValue" v-on:keyup.enter="submitAnswer" :disabled="$store.state.gameOver" />
    <div class="view">
      <button class="btn-1" @click="toggleList">Toggle List</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerBox',
  data: function () {
    return {
      inputValue: '',
      breakLoop: false
    }
  },
  methods: {
    toggleList () {
      this.$store.commit('toggleList');
    },
    updatePin (countries, i) {
      // Change markers based no game type
      if (this.$store.state.gameType === 'countriesCapitals') {
        if (countries[i].answeredCapital && countries[i].answeredCountry) {
          this.$store.commit('clearMarker', i);
        } else if (countries[i].answeredCountry) {
          this.$store.commit('changeMarker', i);
        }
      } else {
        this.$store.commit('clearMarker', i);
      }
    },
    checkCountry (countries, i) {
      // If the input matches a country name
      if(countries[i].name.toLowerCase() === this.inputValue.toLowerCase()) {
        if (countries[i].independent && !countries[i].answeredCountry) {
          this.$store.commit('markCountry', i);
          this.inputValue = '';

          this.updatePin(countries, i);
          this.breakLoop = true;
        }
      }

      // If the input matches an alternative spelling of the country name
      for (var a = 0; a < countries[i].altSpellings.length; a++) {
        if(countries[i].altSpellings[a].toLowerCase() === this.inputValue.toLowerCase()) {
          if (countries[i].independent && !countries[i].answeredCountry) {
            this.$store.commit('markCountry', i);
            this.inputValue = '';

            this.updatePin(countries, i);
            this.breakLoop = true;
          }
        }
      }
    },
    checkCapital (countries, i) {
      // If the input matches the capital name
      if(countries[i].capital.toLowerCase() === this.inputValue.toLowerCase()) {
        if (countries[i].independent && !countries[i].answeredCapital) {
          this.$store.commit('markCapital', i);
          this.inputValue = '';

          this.updatePin(countries, i);
          this.breakLoop = true;
        }
      }

      // If the input matches an alternative spelling of a capital name
      if(countries[i].altCapitalSpellings) {
        for (var b = 0; b < countries[i].altCapitalSpellings.length; b++) {
          if(countries[i].altCapitalSpellings[b].toLowerCase() === this.inputValue.toLowerCase()) {
            if (countries[i].independent && !countries[i].answeredCapital) {
              this.$store.commit('markCapital', i);
              this.inputValue = '';
              
              this.updatePin(countries, i);
              this.breakLoop = true;
            }
          }
        }
      }
    },
    submitAnswer (e) {
      if (this.inputValue) {
        const countries = this.$store.state.countries;
        this.breakLoop = false;

        for (let i = 0; i < countries.length; i++) {
          if (this.breakLoop) break;

          if (this.$store.state.gameType === 'countries') {
            this.checkCountry(countries, i);
          } else if (this.$store.state.gameType === 'capitals') {
            this.checkCapital(countries, i);
          } else {
            this.checkCountry(countries, i);
            this.checkCapital(countries, i);
          }
        }
      }
    }
  }
} // export default

</script>
<style scoped>
  .answer-box {
    text-align: center;
    width: calc(33.333333333% + 1px);
    border-left: 1px solid #0c0404;
    border-right: 1px solid #959595;
    padding: 20px 0;
    position: relative;
    left: -1px;
  }

  .answer-box input {
    width: 75%;
    height: 50px;
    font-size: 30px;
    text-align: center;
  }

  .view {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
</style>
