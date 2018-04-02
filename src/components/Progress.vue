<template>
  <div class="header-right">
    <div class="progress">
      <div class="progress__countries" v-if="$store.state.gameType === 'countries' || $store.state.gameType === 'countriesCapitals'"><span>Countries - </span>{{this.$store.state.correctCountries}}<span class="progress-divider">/</span>{{this.$store.state.independentCountries}}</div>
      <div class="progress__capitals" v-if="$store.state.gameType === 'capitals' || $store.state.gameType === 'countriesCapitals'"><span>Capitals - </span>{{this.$store.state.correctCapitals}}<span class="progress-divider">/</span>{{this.$store.state.independentCountries}}</div>
    </div>
    <GiveUp />
  </div>
</template>

<script>
import GiveUp from './../components/GiveUp';

export default {
  name: 'Progress',
  components: { GiveUp }
} // export default

</script>
<style>
  .header-right {
    width: calc(33.333333333% - 1px);
    text-align: center;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .progress {
    margin-bottom: 24px;
  }

  .progress__countries {
    margin-bottom: 4px;
  }

  .progress__countries,
  .progress__capitals {
    font-size: 14px;
  }

  .progress__countries span,
  .progress__capitals span {
    color: lightgrey;
  }

  .progress-divider {
    margin: 0 2px;
  }
</style>
