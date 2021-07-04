<template>
  <div>
    <h2>Meine Angebote</h2>
    <div v-if="angebote.angebot">
      <b-container v-for="offer in dangebote" :key="offer">
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
              :href="`/editoffer?id=${offer.id}`"
              type="forward"
              class="btn btn-dark btn-lg"
            >
              Angebot bearbeiten
            </b-button></b-col
          >
        </b-row>
      </b-container>
    </div>
    <b-pagination
      v-if="angebote.angebot"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="paginate(currentPage)"
    ></b-pagination>
    <br />
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
      dangebote: {
        angebot: {},
      },
      response: {},
      perPage: 3,
      rows: 1,
      currentPage: 1,
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
      axios
        .get(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/offers",
          options
        )
        .then((response) => {
          if (response.statusText !== "NO CONTENT") {
            try {
              response.data.forEach((f) => {
                if (i > 0) {
                  this.angebote["angebot" + i + ""] = JSON.parse(
                    JSON.stringify(f)
                  );
                } else {
                  this.angebote["angebot"] = JSON.parse(JSON.stringify(f));
                }
                i++;
              });
            } catch (e) {
              console.log(e);
            }

            this.response = response.data;
            this.rows = response.data.length;
            this.dangebote = response.data.slice(0, 3);
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
  methods: {
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.dangebote = this.response.slice(start, start + 3);
    },
  },
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
