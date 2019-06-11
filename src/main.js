import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import dateFilter from './filters/date_filter'
import FileUpload from 'v-file-upload'

Vue.config.productionTip = false;

Vue.filter('date', dateFilter);

Vue.use(FileUpload);

new Vue({
  router,
  store,
  render: h => h(App),
  // created() {
  //   this.$store.dispatch('fetchBooks');
  // }
}).$mount('#app');
