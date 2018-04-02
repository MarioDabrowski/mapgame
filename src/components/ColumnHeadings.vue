<template>
  <div class="columnHeadings">
    <div class="list__col" v-for="continent in this.$store.state.continents" :key="continent.location">
      <div class="list__col__heading">
        <div class="list__col__heading__title">{{continent.location}}</div>

        <div class="list__col__heading__count-wrapper">
          <div class="list__col__heading__count" v-if="$store.state.gameType === 'countries' || $store.state.gameType === 'countriesCapitals'">
            <div class="list__col__heading__count__number">{{continent.correctCountries}}<span>/</span>{{continent.countries.length}}</div>
            <div class="list__col__heading__count__title">Countries</div>
          </div>
          <div class="list__col__heading__count" v-if="$store.state.gameType === 'capitals' || $store.state.gameType === 'countriesCapitals'">
            <div class="list__col__heading__count__number">{{continent.correctCapitals}}<span>/</span>{{continent.countries.length}}</div>
            <div class="list__col__heading__count__title">Capitals</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColumnHeadings',
} // export default

</script>
<style scolped>
  .columnHeadings {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #959595;
    border-top: 1px solid #959595;
    margin-top: -1px;
  }

  .list__col {
    width: 16.666666667%;
  }

  .list__col:first-child {
    border-left: 0;
  }

  .list__col__heading {
    border-right: 1px solid #959595;
    text-align: center;
    padding: 10px 0;
    font-weight: bold;
    background: url('./../assets/topo_pattern.png') 0 0 repeat;
  }

  .list__col__heading

  .list__col:nth-child(even) .list__col__heading {
    background: url('./../assets/topo_pattern.png') bottom right repeat;
  }

  .list__col:last-child .list__col__heading {
    border-right: 0;
  }

  .list__col__heading__title + .list__col__heading__count {
    margin-top: 10px;
  }

  .list__col__heading__count-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .list__col__heading__count {
    font-size: 12px;
    color: #555452;
    font-weight: normal;
    margin-left: 14px;
  }

  .list__col__heading__count:first-child {
    margin-left: 0;
  }

  .list__col__heading__count__number {
  font-size: 12px;
  }

  .list__col__heading__count__number span {
    color: #555452;
    display: inline-block;
    margin: 0 2px;
  }

  .list__col__heading__count__title {
    font-size: 10px;
    border-top: 1px solid #555452;
    padding-top: 3px;
    margin-top: 2px;
    color: #555452;
  }

  .list__col__item {
    padding: 10px 0 10px 5px;
    margin: 0;
    position: relative;
    font-size: 13px;
    color: grey;
  }
</style>
