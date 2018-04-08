<template>
    <div class="options-wrapper">
      <div>
        <button class="btn-1" @click="toggleList">Toggle List</button>
      </div>
      <div class="options">
        <label class="options__item"><input type="checkbox" :checked="$store.state.options.pan" @click="$store.commit('setOptionsPan')">Auto pan map on input</label>
        <label class="options__item"><input type="checkbox" :checked="$store.state.options.enter" @click="$store.commit('setOptionsEnter')">Submit answer without pressing enter</label>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Options',
  methods: {
    toggleList () {
      this.$store.commit('toggleList');
    }
  }
} // export default

</script>
<style scoped>
  .options-wrapper {
    display: flex;
    justify-content: center;
    margin: 14px 0;
    align-items: center;
    padding: 0 20px;
  }

  .options {
    margin-left: 20px;
  }

  .options__item {
    display: block;
    text-align: left;
    font-size: 12px;
    cursor: pointer;
    color: #555452;
  }

  .options__item input {
    margin-right: 8px;
  }
</style>