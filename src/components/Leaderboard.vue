<template>
  <v-container class="lb-cont">
    <LeaderboardEntry v-for="entry in LeaderboardEntries" :key="entry.testScore"
    v-bind:score="entry.testScore" v-bind:name="entry.name" v-bind:timestamp="entry.timestamp"
    ></LeaderboardEntry>
  </v-container>
</template>

<script>
import LeaderboardEntry from "@/components/LeaderboardEntry";
import {BASE_URL} from "@/config/dev.env";
import axios from "axios";

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
}
</script>


<style scoped>

</style>