<template>
  <div class="answer-box">
    <input type="text" v-model="inputValue" v-on:keyup="submitAnswer" :disabled="$store.state.gameOver" />
    <div class="view">
      <button class="view__button" @click="toggleList">Toggle List</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerBox',
  data: function () {
    return {
      inputValue: ''
    }
  },
  methods: {
    toggleList () {
      this.$store.commit('toggleList');
    },
    submitAnswer (e) {
      if (this.inputValue) {
        const countries = this.$store.state.countries;

        for (let i = 0; i < countries.length; i++) {

          // ------------------
          // Check country name
          // ------------------

          // If the input matches a country name
          if(countries[i].name.toLowerCase() === this.inputValue.toLowerCase()) {
            if (countries[i].independent && !countries[i].answeredCountry) {
              this.$store.commit('markCountry', i);
              this.inputValue = '';
              if (countries[i].answeredCapital) {
                this.$store.commit('clearMarker', i);
              } else {
                this.$store.commit('changeMarker', i);
              }
              break;
            }
          }

          // If the input matches an alternative spelling of the country name
          for (var a = 0; a < countries[i].altSpellings.length; a++) {
            if(countries[i].altSpellings[a].toLowerCase() === this.inputValue.toLowerCase()) {
              if (countries[i].independent && !countries[i].answeredCountry) {
                this.$store.commit('markCountry', i);
                this.inputValue = '';
                if (countries[i].answeredCapital) {
                  this.$store.commit('clearMarker', i);
                } else {
                  this.$store.commit('changeMarker', i);
                }
                break;
              }
            }
          }

          // ------------------
          // Check capital name
          // ------------------

          // If the input matches the capital name
          if(countries[i].capital.toLowerCase() === this.inputValue.toLowerCase()) {
            if (countries[i].independent && !countries[i].answeredCapital) {
              this.$store.commit('markCapital', i);
              this.inputValue = '';
              if (countries[i].answeredCountry) {
                this.$store.commit('clearMarker', i);
              }
              break;
            }
          }

          // If the input matches an alternative spelling of a capital name
          if(countries[i].altCapitalSpellings) {
            for (var b = 0; b < countries[i].altCapitalSpellings.length; b++) {
              if(countries[i].altCapitalSpellings[b].toLowerCase() === this.inputValue.toLowerCase()) {
                if (countries[i].independent && !countries[i].answeredCapital) {
                  this.$store.commit('markCapital', i);
                  this.inputValue = '';
                  if (countries[i].answeredCountry) {
                    this.$store.commit('clearMarker', i);
                  }
                  break;
                }
              }
            }
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
    width: 33.333333333%;
    border-left: 1px dashed lightgrey;
    border-right: 1px dashed lightgrey;
    padding: 20px 0;
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

  .view__button {
    font-size: 14px;
    border: 1px solid grey;
    background: white;
    margin-left: 10px;
  }

  .view__button--active {
    background: lightgrey;
  }
</style>
