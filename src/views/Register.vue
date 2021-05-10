<template>
  <div class="register">
    <h3>Registrieren</h3>
    <!--Die form um die Registrierungs Daten ans Backend zu schicken-->
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="E-Mail Adresse:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="M.Mustermann@email.de"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nachname:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Mustermann"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Vorname:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.vname"
          placeholder="Max"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Uni/FH:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.uni"
          placeholder="Uni/FH"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Passwort:" label-for="input-5">
        <b-form-input
          id="input-5"
          type="password"
          v-model="form.passwort"
          placeholder="Passwort"
          required
        ></b-form-input>
      </b-form-group>

      <!--b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group-->

      <b-button type="submit" class="btn btn-dark btn-lg btn-block"
        >Registrieren</b-button
      >
      <!--b-button type="reset" variant="danger">Reset</b-button-->
    </b-form>
    <!--b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card-->
  </div>
</template>
<!--Das script gibt der form Variablen in Javascript und eine Methode die, die Werte in einem Alert anzeigt-->
<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        vname: "",
        passwort: "",
        uni: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit: function (event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      console.log(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
<!--Die Benötigten css styles für die Seite-->
<style lang="scss" scoped>
div {
  width: 60%;
  height: 100%;
  margin: auto;
}
button {
  width: 45%;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
