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
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Suchen"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Suchen</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown right v-if="login && username">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{username}}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/meineangebote"
              >Meine Angebote</b-dropdown-item
            >
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
export default {
  data() {
    return {
      login: localStorage.getItem("Loggedin"),
      username: "palce",
    };
  },
  mounted() {
    const options = {
      method: "GET",
      url: "http://localhost:5000/user",
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data["first_name"]);
        this.username = response.data["first_name"];
      })
      .catch(function (error) {
        console.error(error);
      });
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
  },
};
</script>

<style lang="scss" scoped>
button {
  margin-right: 1rem;
}
</style>
