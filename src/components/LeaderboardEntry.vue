<template>
  <div class="lb-item">
    <h1>{{score}}</h1>
    <h2>{{name}}</h2>
  </div>
</template>

<script>
export default {
  name: "LeaderboardEntry",
  props: ["score","name","timestamp"],
}
</script>

<style scoped>

</style>