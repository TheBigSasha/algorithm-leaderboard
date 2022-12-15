<template>
  <div class="chartArea">
    <h1>{{ this.name }}</h1>
    <h3>
      <router-link :to="'/history/' + this.ID"
        >See run history and score!</router-link
      >
    </h3>
    <h3 v-if="this.gitHub != null">GitHub: {{ this.gitHub }}</h3>
    <pre><p v-if="challenge!=null">{{challenge}}</p></pre>
    <br />
    <button @click="this.toggleSpoiler" v-if="!this.spoilerModal">
      Show Pseudocode & Methodology
    </button>
    <button @click="this.toggleSpoiler" v-if="this.spoilerModal">
      Collapse
    </button>

    <div v-if="spoilerModal">
      <h2>Approach</h2>
      <pre>{{ this.text }}</pre>
      <br />
      <h2>Pseudocode</h2>
      <pre><code>{{this.pseudocode}}</code></pre>
    </div>
    <button @click="this.toggleSpoiler" v-if="this.spoilerModal">
      Collapse
    </button>
  </div>
</template>

<script>
export default {
  name: "Story",
  props: ["pseudocode", "name", "text", "ID", "gitHub", "challenge"],
  data() {
    return {
      spoilerModal: false,
    };
  },
  methods: {
    toggleSpoiler() {
      this.spoilerModal = !this.spoilerModal;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope&display=swap");
.chartArea {
  padding: 20pt;
  background: white;
  border-radius: 20pt;
  margin: 25px;
  font-size: max(12pt, 1em);
  display: block;
  box-sizing: content-box;
}
h1,
h2,
h3,
p {
  display: block;
  float: none;
}

pre {
  alignment: left;
  text-align: left;
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  font-family: "Manrope", sans-serif;
}
code {
  font-size: 0.7em;
  font-weight: lighter;
}

.spoiler {
  max-height: 175px;
  overflow-x: hidden;
  overflow-y: hidden;
}

.spoiler:hover {
  max-height: unset;
}
</style>
