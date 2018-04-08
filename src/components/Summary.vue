<template>
  <div class="menu-wrapper" v-if="$store.state.gameOver && summaryActive">
    <div class="menu">
      <div class="menu-section">
        <div class="menu-section__title">Congratulations:</div>
      </div>
      <div class="menu-section">
        <p class="menu-section__details" v-if="$store.state.timeLimit"><strong>Time:</strong> {{ $store.state.remainingTime }}</p>
        <p class="menu-section__details" v-if="$store.state.gameType === 'countries' || $store.state.gameType === 'countriesCapitals'"><strong>Countries:</strong> {{ $store.state.correctCountries }} / {{ $store.state.independentCountries }}</p>
        <p class="menu-section__details" v-if="$store.state.gameType === 'capitals' || $store.state.gameType === 'countriesCapitals'"><strong>Capitals:</strong> {{ $store.state.correctCapitals }} / {{ $store.state.independentCountries }}</p>
      </div>
      <div class="menu-section">
        <button class="btn-2" @click="summaryActive = false">Close summary screen</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      summaryActive: true
    }
  },
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

  .menu-section__details {
    font-size: 13px;
    margin: 0;
  }

  .menu-section__details + .menu-section__details {
    margin-top: 10px;
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
