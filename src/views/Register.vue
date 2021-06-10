<template>
  <div class="register">
    <h3>Registrieren</h3>
    <!--Die form um die Registrierungs Daten ans Backend zu schicken-->
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="E-Mail Adresse:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.e_mail"
          type="email"
          placeholder="M.Mustermann@email.de"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nachname:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.last_name"
          placeholder="Mustermann"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Vorname:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.first_name"
          placeholder="Max"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Uni/FH:" label-for="input-4">
        <label>
          <select v-model="form.university">
            <option v-for="uni in universities" :key="uni">{{ uni }}</option>
          </select>
        </label>
      </b-form-group>

      <b-form-group id="input-group-5" label="Studiengang:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.course"
          placeholder="Studiengang"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Passwort:" label-for="input-5">
        <b-form-input
          id="input-5"
          type="password"
          v-model="form.password"
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
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      form: {
        e_mail: "",
        first_name: "",
        last_name: "",
        password: "",
        university: "",
        course: "",
      },
      universities: [],
      show: true,
    };
  },
  methods: {
    onSubmit: function (event) {
      event.preventDefault();
      try {
        axios.post("http://localhost:5000/user", this.form);
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    try {
      axios.get("http://localhost:5000/universities").then((response) => {
        this.universities = response.data;
      });
    } catch (e) {
      console.log(e);
    }
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
  width: fit-content;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
