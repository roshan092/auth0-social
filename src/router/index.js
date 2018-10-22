import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './../components/HomePage.vue';
import LoginCallback from './../components/LoginCallback.vue';
import LogoutCallback from './../components/LogoutCallback.vue';
import SocialCallback from './../components/SocialCallback.vue';
import CustomSignup from './../components/CustomSignup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login/callback',
      name: 'LoginCallback',
      component: LoginCallback,
    },
    {
      path: '/custom/signup',
      name: 'CustomSignup',
      component: CustomSignup,
    },
    {
      path: '/social/callback',
      name: 'SocialCallback',
      component: SocialCallback,
    },
    {
      path: '/logout/callback',
      name: 'LogoutCallback',
      component: LogoutCallback,
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
  ],
});
