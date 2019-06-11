<template>
  <v-app>
<!--    <NavBar />-->
    <component :is="layout">
        <router-view></router-view>
    </component>

      <template v-if="error">
          <v-snackbar
                  :timeout="5000"
                  :multi-line="true"
                  color="error"
                  @input="closeError"
                  :value="true"
              >
                  {{ error }}
              <v-btn
                      dark
                      flat
                      @click="closeError"
                  >
                      Закрыть
              </v-btn>
          </v-snackbar>
      </template>

  </v-app>
</template>

<script>
  import AdminLayout from './layouts/AdminLayout'
  import MainLayout from './layouts/MainLayout'
// import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    // NavBar,
    MainLayout,
    AdminLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'admin') + '-layout'
    },
      error() {
        return this.$store.getters.error;
      }
  },
    methods: {
        closeError() {
            this.$store.dispatch('clearError')
        }
    }
}
</script>

<style>
</style>
