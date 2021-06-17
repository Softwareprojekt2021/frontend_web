<template>
  <div>
    <h2>Meine Angebote</h2>
    <div v-for="offer in angebote" :key="offer">
      <b-container v-if="angebote">
        <!--b-row v-for="row in angebote" :key="row">
        <b-col v-for="items in row" :key="items"> </b-col>
      </b-row-->
        <b-row>
          <b-col
            ><p v-text="offer.title"></p>
            <b-img
              v-if="offer.pictures.length === 0"
              v-bind:src="placeholder"
              height="165"
              width="215"
              rounded=""
              alt="Rounded image"
            />
            <div v-for="image in offer.pictures" :key="image">
              <b-img
                :key="image"
                :src="`data:image/png;base64,` + image"
                height="165"
                width="215"
                rounded=""
                alt="Rounded image"
              />
            </div>
            <p>{{ offer.price }}€</p></b-col
          >
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
    <b-button
      href="/erstellangebot"
      type="forward"
      class="btn btn-dark btn-lg btn-block"
    >
      Angebot erstellen
    </b-button>
  </div>
</template>

<script>
import placeholder from "../assets/profile.png";
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
      url: "http://localhost:5000/offer",
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    //let self = this;
    //let tmp = "";
    var i = 0;
    try {
      axios.get("http://localhost:5000/offers", options).then((response) => {
        console.log(response.data);
        response.data.forEach((f) => {
          if (i > 0) {
            this.angebote["angebot" + i + ""] = JSON.parse(JSON.stringify(f));
            /*tmp = "";
            tmp = this.angebote["angebot" + i + ""].pictures;
            if (this.angebote["angebot" + i + ""].pictures.length !== 0) {
              this.angebote["angebot" + i + ""].pictures =
                "data:image/png;base64," + tmp + "";
            }*/
          } else {
            this.angebote["angebot"] = JSON.parse(JSON.stringify(f));
            /*tmp = "";
            tmp = this.angebote["angebot"].pictures;
            if (this.angebote["angebot"].pictures.length !== 0) {
              this.angebote["angebot"].pictures =
                "data:image/png;base64," + tmp + "";
            }*/
          }
          i++;
        });
        /*this.angebote.forEach((a) =>{
          tmp = "";
          tmp = a.pictures;
          if(a.pictures !== null){
            a.pictures = "data:image/png;base64," + tmp + "";

          }
        });*/
        /*tmp = this.form.profile_picture;
        if (this.form.profile_picture !== null) {
          this.form.profile_picture = "data:image/png;base64," + tmp + "";
          this.url = this.form.profile_picture;
        }*/
        console.log(this.angebote);
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {},
  /*computed: {
    rows() {
      var rows = [];
      var itemsPerRow = 3;
      // assuming passer is an array of items..
      var arr = this.passer;
      for (var i = 0; i < arr.length; i += itemsPerRow) {
        var row = [];
        for (var z = 0; z < itemsPerRow; z++) {
          row.push(arr[i + z]);
        }
        rows.push(row);
      }
      return rows;
    },
  },*/
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
</style>
