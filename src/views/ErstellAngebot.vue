<template>
  <div>
    <h2>Angebot erstellen</h2>
    <b-container class="bv-example-row" @submit="onSubmit">
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
          <div v-for="image in url" :key="image">
            <b-img
              :key="image"
              v-bind:src="image"
              fluid-grow
              align="left"
              rounded=""
              alt="Rounded image"
            />
          </div>

          <!-- Plain mode -->
          <b-form-file
            multiple
            v-model="tmpimg"
            @change="onFileChange"
            class="mt-3 ml-5"
            plain
          ></b-form-file>
        </b-col>
        <b-form class="form-group">
          <b-col md="auto">
            <label>Verkaufsart:</label>
            <select v-model="angebot.compensation_type">
              <option v-for="art in option" :key="art">
                {{ art }}
              </option></select
            ><br />
            <label>Kategorie:</label>
            <select v-model="angebot.category">
              <option v-for="cat in category" :key="cat">{{ cat }}</option>
            </select>
            <b-form-group
              id="input-group-1"
              label="Betrag:"
              label-for="input-1"
              v-if="angebot.compensation_type !== 'Tausch'"
            >
              <b-form-input
                id="input-1"
                v-model="angebot.price"
                v-if="angebot.compensation_type !== 'Tausch'"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Title:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="angebot.title"
                required
              ></b-form-input>
            </b-form-group>
            <label>Beschreibung:</label>
            <b-form-textarea
              id="textarea"
              v-model="angebot.description"
              placeholder="Beschreibung"
            >
            </b-form-textarea>
            <b-button type="submit" class="btn btn-dark btn-lg btn-block"
              >Erstellen</b-button
            >
          </b-col>
        </b-form>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import placeholder from "../assets/product_placeholder.png";
import axios from "axios";
export default {
  data() {
    return {
      angebot: {
        compensation_type: "",
        category: "",
        price: "0.00",
        title: "",
        description: "",
        pictures: [],
        sold: "",
      },
      url: [],
      placeholder: placeholder,
      login: localStorage.getItem("Loggedin"),
      option: ["Verkauf", "Tausch"],
      category: [],
      tmpimg: [],
    };
  },
  methods: {
    //Request für das Posten des Angebots hierhin.
    onSubmit: function (event) {
      event.preventDefault();
      const options = {
        url: "http://localhost:5000/offer",
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios
        .post("http://localhost:5000/offer", this.angebot, options)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    onFileChange(e) {
      this.url = [];
      this.angebot.pictures = [];
      const file = e.target.files;
      file.forEach((f) => {
        if (!f.type.match("image.*")) {
          return;
        }
        let reader = new FileReader();
        let that = this;
        reader.onload = (e) => {
          that.url.push(e.target.result);
          this.angebot.pictures.push(e.target.result.split(",")[1]);
        };
        reader.onerror = function (error) {
          alert(error);
        };
        reader.readAsDataURL(f);
      });
    },
  },
  //Request für das Getten der Kategorien der Angeboten hierhin.
  mounted() {
    try {
      axios.get("http://localhost:5000/categories").then((response) => {
        this.category = response.data;
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss">
.btn-dark {
  width: auto;
  margin: auto;
}
img {
  margin: auto;
}
p {
  margin-right: 2rem;
}
.b-form-file {
  width: 60%;
  margin-left: 2rem;
  float: left;
}
.form-group {
  margin-bottom: 0.5rem;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
