<template>
  <div class="container">
    <line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart>
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
  props: ['user'],
  data () {
    return {
      packageName: '',
      period: 'last-month',
      loaded: false,
      downloads: [],
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
      axios.get(BASE_URL + "/history/"`${this.user}`)
          .then(response => {
            console.log(response.data)
            this.downloads = response.data.downloads.map(download => download.downloads)
            this.labels = response.data.downloads.map(download => download.day)
            this.loaded = true
          })
          .catch(err => {
            this.errorMessage = err.response.data.error
            this.showError = true
          })
    },
  }
}
</script>

