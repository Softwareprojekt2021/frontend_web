<template>
  <div>
    <h2>Meine Angebote</h2>
    <b-container>

      <p v-text="angebote.angebot.title"></p>
    </b-container>
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
};
</script>

<style lang="scss">
.btn-dark {
  width: 15%;
  margin-left: auto;
  margin-right: auto;
}
</style>
