<template>
  <div>
    <h2>Angebot bearbeiten</h2>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
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
          <!-- Plain mode -->
          <b-form-file
            multiple
            v-model="tmpimg"
            @change="onFileChange"
            class="mt-3 ml-5"
            plain
          ></b-form-file>
          <span>Verkauft? </span>
          <input v-model="angebot.sold" type="checkbox" :value="true" />
          <span v-if="angebot.sold"> Ja </span>
          <span v-else> Nein </span>
        </b-col>
        <b-col>
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
          <br />
          <b-button class="btn btn-dark btn-lg btn-block" v-on:click="onSubmit"
            >Angebot updaten</b-button
          >
          <b-button
            v-b-modal.modal-1
            variant="danger"
            class="btn btn-lg btn-block"
            >Angebot löschen</b-button
          >
          <b-modal
            ref="my-modal"
            id="modal-1"
            hide-footer
            title="Angebot Löschen"
          >
            <p class="my-4">
              Sind Sie sicher das Sie das Angebot löschen wollen?
            </p>
            <b-button v-on:click="hideModal">Nein</b-button>
            <b-button
              variant="danger"
              v-on:click="deleteOffer"
              style="float: right"
              >Ja</b-button
            >
          </b-modal>
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
        id: this.offer_id,
        sold: false,
      },
      option: ["Bar", "Tausch"],
      placeholder: placeholder,
      login: localStorage.getItem("Loggedin"),
      offer_id: "",
      categories: "",
      tmpimg: [],
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
    axios
      .get(
        "https://studiboerse.germanywestcentral.cloudapp.azure.com/offer/" +
          id +
          "",
        options
      )
      .then(
        (response) => {
          this.angebot = response.data;
        },
        (error) => {
          console.log(error.response.status);
        }
      );
    try {
      axios
        .get(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/categories"
        )
        .then((response) => {
          this.category = response.data;
        });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    //Request für das Posten des Angebots hierhin.
    onSubmit: function (event) {
      event.preventDefault();
      const options = {
        url: "https://studiboerse.germanywestcentral.cloudapp.azure.com/offer",
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios
        .put(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/offer",
          this.angebot,
          options
        )
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
      this.$bvToast.toast(`Angebot wurde geupdated`, {
        title: "Studibörse",
        autoHideDelay: 5000,
      });
      setTimeout(function () {
        router.push("/meineangebote");
      }, 1000);
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
    deleteOffer() {
      const options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios
        .delete(
          "https://studiboerse.germanywestcentral.cloudapp.azure.com/offer/" +
            this.offer_id +
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
      this.$refs["my-modal"].hide();
      this.$bvToast.toast(`Angebot wurde gelöscht`, {
        title: "Studibörse",
        autoHideDelay: 5000,
      });
      setTimeout(function () {
        router.push("/meineangebote");
      }, 1000);
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
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
</style>
