<template>
  <div>
    <h2>{{ angebot.title }}</h2>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="5">
          <p>Bilder</p>
          <b-img
            v-if="(angebot.pictures || []).length === 0"
            v-bind:src="placeholder"
            fluid-grow
            rounded=""
            alt="Rounded image"
          />
          <div v-for="image in angebot.pictures" :key="image">
            <b-img
              :key="image"
              :src="`data:image/png;base64,` + image"
              fluid-grow
              align="left"
              rounded=""
              alt="Rounded image"
            />
          </div>
          <p v-if="angebot.price !== '0.00'">{{ angebot.price }}€</p>
          <p v-else>Tausch</p>
          <b-button v-on:click="addToWishList"
            >Zur Watchlist hinzufügen</b-button
          >
          <br />
          <b-button v-on:click="toChat">Mit Anbieter chatten</b-button>
        </b-col>
        <b-col>
          <p v-text="angebot.description" class="border"></p>
        </b-col>
      </b-row>
      <!--b-row align-h="center">
        <b-col>
          <h3>Verkäufer bewerten:</h3>
          <b-form-rating v-model="value"> </b-form-rating>
          <h6>Kommentar:</h6>
          <b-textarea v-model="comment"></b-textarea>
          <b-button v-on:click="giveRating">Bewerten</b-button>
        </b-col>
      </b-row-->
      <b-row align-h="center">
        <h3>Kontaktdaten:</h3>
      </b-row>
      <b-row>
        <b-col v-if="angebot.user.e_mail">
          E-Mail: {{ angebot.user.e_mail }}
          <p></p>
          <h3>Verkäufer Bewertung</h3>
          <b-form-rating v-model="rating" readonly> </b-form-rating>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import placeholder from "../assets/product_placeholder.png";
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      angebot: {
        id: "",
      },
      placeholder: placeholder,
      login: localStorage.getItem("Loggedin"),
      offer_id: "",
      value: "",
      comment: "",
      rating: "",
    };
  },
  mounted() {
    var url = window.location.href;
    url = url.split("=");
    var id = url[1];
    this.offer_id = id;
    const options = {
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios.get("http://localhost:5000/offer/" + id + "", options).then(
      (response) => {
        this.angebot = response.data;
        axios
          .get(
            "http://localhost:5000/rating/" + response.data.user.id + "",
            options
          )
          .then(
            (response) => {
              this.rating = response.data.average_rating;
            },
            (error) => {
              console.log(error.response.status);
            }
          );
      },
      (error) => {
        console.log(error.response.status);
      }
    );
  },
  methods: {
    addToWishList() {
      //Post request für die Wishlist.
      const options = {
        method: "POST",
        url: "http://localhost:5000/watchlist/" + this.offer_id + "",
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios.request(options).then(
        (response) => {
          console.log(response.data);
          this.$bvToast.toast(`Zur Wishlist Hinzugefügt`, {
            title: "Studibörse",
            autoHideDelay: 5000,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    },
    /*giveRating() {
      //Post request fürs Bewerten
      console.log(this.value);
      console.log(this.comment);
    },*/
    toChat() {
      var url = window.location.href;
      url = url.split("=");
      var id = url[1];
      const options = {
        method: "POST",
        url: "http://localhost:5000/message/" + this.offer_id + "/create",
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios.request(options).then(
        (response) => {
          console.log(response.data);
          this.$bvToast.toast(`Sie werden zum Chat weiter geleitet`, {
            title: "Studibörse",
            autoHideDelay: 5000,
          });
          setTimeout(function () {
            console.log(id);
            router.push("/chat?id=" + id);
          }, 1000);
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>

<style lang="scss">
.border {
  border: 4px solid black !important;
}
.col {
  margin: auto;
}
.align-content-center {
  margin: auto;
  align-content: center !important;
}
img {
  margin: auto;
}
.btn {
  margin-top: 1rem;
}
</style>
