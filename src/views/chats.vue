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
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

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
      url: "http://localhost:5000/messages",
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios.request(options).then(
      (response) => {
        this.chats = response.data;
      },
      (error) => {
        console.log(error.response.status);
      }
    );
  },
};
</script>

<style scoped></style>
