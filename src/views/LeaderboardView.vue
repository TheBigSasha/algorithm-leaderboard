<template>
  <div id="app">
    <h1><router-link to="/stories/">See How They Did It</router-link></h1>
    <br/>
    <br/>
    <select v-model="chartVer"  @change="resetChart">
      <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.text">
        {{ option.text }}
      </option>
    </select>
    <Leaderboard v-if="render" :test="this.chartVer"/>

    <div class="lb-card">
      <h1>Class average over time</h1>
      <ChartContainer  v-if="render" user='AVG' :test-version="chartVer"></ChartContainer>
    </div>
  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard.vue'
import {BASE_URL} from "@/config/dev.env";
import ChartContainer from "../components/ChartContainer";

export default {
  name: 'App',
  props:['test'],
  data() {
    return {
      anonModal: false,
      chartVer: this.test,
      render: true,
      options: [
        { text: 'CodePost V1', value: '2' },
        { text: 'CodePost V2', value: '4' },
        { text: 'Student Tester', value: '463' }
      ]
    };
  },
  components: {
    Leaderboard,
    ChartContainer
  },
  methods: {
    toggleAnonymModal: function() {
      this.anonModal = !this.anonModal;
      this.$gtag.event('deanonymize', { method: 'Google' })
    },
    resetChart() {
      console.log("updating chart")
      //This is a terrible way to force a refresh, but I can't help being a gemeni :)
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    },
    verify: async function({ email }) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: BASE_URL +'/verify?email=' +email,
        headers: { }
      };


      axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      this.$gtag.event('verify', { method: 'Google' })
    },
    changeName: async function({ email, newName, token}) {
      var axios = require('axios');
      var config
      if(newName.length > 3) {

        config = {
          method: 'post',
          url: BASE_URL + '/student?name=' + newName + '&email=' + email + '&token=' + token,
          headers: {}
        };
      }else{
        config = {
          method: 'post',
          url: BASE_URL + '/student?email=' + email + '&token=' + token,
          headers: {}
        };
      }

      axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      this.appendToPropertyAndEscape();
      this.$gtag.event('changeName', { method: 'Google' })
    }
  },
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

.bottom a {
  margin-left: 15px;
}

.bottom {
  margin-bottom: 25px;
}
</style>
