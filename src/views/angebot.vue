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
              height="165"
              width="215"
              align="left"
              rounded=""
              alt="Rounded image"
            />
          </div>
          <p v-if="angebot.price !== '0.00'">{{ angebot.price }}€</p>
          <p v-else>Tausch</p>
        </b-col>
        <b-col>
          <p v-text="angebot.description" class="border"></p>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <h3>Kontaktdaten</h3>
      </b-row>
      <b-row>
        <b-col>
          E-Mail: {{angebot.user.e_mail}}
        </b-col>
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
      angebot: [],
      placeholder: placeholder,
      login: localStorage.getItem("Loggedin"),
    };
  },
  mounted() {
    var url = window.location.href;
    console.log(url);
    url = url.split("=");
    var id = url[1];
    console.log(id);
    const options = {
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios.get("http://localhost:5000/offer/" + id + "", options).then(
      (response) => {
        this.angebot = response.data;
        console.log(this.angebot);
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
.align-content-center {
  margin: auto;
  align-content: center !important;
}
img {
  margin: auto;
}
</style>
