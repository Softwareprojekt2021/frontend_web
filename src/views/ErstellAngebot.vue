<template>
  <div>
    <h2>Angebot erstellen</h2>
    <p>Bilder</p>
    <b-img
      v-bind:src="placeholder"
      height="165"
      width="215"
      align="left"
      rounded=""
      alt="Rounded image"
    />
    <!-- Plain mode -->
    <b-form-file multiple v-model="files" class="mt-3 ml-5" plain></b-form-file>
    <b-input-group>
      <label>Verkaufsart:</label>
      <br />
      <select v-model="art">
        <option v-for="art in option" :key="art">{{ art }}</option>
      </select>
      <label>Kategorie:</label>
      <br />
      <select v-model="cat">
        <option v-for="cat in category" :key="cat">{{ cat }}</option>
      </select>
    </b-input-group>
  </div>
</template>

<script>
import placeholder from "../assets/profile.png";
export default {
  data() {
    return {
      files: [],
      placeholder: placeholder,
      option: ["Verkauf", "Tausch"],
      art: "",
      cat: "",
      category: ["Literatur", "Mikrocontroller", "Datenträger", "Hardware"],
    };
  },
  methods: {
    OnClick(event) {
      event.preventDefault();
      alert("Button got clicked");
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
