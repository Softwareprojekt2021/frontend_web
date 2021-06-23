<template>
  <div>
    <h2>Meine Angebote</h2>
    <div v-if="angebote.angebot">
      <b-container v-for="offer in angebote" :key="offer">
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
            <b-img
              v-else
              v-for="image in offer.pictures"
              :key="image"
              :src="`data:image/png;base64,` + image"
              fluid-grow
              rounded=""
              alt="Rounded image"
            />
            <p>{{ offer.price }}€</p>
          </b-col>
          <b-col>
            <p v-text="offer.description" class="border"></p>
          </b-col>
          <b-col
            ><b-button
              :href="`/edit?id=${offer.id}`"
              type="forward"
              class="btn btn-dark btn-lg"
            >
              Angebot bearbeiten
            </b-button></b-col
          >
        </b-row>
      </b-container>
    </div>
    <div>
      <b-button
        href="/erstellangebot"
        type="forward"
        class="btn btn-dark btn-lg btn-block"
      >
        Angebot erstellen
      </b-button>
    </div>
  </div>
</template>

<script>
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
    try {
      axios.get("http://localhost:5000/offers", options).then((response) => {
        console.log(response);
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
      });
    } catch (e) {
      console.warn("Error Status: ");
      console.warn(e);
    }
  },
  methods: {},
};
</script>

<style lang="scss">
.btn-dark {
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
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
