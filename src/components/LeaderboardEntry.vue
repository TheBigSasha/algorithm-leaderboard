<template>
  <div class="lb-item" @click="$emit('nameClicked')">
    <h1>{{ score }}</h1>
    <h2 @click="$emit('nameClicked')">{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: "LeaderboardEntry",
  props: ["score", "name", "timestamp"],
};
</script>

<style scoped></style>
