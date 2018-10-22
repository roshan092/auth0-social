<template>
  <div id="app">
    <router-view v-if="auth && lock" :auth="auth" :lock="lock"></router-view>
  </div>
</template>

<script>
import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

export default {
  name: 'App',
  created() {
    this.initialize();
  },
  data() {
    return {
      auth: null,
      lock: null,
    };
  },
  methods: {
    initialize() {
      this.auth = new auth0.WebAuth({
        domain: 'souzalobos.au.auth0.com',
        clientID: 'WxF9QOfKcpaTEAx5oXkv4Y7MmvjugFx7',
        audience: 'https://souzalobos.au.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid',
      });
      // Instantiates Lock, to get a token that will be then used to
      // link the account
      const opts = {
        rememberLastLogin: false,
        auth: {
          responseType: 'token id_token',
          redirectUrl: 'http://localhost:8080/social/callback',
        },
        dict: {
          signin: {
            title: 'Link another account',
          },
        },
      };
      opts.allowedConnections = ['facebook', 'twitter', 'google-oauth2'];
      console.log('before lock initialize');
      this.lock = new Auth0Lock('WxF9QOfKcpaTEAx5oXkv4Y7MmvjugFx7', 'souzalobos.au.auth0.com', opts);
    },
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
