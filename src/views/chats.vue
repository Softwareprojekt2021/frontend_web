<template>
  <div>
    <h2>Chats</h2>
    <div v-if="chats"></div>
    <b-container v-for="chat in chats" :key="chat">
      <b-row>
        <b-col>
          <p v-text="chat.offer.title"></p>
        </b-col>
        <b-col>
          <p>
            {{ chat.offer.user.first_name }} {{ chat.offer.user.last_name }}
          </p>
        </b-col>
        <b-col>
          <b-button :href="`/chat?id=${chat.chat_id}`">Zum Chat</b-button>
          <b-button v-on:click="removeChat(chat.chat_id)" variant="danger">Chat Löschen</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      chats: {},
      login: localStorage.getItem("Loggedin"),
    };
  },
  mounted() {
    const options = {
      method: "GET",
      url: "https://studiboerse.germanywestcentral.cloudapp.azure.com/messages",
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios.request(options).then(
      (response) => {
        this.chats = response.data;
        console.log(this.chats);
      },
      (error) => {
        console.log(error.response.status);
      }
    );
  },
  methods: {
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },
    removeChat(id) {
      const options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios
        .delete(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/messages/" +
            id +
            "",
          options
        )
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error.response.status);
          }
        );
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
      this.$bvToast.toast(`Chat wurde gelöscht`, {
        title: "Studibörse",
        autoHideDelay: 5000,
      });
      setTimeout(function () {
        router.go();
      }, 1000);
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 1rem;
}
</style>
