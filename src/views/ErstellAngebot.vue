<template>
  <div>
    <h2>Angebot erstellen</h2>
    <b-container class="bv-example-row" @submit="onSubmit">
      <p>Bilder</p>
      <br />
      <b-img
        v-bind:src="placeholder"
        height="165"
        width="215"
        align="left"
        rounded=""
        alt="Rounded image"
      />
      <b-form class="form-group">
        <!-- Plain mode -->
        <b-form-file
          multiple
          v-model="files"
          class="mt-3 ml-5"
          plain
        ></b-form-file>
        <label>Verkaufsart:</label>
        <br />
        <select v-model="angebot.art">
          <option v-for="art in option" :key="art">{{ art }}</option>
        </select>
        <label>Kategorie:</label>
        <br />
        <select v-model="angebot.cat">
          <option v-for="cat in category" :key="cat">{{ cat }}</option>
        </select>
        <b-form-group
          id="input-group-1"
          label="Betrag:"
          label-for="input-1"
          v-if="angebot.art !== 'Tausch'"
        >
          <b-form-input
            id="input-1"
            v-model="angebot.betrag"
            v-if="angebot.art !== 'Tausch'"
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
          v-model="angebot.text"
          placeholder="Beschreibung"
        >
        </b-form-textarea>
        <b-button type="submit" class="btn btn-dark btn-lg btn-block"
          >Erstellen</b-button
        >
      </b-form>
    </b-container>
  </div>
</template>

<script>
import placeholder from "../assets/profile.png";
export default {
  data() {
    return {
      angebot: {
        art: "",
        cat: "",
        betrag: "",
        title: "",
        text: "",
      },
      files: [],
      placeholder: placeholder,
      option: ["Verkauf", "Tausch"],
      category: ["Literatur", "Mikrocontroller", "Datenträger", "Hardware"],
    };
  },
  methods: {
    onSubmit: function (event) {
      event.preventDefault();
      alert(JSON.stringify(this.angebot));
      console.log(JSON.stringify(this.angebot));
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
p {
  float: left;
}
</style>
