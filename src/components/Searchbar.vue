<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Studibörse</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="login && username">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/meineangebote"
              >Meine Angebote</b-dropdown-item
            >
            <b-dropdown-item href="/wishlist">Watchlist</b-dropdown-item>
            <b-dropdown-item href="/chats">Chats</b-dropdown-item>
            <b-dropdown-item @click="OnClick">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button
            size="sm"
            href="/login"
            style="color: white"
            class="font-weight-normal"
            v-if="!login"
            >Login</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import angebote from "../views/Home.vue";
export default {
  data() {
    return {
      search: "",
      angebot: angebote,
      login: localStorage.getItem("Loggedin"),
      username: "palce",
    };
  },
  mounted() {
    const options = {
      method: "GET",
      url: "https://studiboerse.germanywestcentral.cloudapp.azure.com/user",
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios.request(options).then(
      (response) => {
        this.username = response.data["first_name"];
      },
      (error) => {
        console.log(error.response.status);
      }
    );
  },
  methods: {
    OnClick(event) {
      event.preventDefault();
      this.$bvToast.toast(`Erfolgreich Ausgeloggt`, {
        title: "Studibörse",
        autoHideDelay: 5000,
      });
      localStorage.removeItem("Loggedin");
      setTimeout(function () {
        router.go();
      }, 1500);
      setTimeout(function () {
        router.push("/");
      }, 1490);
    },
    searchAngebote() {
      this.$refs.home.getfilteredAngebote(this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  margin-right: 1rem;
}
.dropdown-menu {
  overflow-y: hidden;
}
</style>
