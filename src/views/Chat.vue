<template>
  <div>
    <HeaderNavigation />

    <b-container fluid>
      <b-button v-b-modal.modal-1>Bewerten</b-button>
      <b-modal
        ref="my-modal"
        id="modal-1"
        hide-footer
        title="Verkäufer Bewerten"
      >
        <b-form-rating v-model="ratings.rating"> </b-form-rating>
        <br />
        <!--h6>Kommentar:</h6>
        <b-textarea v-model="comment"></b-textarea>
        <br /-->
        <b-button variant="danger" @click="hideModal">Nein</b-button>
        <b-button variant="success" v-on:click="giveRating" style="float: right"
          >Absenden</b-button
        >
      </b-modal>
      <b-row>
        <b-col class="chat-content">
          <div class="chat-messages">
            <ul class="list-unstyled">
              <b-media
                tag="li"
                class="my-4"
                v-for="message in msgGet.conversation"
                :key="message"
              >
                <p
                  v-if="myid == message.user_id"
                  class="mb-0 mr-5"
                  style="float: right"
                >
                  {{ message.text }}
                  <b-button
                    variant="light"
                    v-on:click="deletemsg(message.message_id)"
                    ><b-icon icon="trash" aria-hidden="true"></b-icon
                  ></b-button>
                  <br />{{ message.timestamp }}
                </p>
                <p
                  v-if="myid != message.user_id"
                  class="mb-0 ml-5"
                  style="float: left"
                >
                  {{ message.text }}
                  <br />{{ message.timestamp }}
                </p>
              </b-media>
            </ul>
          </div>
          <div class="chat-input">
            <div class="chat-input__box">
              <b-input-group>
                <b-input-group-text slot="prepend">{{
                  username
                }}</b-input-group-text>
                <b-form-input v-model="msg.text"></b-form-input>
                <b-input-group-append>
                  <b-button variant="success" v-on:click="sentMsg"
                    >Send message</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
//import router from "@/router";

export default {
  components: {},
  data() {
    return {
      onlinePeopleProps: {
        blank: true,
        blankColor: "#777",
        width: 50,
        height: 50,
      },
      login: localStorage.getItem("Loggedin"),
      username: "",
      myid: "",
      msg: {
        text: "",
      },
      msgGet: {},
      user_1: {},
      ratings: {
        rating: "",
      },
      comment: "",
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
        this.myid = response.data["id"];
        console.log(this.myid + " ID");
        this.username = response.data["first_name"];
      },
      (error) => {
        console.log(error.response.status);
      }
    );
    var url = window.location.href;
    url = url.split("=");
    var id = url[1];
    const options2 = {
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios
      .get(
        "https://studiboerse.germanywestcentral.cloudapp.azure.com/message/" +
          id +
          "",
        options2
      )
      .then(
        (response) => {
          this.msgGet = response.data;
          this.user_1 = this.msgGet.user;
          console.log(this.user_1.id);
        },
        (error) => {
          console.error(error);
        }
      );
    /*axios
      .get("http://localhost:5000/rating/" + this.msgGet.user.id + "", options2)
      .then(
        (response) => {
          console.log(response.data);
          this.value = response.data;
        },
        (error) => {
          console.error(error);
        }
      );*/
    setInterval(this.myTimer, 5000);
  },
  methods: {
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },
    giveRating() {
      //Post request fürs Bewerten
      const options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      console.log(this.msgGet.offer.user.id);
      axios
        .post(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/rating/" +
            this.msgGet.offer.user.id +
            "",
          this.ratings,
          options
        )
        .then(
          (respone) => {
            console.log(respone);
          },
          (error) => {
            console.error(error);
          }
        );
    },
    sentMsg() {
      var url = window.location.href;
      url = url.split("=");
      var id = url[1];
      const options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios
        .post(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/message/" +
            id +
            "",
          this.msg,
          options
        )
        .then(
          (response) => {
            console.log(response);
            //this.msgGet = response.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    myTimer() {
      var url = window.location.href;
      url = url.split("=");
      var id = url[1];
      const options2 = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios
        .get(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/message/" +
            id +
            "",
          options2
        )
        .then(
          (response) => {
            this.msgGet = response.data;
            console.log(this.msgGet);
          },
          (error) => {
            console.error(error);
          }
        );
    },
    deletemsg(msgid) {
      console.log(msgid);
      var url = window.location.href;
      url = url.split("=");
      var id = url[1];
      const options1 = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios
        .delete(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/message/" +
            id +
            "/" +
            msgid +
            "",
          options1
        )
        .then(
          (response) => {
            console.log(response.data);
          },
          (error) => {
            console.error(error);
          }
        );
    },
  },
};
</script>

<style scoped lang="scss">
.online-people-icon {
  margin-right: 5px;
  margin-bottom: 5px;
}
$header-nav-height: 58px;
$chat-input-height: 60px;
$chat-view-sticky-height: $chat-input-height + $header-nav-height;
.chat-content {
  margin-top: 6rem;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  overflow-y: hidden;
  .chat-messages {
    position: sticky;
    top: $header-nav-height;
    z-index: 1000;
    height: calc(100vh - #{$chat-view-sticky-height});
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .chat-input {
    height: $chat-input-height;
    margin-top: 2rem;
    .chat-input__box {
      margin-top: 15px;
    }
  }
}
</style>
