<template>
  <div class="register">
    <b-form @submit="onSubmit" @reset="onReset">
      <h3>Registieren</h3>

      <div class="form-group">
        <label>E-Mail Adresse</label>
        <input type="email" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Vorname</label>
        <input type="text" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Nachname</label>
        <input type="text" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Passwort</label>
        <input type="password" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Universität/Fach Hochschule</label>
        <input type="text" class="form-control form-control-lg" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Registieren
      </button>

      <p class="forgot-password text-right">
        Schon ein Account?
        <router-link to="/login">Anmelden?</router-link>
      </p>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.register,
.vertical-center {
  width: 20%;
  height: 100%;
  margin: auto;
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
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
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
  margin: auto;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: 500;
}

.register,
.register a {
  text-align: center;
  font-size: 13px;
  padding-top: 0.5rem;
  //color: #7a7a7a;
  margin: auto;
}

.register a {
  color: #2554ff;
}
</style>
