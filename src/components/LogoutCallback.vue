<template>
  <div>
  </div>
</template>

<script>
import router from './../router';

export default {
  name: 'LogoutCallback',
  created() {
    router.push('/');
  },
};
</script>
