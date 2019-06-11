<template>
    <div>
        <NavBar />
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
    import NavBar from './../components/NavBar'

    export default {
        name: "MainLayout",
        components: {
            NavBar
        }
    }
</script>

<style scoped>

</style>