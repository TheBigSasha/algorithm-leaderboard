<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/chesssudoku.svg"
      style="
        position: fixed;
        left: 50%;
        top: max(15%, 150px);
        transform: translate(-50%, -50%);
        width: min(600px, 95%);
        z-index: -1000;
      "
      @click="goHome"
    />
    <div style="margin-bottom: 450px"></div>
    <DeAnonymize
      v-if="this.anonModal"
      @modalClose="toggleAnonymModal"
      @verify="verify($event)"
      @changeName="changeName($event)"
    ></DeAnonymize>
    <router-view style="z-index: 7000" />
    <div class="bottom">
      <br />
      <v-btn
        v-on:click="toggleAnonymModal"
        style="
          font-weight: bolder;
          background: white;
          font-size: min(1.3rem, 16px);
          padding: 16px;
        "
        >Change your anonymity</v-btn
      >
      <br />
      <p>
        <i
          >The test version is subject to change. If you had a higher score
          before, it is because the test got harder, not because your code got
          worse.</i
        >
      </p>
      <br />

      <p><b>Speed Testing Tools </b></p>
      <a href="https://github.com/TheBigSasha/RuntimeTester">Runtime Tester</a>
      <a href="https://www.jetbrains.com/help/idea/java-flight-recorder.html"
        >Java Flight Recorder</a
      >
      <a href="https://www.jetbrains.com/help/idea/using-breakpoints.html"
        >Breakpoints</a
      >
      <a
        href="https://www.youtube.com/watch?v=j1KxlLs-i0I&list=PLFvevpoGcNCtB7l_SlJAPU29G3ABQqJui&index=26&ab_channel=COMP250"
        >Speed Testing Tutorial</a
      >

      <br />

      <p><b>Other Links</b></p>
      <a href="https://github.com/TheBigSasha/algorithm-leaderboard"
        >Source Code</a
      >
      <a href="https://github.com/TheBigSasha/leaderboard-server">Backend</a>
      <a href="https://sasharesume.com/">Author</a>
    </div>
  </div>
</template>

<script>
import DeAnonymize from "./components/DeAnonymize";
import { BASE_URL } from "@/config/dev.env";
import router from "./router";

export default {
  name: "App",
  data() {
    return {
      anonModal: false,
    };
  },
  components: {
    DeAnonymize,
  },
  methods: {
    toggleAnonymModal: function () {
      this.anonModal = !this.anonModal;
      this.$gtag.event("deanonymize", { method: "Google" });
    },
    verify: async function ({ email }) {
      var axios = require("axios");

      var config = {
        method: "get",
        url: BASE_URL + "/verify?email=" + email,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$gtag.event("verify", { method: "Google" });
    },
    changeName: async function ({ email, newName, token }) {
      var axios = require("axios");
      var config;
      if (newName.length > 3) {
        config = {
          method: "post",
          url:
            BASE_URL +
            "/student?name=" +
            newName +
            "&email=" +
            email +
            "&token=" +
            token,
          headers: {},
        };
      } else {
        config = {
          method: "post",
          url: BASE_URL + "/student?email=" + email + "&token=" + token,
          headers: {},
        };
      }

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      this.appendToPropertyAndEscape();
      this.$gtag.event("changeName", { method: "Google" });
    },
    goHome() {
      router.push("/");
    },
  },
};
</script>

<style>
#app {
  font-family: Manrope, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bottom a {
  margin-left: 15px;
}

.bottom {
  margin-bottom: 25px;
}
</style>
