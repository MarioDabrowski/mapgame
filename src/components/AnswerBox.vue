<template>
  <div class="answer-box">
    <div class="input-wrapper">
      <div class="duplicate-answer" ref="duplicate-answer">Already counted</div>
      <input type="text" ref="answerInput" v-if="$store.state.options.enter" v-model="inputValue" v-on:keyup="submitAnswer" :disabled="$store.state.gameOver" />
      <input type="text" ref="answerInput" v-else v-model="inputValue" v-on:keyup.enter="submitAnswer" :disabled="$store.state.gameOver" />
    </div>
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
  mounted() {
    this.$refs.answerInput.focus();
  },
  methods: {
    dupicateAnswer (answer) {
      if (answer !== 'dominica' && answer !== 'niger' && answer !== 'tunis') {
        let that = this;
        this.$refs['duplicate-answer'].classList.add('duplicate-answer--active');
        let interval = setInterval(function () {
          that.$refs['duplicate-answer'].classList.remove('duplicate-answer--active');
          clearInterval(interval);
          that.$refs.answerInput.value = '';
        }, 700);
      }
    },
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
      let answer = this.inputValue.toLowerCase();
      // If the input matches a country name
      if(countries[i].name.toLowerCase() === answer) {
        if (countries[i].independent) {
          if (!countries[i].answeredCountry) {
            this.$store.commit('markCountry', i);
            this.inputValue = '';

            this.updatePin(countries, i);
            this.breakLoop = true;
          } else {
            this.dupicateAnswer(answer);
          }
        }
      }

      // If the input matches an alternative spelling of the country name
      for (var a = 0; a < countries[i].altSpellings.length; a++) {
        let answer = this.inputValue.toLowerCase();

        if(countries[i].altSpellings[a].toLowerCase() === answer) {
          if (countries[i].independent) {
            if (!countries[i].answeredCountry) {
              this.$store.commit('markCountry', i);
              this.inputValue = '';

              this.updatePin(countries, i);
              this.breakLoop = true;
            } else {
              this.dupicateAnswer(answer);
            }
          }
        }
      }
    },
    checkCapital (countries, i) {
      let answer = this.inputValue.toLowerCase();

      // If the input matches the capital name
      if(countries[i].capital.toLowerCase() === answer) {
        if (countries[i].independent) {
          if (!countries[i].answeredCapital) {
            this.$store.commit('markCapital', i);
            this.inputValue = '';

            this.updatePin(countries, i);
            this.breakLoop = true;
          } else {
            this.dupicateAnswer(answer);
          }
        }
      }

      // If the input matches an alternative spelling of a capital name
      if(countries[i].altCapitalSpellings) {
        let answer = this.inputValue.toLowerCase();

        for (var b = 0; b < countries[i].altCapitalSpellings.length; b++) {
          if(countries[i].altCapitalSpellings[b].toLowerCase() === answer) {
            if (countries[i].independent) {
              if (!countries[i].answeredCapital) {
                this.$store.commit('markCapital', i);
                this.inputValue = '';
                
                this.updatePin(countries, i);
                this.breakLoop = true;
              } else {
                this.dupicateAnswer(answer);
              }
            }
          }
        }
      }
    },
    submitAnswer () {
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

  .input-wrapper {
    display: inline-block;
    position: relative;
    width: 75%;
  }

  .duplicate-answer {
    position: absolute;
    top: -9999px;
    left: -9999px;
    width: 100%;
    height: 100%;
    background: #f2e5d5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    opacity: 0;
    transition: top 0s 0.15s, left 0s 0.15s, opacity 0.15s;
    font-size: 14px;
  }

  .duplicate-answer--active {
    opacity: 1;
    top: 0;
    left: 0;
    transition: top 0s, left 0s, opacity 0.15s;
  }

  .answer-box input {
    width: 100%;
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
