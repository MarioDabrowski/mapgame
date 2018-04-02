<template>
  <div class="menu-wrapper" v-if="!$store.state.gameType">
    <div class="menu">
      <div class="menu-section">
        <div class="menu-section__title">Select a game type:</div>
        <button class="btn-1 menu-section__item" :class="{'btn-1--active': gameType === 'countries'}" @click="gameType = 'countries'">Countries</button>
        <button class="btn-1 menu-section__item" :class="{'btn-1--active': gameType === 'capitals'}" @click="gameType = 'capitals'">Capitals</button>
        <button class="btn-1 menu-section__item" :class="{'btn-1--active': gameType === 'countriesCapitals'}" @click="gameType = 'countriesCapitals'">Countries & Capitals</button>
      </div>
      <div class="menu-section">
        <div class="menu-section__title">Options:</div>
        <div class="menu-section__item">
          <label class="select"><input type="checkbox" v-model="pan" :checked="pan">Auto pan map on input</label>
          <label class="select"><input type="checkbox" v-model="enter" :checked="enter">Submit answer without pressing enter</label>
        </div>
      </div>
      <div class="menu-section">
        <div class="btn-2" @click="startGame()">Start Game</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      gameType: 'countries',
      enter: true,
      pan: true
    }
  },
  methods: {
    startGame () {
      this.$store.commit('setGameType', this.gameType);
      this.$store.commit('setOptions', {
        pan: this.pan,
        enter: this.enter
      });
    }
  }
} // export default

</script>
<style scoped>
  .menu-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu {
    display: inline-block;
    background: #fff;
    padding: 20px;
    border-radius: 4px;
  }

  .menu-section {
    border-top: 1px dashed #959595;
    margin-top: 20px;
    padding-top: 20px;
  }

  .menu-section:first-child {
    border-top: 0;
    margin-top: 0;
    padding-top: 0;
  }

  .menu-section__title {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .menu-section__item {
    margin-right: 10px;
  }

  .menu-section__item:last-child {
    margin-right: 0;
  }

  .select {
    font-size: 14px;
    display: block;
    margin-bottom: 6px;
    cursor: pointer;
  }

  .select input {
    margin-right: 10px;
    outline: 0;
  }
</style>
