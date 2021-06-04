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
                v-model="form.email"
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
                v-model="form.name"
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
                v-model="form.vname"
                placeholder="Max"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Uni/FH:"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="form.uni"
                placeholder="Uni/FH"
              ></b-form-input>
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
                v-model="form.npassword"
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
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        vname: "",
        uni: "",
        opassword: "",
        npassword: "",
      },
      file1: null,
      placeholder: placeholder,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    //Request für die Account Daten hierhin.
    async fetchData() {
      try {
        const res = await fetch("user.json");
        const val = await res.json();
        console.log(val);
        this.form.email = val.email;
        this.form.name = val.name;
        this.form.vname = val.vname;
        this.form.uni = val.uni;
      } catch (e) {
        console.log(e);
      }
    },
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
