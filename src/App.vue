<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/chesssudoku.svg" style="max-width:  1000px;">
    <Leaderboard test="2"/>
  </div>
</template>

<script>
import Leaderboard from './components/Leaderboard.vue'

export default {
  name: 'App',
  components: {
    Leaderboard
  }
}
</script>

<style>
#app {
  font-family: Manrope, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
