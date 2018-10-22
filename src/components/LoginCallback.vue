<template>
  <div>
  </div>
</template>

<script>
import cookie from 'js-cookie';
import router from './../router';

export default {
  name: 'LoginCallback',
  props: ['auth'],
  created() {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        cookie.set('id_token', authResult.idToken);
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
