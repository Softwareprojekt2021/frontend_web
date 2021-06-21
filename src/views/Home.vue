<template>
  <div>
    <h2>Sudibörse</h2>
    <div v-if="login">
      <div v-for="offer in angebote" :key="offer">
        <b-container v-if="angebote.angebot">
          <b-row>
            <b-col
              ><p v-text="offer.title"></p>
              <b-img
                v-if="(offer.pictures || []).length === 0"
                v-bind:src="placeholder"
                fluid-grow
                rounded=""
                alt="Rounded image"
              />
              <div v-for="image in offer.pictures" :key="image">
                <b-img
                  :key="image"
                  :src="`data:image/png;base64,` + image"
                  fluid-grow
                  rounded=""
                  alt="Rounded image"
                />
              </div>
              <p v-if="offer.price !== '0.00'">{{ offer.price }}€</p>
              <p v-else>Tausch</p></b-col
            >

            <b-col>
              <p v-text="offer.description" class="border"></p>
            </b-col>
            <b-col>
              <b-button
                :href="`/angebot?id=${offer.id}`"
                type="forward"
                class="btn btn-dark btn-lg"
              >
                Angebot ansehen
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import placeholder from "../assets/product_placeholder.png";
import axios from "axios";

export default {
  data() {
    return {
      angebote: {
        angebot: {},
      },
      placeholder: placeholder,
      login: localStorage.getItem("Loggedin"),
    };
  },
  mounted() {
    const options = {
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    var i = 0;
    axios.get("http://localhost:5000/offers/recommend", options).then(
      (response) => {
        if (response.statusText !== "NO CONTENT") {
          response.data.forEach((f) => {
            if (i > 0) {
              this.angebote["angebot" + i + ""] = JSON.parse(JSON.stringify(f));
            } else {
              this.angebote["angebot"] = JSON.parse(JSON.stringify(f));
            }
            i++;
          });
        } else {
          console.log("No data found!");
          this.angebote = JSON.parse("{}");
          console.log(this.angebote);
        }
      },
      (error) => {
        console.log(error.response.status);
      }
    );
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
img {
  margin: auto;
}
</style>
