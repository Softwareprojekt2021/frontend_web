<template>
  <div>
    <h2>Meine Angebote</h2>
    <b-container>
      <!--b-row v-for="row in angebote" :key="row">
        <b-col v-for="items in row" :key="items"> </b-col>
      </b-row-->
      <b-row>
        <b-col
          ><p v-text="angebote.angebot.title"></p>
          <b-img
            v-bind:src="placeholder"
            height="165"
            width="215"
            rounded=""
            alt="Rounded image" />
          <p v-text="angebote.angebot.betrag"></p
        ></b-col>
        <b-col>
          <p v-text="angebote.angebot.text" class="border"></p>
        </b-col>
        <b-col
          ><b-button href="/edit" type="forward" class="btn btn-dark btn-lg">
            Angebot bearbeiten
          </b-button></b-col
        >
      </b-row>
      <b-button
        href="/erstellangebot"
        type="forward"
        class="btn btn-dark btn-lg btn-block"
      >
        Angebot erstellen
      </b-button>
    </b-container>
  </div>
</template>

<script>
import placeholder from "../assets/profile.png";
export default {
  data() {
    return {
      angebote: {
        angebot: {
          art: "",
          cat: "",
          betrag: "",
          title: "",
          text: "",
        },
      },
      placeholder: placeholder,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const res = await fetch("angebot.json");
        const val = await res.json();
        console.log(val);
        this.angebote.angebot.art = val.art;
        this.angebote.angebot.cat = val.cat;
        this.angebote.angebot.betrag = val.betrag;
        this.angebote.angebot.text = val.text;
        this.angebote.angebot.title = val.title;
        //console.log(JSON.stringify(this.angebote));
      } catch (e) {
        console.log(e);
      }
    },
  },
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
