<template>
  <div>
    <div>Please confirm your details</div>
    <div>
      <div>
        Email: <input type="text" v-model="email"/>
      </div>
      <div>
        First Name: <input type="text" v-model="givenName"/>
      </div>
      <div>
        Last Name: <input type="text" v-model="familyName"/>
      </div>
      <div>
        Postcode: <input type="text" v-model="postcode"/>
      </div>
      <div>
        <button @click="signup">Continue Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function signup() {
    window.location.href
      = `https://souzalobos.au.auth0.com/continue?` +
      `state=${this.state}&type=register&postcode=${this.postcode}&email=${this.email}&given=${this.givenName}&family=${this.familyName}`;
  }

  export default {
    name: 'CustomSignup',
    props: ['auth'],
    created() {
      this.state = getParameterByName('state');
      this.email = getParameterByName('email');
      this.givenName = getParameterByName('given');
      this.familyName = getParameterByName('family');
      console.log('=============>state', state);
    },
    data() {
      return {
        state: '',
        email: '',
        givenName: '',
        familyName: '',
        postcode: '',
      };
    },
    methods: {
      signup,
    }
  };
</script>

<style scoped>
</style>
