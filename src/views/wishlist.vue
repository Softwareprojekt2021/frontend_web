<template>
  <div>
    <h2>Meine Wishlist</h2>
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
              v-b-modal.modal-1
              variant="danger"
              class="btn btn-lg btn-block"
              >Aus der Wishlist entfernen</b-button
            >
            <b-modal
              ref="my-modal"
              id="modal-1"
              hide-footer
              title="Angebot aus Wishlist entfernen"
            >
              <p class="my-4">
                Sind Sie sicher das Sie das Angebot aus der Wishlist entfernen
                wollen?
              </p>
              <b-button v-on:click="hideModal">Nein</b-button>
              <b-button
                variant="danger"
                v-on:click="removeWishlist(offer.id)"
                style="float: right"
                >Ja</b-button
              >
            </b-modal>
          </b-col>
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
  </div>
</template>

<script>
import placeholder from "../assets/product_placeholder.png";
import axios from "axios";
import router from "@/router";
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
      axios.get("http://localhost:5000/watchlist", options).then((response) => {
        if (response.statusText !== "NO CONTENT") {
          response.data.forEach((f) => {
            if (i > 0) {
              this.angebote["angebot" + i + ""] = JSON.parse(JSON.stringify(f));
            } else {
              this.angebote["angebot"] = JSON.parse(JSON.stringify(f));
            }
            i++;
          });
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
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.dangebote = this.response.slice(start, start + 3);
    },
    removeWishlist(id) {
      const options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios.delete("http://localhost:5000/watchlist/" + id + "", options).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error.response.status);
        }
      );
      this.$refs["my-modal"].hide();
      this.$bvToast.toast(`Angebot wurde aus der Wishlist entfernt`, {
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
