<template>
  <div class="container">
    <line-chart v-if="loaded" :chart-data="testResults" :chart-labels="labels"></line-chart>
  </div>
</template>

<script>
import axios from 'axios'
import LineChart from './Chart.vue'
import {BASE_URL} from "@/config/dev.env";

export default {
  components: {
    LineChart
  },
  props: ['user','testVersion'],
  data () {
    return {
      period: 'last-month',
      loaded: false,
      testResults: [],
      labels: [],
      showError: false,
      errorMessage: 'Please enter a package name'
    }
  },
  mounted () {
      this.requestData()
  },
  methods: {
    resetState () {
      this.loaded = false
      this.showError = false
    },
    requestData () {
      this.resetState()

      function formatDate(timestamp) {
        return timestamp.toString().replace("T", " ").substr(0,16)
      }

      axios.get(BASE_URL + "/runs/" + this.testVersion + "/user/" + this.user)
          .then(response => {
            console.log(response.data)
            this.testResults = response.data.map(datum => datum.testScore)
            this.labels = response.data.map(datum => formatDate(datum.timestamp))
            console.log(this.labels)
            console.log(this.testResults)
            this.loaded = true
          })
          .catch(err => {
            this.errorMessage = err.response.data.error
            this.showError = true
            console.log("Error!!!!!!!!!!!!!!!!!!!!!!")
            console.log(this.errorMessage)
          })
    },
  }
}
</script>

