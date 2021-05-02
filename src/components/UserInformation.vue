<template>
  <div>
    <h1 v-if="loaded">Hello, {{userName}}</h1>
    <p>Thank you for a great semester! Below are some stats on your run!</p>
    <br/>
    <p>Don't forget to submit your projects to best of comp <a href="https://forms.gle/fERoJxokWtxfiVF67">submit</a> </p>
  </div>
</template>

<script>

import axios from "axios";
import {BASE_URL} from "@/config/dev.env";

export default {
  name: "User Information",
  props:['user'],
  data(){
    return{
      loaded: false,
      userName: ""
    }
  },
    mounted () {
      axios.get(BASE_URL + "/user/" + this.user)
          .then(response => {
            console.log(response.data)
            this.userName = response.data.userName
            this.loaded = true
          })
          .catch(err => {
            this.errorMessage = err.response.data.error
            this.showError = true
            console.log("Error!!!!!!!!!!!!!!!!!!!!!!")
            console.log(this.errorMessage)
          })
    }

}
</script>

<style scoped>

</style>