<template>
  <div>
    <h2>Sudibörse</h2>
    <!--Filter macht derzeit einige fehler wo die Filter optionen
    nicht ins select geladen werden-->
    <!--view-controls>
      <div>
        <h6 v-text="`Filter`"></h6>
        <ul class="list-unstyled">
          <li class="form-check">
            <label class="form-check-label" v-if="categories">
              <select v-model="filtered.category">
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
              </select>
            </label>
          </li>
          <li class="form-check">
            <label class="form-check-label">
              <select v-model="filtered.compensation_type">
                <option v-for="art in option" :key="art">
                  {{ art }}
                </option>
              </select>
            </label>
          </li>
          <li class="form-check">
            <label class="form-check-label" v-if="universities">
              <select v-model="filtered.university">
                <option v-for="uni in universities" :key="uni">
                  {{ uni }}
                </option>
              </select>
            </label>
          </li>
          <li class="form-check">
            <label class="form-check-label">
              <input
                  class="form-check-input"
                  name="filters"
                  v-model="filtered.min_price"
              />
              <span></span>
            </label>
          </li>
          <li class="form-check">
            <label class="form-check-label">
              <input
                  class="form-check-input"
                  name="filters"
                  v-model="filtered.max_price"
              />
              <span></span>
            </label>
          </li>
        </ul>
      </div>
      <p>
        <button
            class="btn btn-sm btn-secondary"
            type="button"
            v-on:click="clearFilters"
        >
          Clear Filters
        </button>
      </p>
    </view-controls-->
    <div>
      <div v-for="offer in dangebote" :key="offer">
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
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @input="paginate(currentPage)"
      ></b-pagination>
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
      dangebote: {
        angebot: {},
      },
      filtered: {
        min_price: "",
        max_price: "",
        category: "",
        university: "",
        compensation_type: "",
      },
      response: {},
      perPage: 3,
      rows: 1,
      currentPage: 1,
      placeholder: placeholder,
      categories: [],
      universities: [],
      option: ["Verkauf", "Tausch"],
      //search: ["btnText"],
      login: localStorage.getItem("Loggedin"),
    };
  },
  mounted() {
    var options = "";
    var i = 0;
    console.log(this.login);
    if (this.login !== null) {
      options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios.get("http://localhost:5000/offers/recommend", options).then(
        (response) => {
          if (response.statusText !== "NO CONTENT") {
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
            this.response = response.data;
            this.rows = response.data.length;
            this.dangebote = response.data.slice(0, 3);
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
    } else {
      console.log("test21");
      axios.get("http://localhost:5000/offers/recommend").then(
        (response) => {
          console.log(response);
          if (response.statusText !== "NO CONTENT") {
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
            this.response = response.data;
            this.rows = response.data.length;
            this.dangebote = response.data.slice(0, 3);
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
    }
    try {
      axios.get("http://localhost:5000/categories").then((response) => {
        this.categories = response.data;
        this.categories[this.categories.length] = "";
      });
      axios.get("http://localhost:5000/universities").then((response) => {
        this.universities = response.data;
        this.universities[this.universities.length] = "";
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.dangebote = this.response.slice(start, start + 3);
    },
    /*getfilteredAngebote(search) {
      const options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      var i = 0;
      axios.get("http://localhost:5000/offers/filtered", options).then(
        (response) => {
          if (response.statusText !== "NO CONTENT") {
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
            this.response = response.data;
            this.rows = response.data.length;
            this.dangebote = response.data.slice(0, 3);
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
    },*/
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
.pagination {
  margin: auto;
  justify-content: center;
}
</style>
