<template>
  <div id="app">
    <Leaderboard :test="this.test"/>
  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard.vue'
import {BASE_URL} from "@/config/dev.env";

export default {
  name: 'App',
  props:['test'],
  data() {
    return {
      anonModal: false,
    };
  },
  components: {
    Leaderboard
  },
  methods: {
    toggleAnonymModal: function() {
      this.anonModal = !this.anonModal;
      this.$gtag.event('deanonymize', { method: 'Google' })
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
