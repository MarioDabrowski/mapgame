<template>
  <div class="list" v-show="this.$store.state.listActive">
    <div class="list__col" v-for="continent in $store.state.continents" :key="continent.location">
      <ol class="list__col__ol">
        <li class="list__col__item" v-for="country in continent.countries" :key="country.name">
          <div class="list__col__item__name">
            <div><span v-if="country.answeredCountry">{{ country.name }}</span>&nbsp;</div>
            <div><span v-if="country.answeredCapital">{{ country.capital }}</span>&nbsp;</div>
          </div>
          <div class="audio">X</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
} // export default

</script>
<style>
  .list {
    display: flex;
    background: #fff;
    height: 100%;
  }

  .list__col {
    flex-grow: 1;
    height: 100%;
  }

  .list__col:first-child {
    border-left: 0;
  }

  .list__col__heading {
    border-right: 1px solid #959595;
    text-align: center;
    padding: 10px 0;
    font-weight: bold;
    /* background: url('../img/topo_pattern.png') 0 0 no-repeat; */
  }

  .list__col__heading

  .list__col:nth-child(even) .list__col__heading {
    /* background: url('../img/topo_pattern.png') bottom right no-repeat; */
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
    display: flex;
  }

  .list__col__item:after {
    position: absolute;
    bottom: 0;
    left: -30px;
    width: calc(100% + 30px);
    height: 0;
    content: '';
    border-bottom: 1px dashed lightgrey;
  }

  .list__col__item--active {
    background: yellow;
  }

  .list__col__item__name {
    font-size: 13px;
  }

  .list__col__item__name:last-child {
    font-size: 12px;
    color: green;
  }

  .list__col__item__name--active {
    color: green;
  }

  .list__col__ol {
    overflow-y: scroll;
    margin: 0;
    padding: 0 0 0 30px;
    transform: translateZ(0);
    height: 100%;
  }
</style>
