<template>
  <div id="app">
    <div id="nav">
      <searchbar></searchbar>
      <!--router-link to="/">Home</router-link-->
      <!--router-link-- to="/about">About</router-link-->
    </div>
    <router-view />
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar";
export default {
  components: {
    searchbar: Searchbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  h1 {
    margin-left: 2rem;
    margin-top: 1rem;
  }
  #nav a.router-link-exact-active {
    color: white;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
