<template>
  <div class="app">
    <Menu />
    <div class="app__header"  v-if="$store.state.gameType">
      <HeaderLeft />
      <AnswerBox />
      <Progress />
      <ColumnHeadings />
    </div>
    <List v-show="$store.state.listActive" />
    <WorldMap v-show="!$store.state.listActive" />
  </div>
</template>

<script>
import Menu from './components/Menu';
import HeaderLeft from './components/HeaderLeft';
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

    this.$store.watch( state => state.gameType, () => {
      this.$store.state.leaflet.invalidateSize();
    });
  },
  components: { Menu, ColumnHeadings, HeaderLeft, AnswerBox, Progress, List, WorldMap },
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

  .btn-1 {
    background: white;
    z-index: 500;
    padding: 6px 14px;
    font-size: 12px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #959595;
    outline: none;
    transition: background 0.2s;
  }

  .btn-1:hover,
  .btn-1--active {
    background: #e8e8e8;
  }

  .btn-1[disabled] {
    opacity: 0.4;
    cursor: default;
  }

  .btn-2 {
    background: white;
    z-index: 500;
    padding: 12px 28px;
    font-size: 14px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #959595;
    outline: none;
    transition: background 0.2s;
    text-align: center;
    font-weight: bold;
  }

  .btn-2:hover {
    background: #e8e8e8;
  }
</style>
