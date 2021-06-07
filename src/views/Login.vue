<template>
  <div class="login" id="login">
    <h3>Login</h3>
    <!--Die form um die Login Daten ans Backend zu schicken-->
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

      <b-form-group id="input-group-2" label="Passwort:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Passwort"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn btn-dark btn-lg btn-block"
        >Anmelden</b-button
      >
      <!--Links zu der Register-Page und zum Passwort-vergessen Page-->
      <div>
        <p class="register text-left mt-2" style="float: left">
          <router-link to="/register">Noch kein Account ?</router-link>
        </p>

        <p class="forgot-password text-right mt-2 mb-4" style="float: right">
          <router-link to="/forgot-password">Passwort vergessen ?</router-link>
        </p>
      </div>
    </b-form>
  </div>
</template>

<!--Das script gibt der form Variablen in Javascript und eine Methode die, die Werte in einem Alter anzeigt-->
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      data: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post("http://localhost:5000/login", this.form).then(
        (response) => {
          this.data = response;
          console.log(JSON.stringify(this.data));
        },
        (error) => {
          console.log(error);
        }
      );
      this.localData();
    },
    localData: function () {
      localStorage.setItem("Loggedin", true);
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
.login,
.vertical-center {
  width: 40%;
  height: 100%;
  margin: auto;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}

.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}

.vertical-center .form-control:focus {
  border-color: #2554ff;
  box-shadow: none;
}

.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: 500;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 0;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554ff;
}

.register,
.register a {
  text-align: left;
  font-size: 13px;
  padding-top: 0;
  color: #7a7a7a;
  margin: 0;
}

.register a {
  color: #2554ff;
}
</style>
