<template>
  <div class="hello">
    <h1>{{ isAuthenticated? 'Welcome' : 'Please Log in for full access'}}</h1>
    <button v-if="!isAuthenticated" @click="login">login</button>
    <button v-if="isAuthenticated" @click="logout">logout</button>
    <button v-if="isAuthenticated" @click="refresh">refresh</button>
    <!--<div><span>Token: {{idToken}}</span></div>-->
    <div><span>{{this.decoded}}</span></div>
    <div>
      <h1>Social Linking</h1>
      <div><button @click="linkGoogle" >Google</button></div>
      <div><span>{{this.socialDecoded}}</span></div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

function logout() {
  cookie.remove('id_token');
  cookie.remove('social_token');
  this.auth.logout({ returnTo: 'http://localhost:8080/logout/callback' });
}

function login() {
  this.auth.authorize({ redirectUri: 'http://localhost:8080/login/callback' });
}

function refresh() {
  this.auth.checkSession({ redirectUri: 'http://localhost:8080/login/callback' }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      this.idToken = result.idToken;
      cookie.set('id_token', this.idToken);
      this.decoded = jwtDecode(this.idToken);
    }
  });
}

function linkGoogle() {
  // localStorage.setItem('linking', 'linking');
  // this.lock.show();
  this.auth.authorize({
    redirectUri: 'http://localhost:8080/social/callback',
    responseType: 'token id_token',
    connection: 'google-oauth2',
    type: 'link',
  });
}

function lockAuthenticated(authResult) {
  if (localStorage.getItem('linking') === 'linking') {
    // The "Link Account" method first saves the "linking" item and then authenticates
    // We identify that flow here, so after each subsequent log-in, we link the accounts
    localStorage.removeItem('linking');
    console.log('google link---->', authResult.idToken);
  }
}

export default {
  name: 'HomePage',
  props: ['auth', 'lock'],
  created() {
    this.idToken = cookie.get('id_token');
    this.socialToken = cookie.get('social_token');
    this.isAuthenticated = !!(this.idToken);
    this.lock.on('authenticated', lockAuthenticated);
    if(this.idToken) {
      this.decoded = jwtDecode(this.idToken);
    }
    if(this.socialToken) {
      this.socialDecoded = jwtDecode(this.socialToken);
    }
  },
  data() {
    return {
      isAuthenticated: false,
      idToken: '',
      decoded: {},
      socialDecoded: {},
    };
  },
  methods: {
    logout,
    login,
    refresh,
    linkGoogle,
  },
};
</script>

<style scoped>
</style>
