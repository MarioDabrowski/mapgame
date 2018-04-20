<template>
  <div class="answer-box">
    <div class="input-wrapper">
      <div class="duplicate-answer" ref="duplicate-answer">Already counted</div>
      <input type="text" ref="answerInput" v-if="$store.state.options.enter" v-model="inputValue" v-on:keyup="submitAnswer" :disabled="$store.state.gameOver" />
      <input type="text" ref="answerInput" v-else v-model="inputValue" v-on:keyup.enter="submitAnswer" :disabled="$store.state.gameOver" />
    </div>
    <Options />
  </div>
</template>

<script>
import Options from './../components/Options';

export default {
  name: 'AnswerBox',
  components: { Options },
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
    updatePin (i, a, name) {
      this.$store.commit('updateLastAnswerPin', {x: this.$store.state.continents[i].countries[a].latlng[0], y: this.$store.state.continents[i].countries[a].latlng[1], name});

      // Change markers based on game type
      if (this.$store.state.gameType === 'countriesCapitals') {
        if (this.$store.state.continents[i].countries[a].answeredCapital && this.$store.state.continents[i].countries[a].answeredCountry) {
          this.$store.commit('clearMarker', [i, a]);
        } else if (this.$store.state.continents[i].countries[a].answeredCountry) {
          this.$store.commit('changeMarker', [i, a]);
        }
      } else {
        this.$store.commit('clearMarker', [i, a]);
      }
    },
    checkCountry (i, a, answer) {
      // Check against country name
      if(this.$store.state.continents[i].countries[a].name.toLowerCase() === answer) {
        if (this.$store.state.continents[i].countries[a].independent) {
          if (!this.$store.state.continents[i].countries[a].answeredCountry) {
            this.$store.commit('markCountry', [i, a]);
            this.inputValue = '';
            this.updatePin(i, a, this.$store.state.continents[i].countries[a].name);
          } else {
            this.dupicateAnswer(answer);
          }
        }

        this.breakLoop = true;
      }

      // If the input matches an alternative spelling of the country name
      for (var x = 0; x < this.$store.state.continents[i].countries[a].altSpellings.length; x++) {
        if(this.$store.state.continents[i].countries[a].altSpellings[x].toLowerCase() === answer) {
          if (this.$store.state.continents[i].countries[a].independent) {
            if (!this.$store.state.continents[i].countries[a].answeredCountry) {
              this.$store.commit('markCountry', [i, a]);
              this.inputValue = '';

              this.updatePin(i, a, this.$store.state.continents[i].countries[a].altSpellings[x]);
            } else {
              this.dupicateAnswer(answer);
            }
          }

          this.breakLoop = true;
        }
      }
    },
    checkCapital (i, a, answer) {

      // If the input matches the capital name
      if(this.$store.state.continents[i].countries[a].capital.toLowerCase() === answer) {
        if (this.$store.state.continents[i].countries[a].independent) {
          if (!this.$store.state.continents[i].countries[a].answeredCapital) {
            this.$store.commit('markCapital', [i, a]);
            this.inputValue = '';

            this.updatePin(i, a, this.$store.state.continents[i].countries[a].capital);
            this.breakLoop = true;
          } else {
            this.dupicateAnswer(answer);
          }
        }
      }

      // If the input matches an alternative spelling of a capital name
      if(this.$store.state.continents[i].countries[a].altCapitalSpellings) {
        for (var b = 0; b < this.$store.state.continents[i].countries[a].altCapitalSpellings.length; b++) {
          if(this.$store.state.continents[i].countries[a].altCapitalSpellings[b].toLowerCase() === answer) {
            if (this.$store.state.continents[i].countries[a].independent) {
              if (!this.$store.state.continents[i].countries[a].answeredCapital) {
                this.$store.commit('markCapital', [i, a]);
                this.inputValue = '';
                
                this.updatePin(i, a, this.$store.state.continents[i].countries[a].altCapitalSpellings[b]);
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
        let answer = this.inputValue.toLowerCase();

        for (let i = 0; i < this.$store.state.continents.length; i++) {
          for (let a = 0; a < this.$store.state.continents[i].countries.length; a++) {
            if (this.$store.state.gameType === 'countries') {
              this.checkCountry(i, a, answer);
            } else if (this.$store.state.gameType === 'capitals') {
              this.checkCapital(i, a, answer);
            } else {
              this.checkCountry(i, a, answer);
              this.checkCapital(i, a, answer);
            }

            if (this.breakLoop) break;
          }

          if (this.breakLoop) break;
        }

      }

      if (this.breakLoop) this.breakLoop = false;
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
    padding: 20px 0 0;
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
</style>
