<template>
  <v-container class="lb-cont">
    <LeaderboardEntry v-for="entry in LeaderboardEntries" :key="entry.testScore"
    v-bind:score="entry.testScore" v-bind:name="entry.name" v-bind:timestamp="entry.timestamp" @nameClicked="entryClicked(entry)"
    ></LeaderboardEntry>
  </v-container>
</template>

<script>
import LeaderboardEntry from "@/components/LeaderboardEntry";
import {BASE_URL} from "@/config/dev.env";
import axios from "axios";
import router from "../router";

export default {
  name: "Leaderboard",
  components: {LeaderboardEntry},
  props:["test"],
  data(){
    return {
      LeaderboardEntries: [],
    }
  },
  async mounted() {
    //    Fetch all services
    this.LeaderboardEntries = [];
    const axiosOptions = {
      method: "get",
      baseURL: BASE_URL,
      url: "/runs/" + this.test + "/top20",
    };
    const response = await axios(axiosOptions);
    this.LeaderboardEntries = response.data;
  },
  methods:{
    entryClicked(entry){
      var axios = require('axios');

      var config = {
        method: 'get',
        url: BASE_URL+'/run/'+ entry.id +'/user/',
        headers: { }
      };

      axios(config)
          .then(function (response) {
            router.push({ path: `/history/${response.data.id}` }) // -> /user/123
          })
          .catch(function (error) {
            console.log(error);
          });


    }
  }
}
</script>


<style scoped>

</style>