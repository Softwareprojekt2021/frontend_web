<template>
  <div>
    <h3 align="left">Profile</h3>
    <p align="left">Profilbild</p>
    <img src="../assets/profile.png" height="165" width="215" align="left" />
    <!-- Styled -->
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file1 ? file1.name : "" }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file1: null,
    };
  },
};
</script>

<style lang="scss">
h3 {
  margin-left: 2rem;
}
b-from {
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
}
</style>
