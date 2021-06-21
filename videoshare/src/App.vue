<template>
  <div id="app">
    <login v-if="!user_here" />
    <register v-if="!user_here" />
    <upload v-if="!user_here" />
    <home v-if="user_here && !watching"/>
    <userData v-if="!user_here"/>
    <player v-if="watching"/>
  </div>
</template>

<script>
import Vue from "vue";

import Register from "./components/register.vue";
import login from "./components/login.vue";
import upload from "./components/upload.vue";
import home from "./components/home.vue"
import userData from "./components/user_info.vue"
import player from "./components/player.vue";

import { uuid } from "vue-uuid";
import store from "./store";
import "es6-promise/auto";

Vue.use(uuid);

export default {
  name: "App",
  components: {
    login,
    Register,
    upload,
    home, 
    userData,
    player
  },
  data() {
    return {
      user_here: false,
      user: store.state.user_id,
      username: store.state.username,
      watching: store.getters.getWatch
    }
  },
  computed: {
    getWatch(){
      return store.getters.getWatch
    }
  },
  methods: {
    logged_in: function () {
      return new Promise((resolve, reject) => {
        let cookie = Vue.$cookies.get(store.state.username);
        console.log(cookie);
        if (cookie != null) {
          resolve("Session Found");
        } else {
          reject("No Session Found");
        }
      })
    },
  },
  asyncComputed: {
    created() {
      console.log(this.user)
      console.log(this.username)
      this.logged_in()
        .then((result) => {
          console.log(result)
          this.user_here = true
          store.commit('setNull')
        })
        .catch((err) => {
          console.log(err)
          this.user_here = false
        })
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
