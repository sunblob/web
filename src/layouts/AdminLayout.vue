<template>
    <div>
        <AdminNav />
        <v-content>
            <router-view></router-view>
        </v-content>
        <Footer />
    </div>
</template>

<script>
    import AdminNav from '../components/AdminNav'
    import Footer from '../components/Footer'

    export default {
        name: "AdminLayout",
        components: {
            AdminNav,
            Footer
        }
    }
</script>

<style scoped>

</style>