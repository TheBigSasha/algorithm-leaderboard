<template>
  <div class="chartArea" >
    <UserInformation :user="user"></UserInformation>
    <div style="margin-top: 50px">
      <h1>My scores over time</h1>
      <select v-model="chartVer"  @change="resetChart">
        <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.text">
          {{ option.text }}
        </option>
      </select>
      <ChartContainer v-if="render" :user="user" :test-version="chartVer"></ChartContainer>
      <h1>Class average over time</h1>
      <select v-model="chartVer"  @change="resetChart">
        <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.text">
          {{ option.text }}
        </option>
      </select>
      <ChartContainer v-if="render" user='AVG' :test-version="chartVer"></ChartContainer>
      <h1>Submissions over time</h1>
      <select v-model="chartVer"  @change="resetChart">
        <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.text">
          {{ option.text }}
        </option>
      </select>
      <ChartContainer v-if="render" user='ALL' :test-version="chartVer"></ChartContainer>
    </div>
  </div>
</template>

<script>
import ChartContainer from "../components/ChartContainer";
import UserInformation from "../components/UserInformation";

export default {
  name: "UserView",
  components: {UserInformation, ChartContainer},
  props:['user'],
  data(){
    return{
      chartVer: "4",
      render: true,
      options: [
        { text: 'CodePost V1', value: '2' },
        { text: 'CodePost V2', value: '4' },
        { text: 'Student Tester', value: '463' }
      ]
    }
  },
  methods:{
    resetChart(){
      console.log("updating chart")
      //This is a terrible way to force a refresh, but I can't help being a gemeni :)
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    }
  }

}
</script>

<style scoped>
.chartArea{
  padding: 20pt;
  background: white;
  border-radius: 20pt;
}
</style>