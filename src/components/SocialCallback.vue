<template>
  <div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import cookie from 'js-cookie';
import router from './../router';

export default {
  name: 'SocialCallback',
  props: ['auth'],
  created() {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.idToken) {
        const decoded = jwtDecode(authResult.idToken);
        console.log('decoded----> ', decoded);
        cookie.set('social_token', authResult.idToken);
        router.push('/');
      } else if (err) {
        // console.log(err);
      }
    });
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
