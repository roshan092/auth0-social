<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="login" ></button>
  </div>
</template>

<script>
function login() {
  this.auth.authorize({ redirectUri: 'http://localhost:8080/login/callback' });
}

export default {
  name: 'LogoutPage',
  props: ['auth'],
  data() {
    return {
      msg: 'You have been successfully logged out',
    };
  },
  methods: {
    login,
  },
};
</script>

<style scoped>
</style>
