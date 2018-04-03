<template>
  <div class="list" v-show="this.$store.state.listActive">
    <div class="list__col" v-for="continent in $store.state.continents" :key="continent.location">
      <ol class="list__col__ol">
        <li class="list__col__item" v-for="country in continent.countries" :key="country.name">
          <div class="location"  v-if="$store.state.gameType === 'countries' || $store.state.gameType === 'countriesCapitals'">
            <div class="location__name" :class="{ 'location__name--filled': country.answeredCountry }">
              <template v-if="country.answeredCountry || $store.state.gameOver">{{ country.name }}</template>
              &nbsp;
            </div>
            <div class="location__audio" @click="speak(country.name)">
              <svg viewBox="0 0 24 24" v-if="country.answeredCountry || $store.state.gameOver">
                <path d="M7,9V15H11L16,20V4L11,9H7Z" />
              </svg>
            </div>
          </div>
          <div class="location" v-if="$store.state.gameType === 'capitals' || $store.state.gameType === 'countriesCapitals'">
            <div class="location__name location__name--alt" :class="{ 'location__name--filled': country.answeredCapital }">
              <template v-if="country.answeredCapital || $store.state.gameOver">{{ country.capital }}</template>
              &nbsp;
            </div>
            <div class="location__audio" @click="speak(country.capital)">
              <svg viewBox="0 0 24 24" v-if="country.answeredCapital || $store.state.gameOver">
                <path d="M7,9V15H11L16,20V4L11,9H7Z" />
              </svg>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import responsiveVoice from './../assets/responsivevoice.js';

export default {
  name: 'List',
  methods: {
    speak (name) {
      responsiveVoice.speak(name, "US English Male");
    }
  }
} // export default

</script>
<style scoped>
  .list {
    display: flex;
    background: #fff;
    height: 100%;
  }

  .list:hover .list__col:after {
    opacity: 1;
  }

  .list__col {
    flex-grow: 1;
    height: 100%;
    position: relative;
  }

  .list__col:after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 100%;
    height: calc(100% + 1px);
    background: rgba(0,0,0, 0.8);
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
    z-index: 100;
  }

  .list__col:hover:after {
    opacity: 0 !important;
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
    padding: 0;
    margin: 0;
    position: relative;
    font-size: 13px;
    color: grey;
    counter-increment: item;
    border-bottom: 1px solid #e8e8e8;
  }

  .list__col__item:before {
    position: absolute;
    content: counter(item);
    top: 50%;
    left: -31px;
    transform: translateY(-50%);
    background: #ededed;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 11px;
 }

  .location {
    display: flex;
    align-items: stretch;
    border-top: 1px dotted #ededed;
  }

  .location:hover {
    color: black;
  }

  .location:first-child {
    border-top: 0;
  }

  .location__name {
    font-size: 13px;
    padding: 10px;
    color: #fd6868;
  }

  .location__name--alt {
    font-weight: normal;
    font-size: 12px;
    color: #ff8383;
  }

  .location__name--filled {
    color: #555452;
  }

  .location__name--alt.location__name--filled {
    color: grey;
  }

  .location__audio {
    cursor: pointer;
    margin-left: auto;
    padding-top: 2px;
    border-left: 1px dotted #ededed;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
  }

  .location__audio svg {
    width: 18px;
    height: 18px;
  }

  .location__audio:hover path {
    fill: grey;
  }

  .location__audio path {
    fill: lightgrey;
    transition: fill 0.2s;
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
    width: 100%;
    list-style: none;
    padding-left: 0;
  }
</style>
