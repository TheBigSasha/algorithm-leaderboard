<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/chesssudoku.svg" style="max-width:  1000px;">
    <v-row>

      <v-col>
        <v-btn v-on:click="toggleAnonymModal">Change your anonymity</v-btn>
      </v-col>
    </v-row>
    <DeAnonymize
        v-if="this.anonModal"
        @modalClose="toggleAnonymModal"
        @verify="verify($event)"
        @changeName="changeName($event)"
    ></DeAnonymize>
    <Leaderboard test="2"/>
  </div>
</template>

<script>
import Leaderboard from './components/Leaderboard.vue'
import DeAnonymize from "./components/DeAnonymize";
import {BASE_URL} from "@/config/dev.env";

export default {
  name: 'App',
  data() {
    return {
      anonModal: false,
    };
  },
  components: {
    DeAnonymize,
    Leaderboard
  },
  methods: {
    toggleAnonymModal: function() {
      this.anonModal = !this.anonModal;
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
      this.toggleAnonymModal();
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
</style>
