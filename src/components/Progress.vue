<template>
  <div class="progress">
    <div class="progress__countries"><span>Countries - </span>{{this.$store.state.correctCountries}}<span class="progress-divider">/</span>{{this.$store.state.independentCountries}}</div>
    <div class="progress__capitals"><span>Capitals - </span>{{this.$store.state.correctCapitals}}<span class="progress-divider">/</span>{{this.$store.state.independentCountries}}</div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
} // export default

</script>
<style>
  .progress {
    width: 33.333333333%;
    text-align: center;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
