<template>
  <div>
    <h2>Meine Angebote</h2>
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
