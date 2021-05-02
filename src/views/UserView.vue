<template>
  <div>
    <h1> User: {{user}}</h1>
    <ChartContainer></ChartContainer>
  </div>
</template>

<script>
import ChartContainer from "../components/ChartContainer";

export default {
  name: "UserView",
  components: {ChartContainer},
  props:['user']
}
</script>

<style scoped>

</style>