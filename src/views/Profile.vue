<template>
  <div>
    <h2>Profile</h2>
    <b-container class="bv-example-row" @submit="onSubmit">
      <b-row>
        <!--Profilbild mit einem Button zum ändern des Bildes-->
        <b-col>
          <h3>Profilbild</h3>
          <b-avatar
            v-if="!form.profile_picture"
            v-bind:src="placeholder"
            fluid-grow
            rounded=""
            size="16rem"
            alt="Rounded image" />
          <b-avatar
            v-bind:src="form.profile_picture"
            fluid-grow
            rounded=""
            size="16rem"
            alt="Rounded image"
            v-if="form.profile_picture" />
          <!-- Plain mode -->
          <b-form-file
            accept=".jpg, .png"
            v-model="form.profile_picture"
            @change="onFileChange"
            class="mt-3 ml-5"
            plain
          ></b-form-file
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
              <label>
                <select v-model="form.university">
                  <option v-for="uni in universities" :key="uni">
                    {{ uni }}
                  </option>
                </select>
              </label>
            </b-form-group>
            <!--b-form-group
              id="input-group-5"
              label="Altes Passwort:"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="form.opassword"
                type="password"
                placeholder="Altes Passwort"
              ></b-form-input>
            </b-form-group-->
            <b-form-group
              id="input-group-6"
              label="Neues Passwort:"
              label-for="input-6"
            >
              <b-form-input
                id="input-6"
                v-model="form.password"
                type="password"
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
  </div>
</template>

<script>
import placeholder from "../assets/profile.png";
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      form: {
        e_mail: "",
        last_name: "",
        first_name: "",
        university: "",
        password: "",
        profile_picture: "",
      },
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
        let tmp = "";
        tmp = this.form.profile_picture;
        if (tmp !== undefined) {
          this.form.profile_picture = "data:image/png;base64," + tmp + "";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  methods: {
    //Request für das updaten der Account Daten.
    onSubmit: function (event) {
      event.preventDefault();
      this.form.profile_picture = this.form.profile_picture.split(",")[1];
      const options = {
        headers: {
          Authorization: "Bearer " + this.login + " ",
        },
      };
      axios.put("http://localhost:5000/user", this.form, options);
      this.$bvToast.toast(`Profil wurde geupdated`, {
        title: "Studibörse",
        autoHideDelay: 5000,
      });
      setTimeout(function () {
        router.go();
      }, 300);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.profile_picture = e.target.result;
      };
      reader.onerror = function (error) {
        alert(error);
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss">
h2 {
  margin-left: 2rem;
}
.b-from {
  width: 60%;
  margin: auto;
}
img {
  margin: auto;
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
  width: fit-content;
  margin: auto;
}
h3 {
  align-content: center;
  margin-bottom: 2rem;
}
</style>
