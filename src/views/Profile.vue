<template>
  <div>
    <h3>Profile</h3>
    <b-container class="bv-example-row" @submit="onSubmit">
      <b-row>
        <!--Profilbild mit einem Button zum ändern des Bildes-->
        <b-col>
          <p>Profilbild</p>
          <b-img
            v-bind:src="placeholder"
            height="165"
            width="215"
            align="left"
            rounded=""
            alt="Rounded image" />
          <!--b-img
            v-bind:src="file1"
            height="165"
            width="215"
            align="left"
            rounded=""
            alt="Rounded image"
            v-if="file1"
          /-->
          <!-- Plain mode -->
          <b-form-file v-model="file1" class="mt-3 ml-5" plain></b-form-file
        ></b-col>
        <!--Input Felder zum Bearbeiten des Profils-->
        <b-col
          ><b-form class="form-group">
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

            <b-form-group
              id="input-group-2"
              label="Nachname:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.last_name"
                placeholder="Mustermann"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Vorname:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.first_name"
                placeholder="Max"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Uni/FH:"
              label-for="input-4"
            >
              <select v-model="form.university">
                <option v-for="uni in universities" :key="uni">{{ uni }}</option>
              </select>
            </b-form-group>
            <b-form-group
              id="input-group-5"
              label="Altes Passwort:"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="form.opassword"
                placeholder="Altes Passwort"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-6"
              label="Neues Passwort:"
              label-for="input-6"
            >
              <b-form-input
                id="input-6"
                v-model="form.password"
                placeholder="Neues Passwort"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" class="btn btn-dark btn-lg btn-block"
              >Aktualisieren</b-button
            >
          </b-form></b-col
        >
      </b-row>
    </b-container>

    <!--div class="mt-3">Selected file: {{ file1 ? file1.name : "" }}</div-->
  </div>
</template>

<script>
import placeholder from "../assets/profile.png";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        e_mail: "",
        last_name: "",
        first_name: "",
        university: "",
        opassword: "",
        password: "",
      },
      file1: null,
      placeholder: placeholder,
      login: localStorage.getItem("Loggedin"),
      universities: [],
    };
  },
  mounted() {
    try {
      axios.get("http://localhost:5000/universities").then((response) => {
        this.universities = response.data;
      });
    } catch (e) {
      console.log(e);
    }
    //Request für die Account Daten hierhin.
    const options = {
      method: "GET",
      url: "http://localhost:5000/user",
      headers: {
        Authorization: "Bearer " + this.login + " ",
      },
    };
    axios
      .request(options)
      .then((response) => {
        this.form = response.data;
        console.log(this.form);
      })
      .catch(function (error) {
        console.error(error);
      });
    //this.fetchData();
  },
  methods: {
    //Request für das updaten der Account Daten.
    onSubmit: function (event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      console.log(JSON.stringify(this.form));
    },
  },
};
</script>

<style lang="scss">
h3 {
  margin-left: 2rem;
}
.b-from {
  width: 60%;
  margin: auto;
}
img {
  margin-left: 3rem;
}
p {
  margin-left: 3rem;
}
.b-form-file {
  width: 60%;
  margin-left: 2rem;
  float: left;
}
.form-group {
  margin-bottom: 0.5rem;
}
.btn-dark {
  width: 35%;
  margin: auto;
}
</style>
