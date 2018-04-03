<template>
  <div class="header-left">
    <div class="timer" v-if="$store.state.timeLimit !== null">
      <div class="timer__minutes">{{ Math.floor($store.state.timeLimit/60) }}</div>:<div class="timer__seconds">{{ getSeconds() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderLeft',
  methods: {
    getSeconds() {
      let seconds = this.$store.state.timeLimit % 60;

      if (seconds.toString().length === 1) {
        return '0' + seconds.toString();
      }

      return seconds;
    }
  }
} // export default

</script>
<style>
  .header-left {
    width: 33.333333333%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timer {
    display: flex;
    font-size: 30px;
  }

  .timer__minutes {
    margin-right: 4px;
  }

  .timer__seconds {
    margin-left: 4px;
  }
</style>
