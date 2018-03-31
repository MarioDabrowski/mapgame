<template>
  <div class="app">
    <div class="app__header">
      <Timer />
      <AnswerBox />
      <Progress />
      <ColumnHeadings />
    </div>
    <List v-show="$store.state.listActive" />
    <WorldMap v-show="!$store.state.listActive" />
  </div>
</template>

<script>
import Timer from './components/Timer';
import AnswerBox from './components/AnswerBox';
import Progress from './components/Progress';
import ColumnHeadings from './components/ColumnHeadings';
import List from './components/List';
import WorldMap from './components/WorldMap';

export default {
  name: 'app',
  mounted () {
    this.$store.commit('populateContinents');
    this.$store.commit('countIndependent');
  },
  components: { ColumnHeadings, Timer, AnswerBox, Progress, List, WorldMap }
}
</script>

<style>
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .app__header {
    display: flex;
    position: relative;
    z-index: 10;
    flex-shrink: 0;
    flex-wrap: wrap;
  }
</style>
