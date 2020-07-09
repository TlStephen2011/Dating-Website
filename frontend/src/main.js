import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueGeolocation from 'vue-browser-geolocation';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VuePaginate from 'vue-paginate';

Vue.use(VuePaginate)
Vue.use(Loading);
Vue.use(VueAxios, axios)
Vue.use(VueGeolocation);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
