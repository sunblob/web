<template>
    <div>
        <v-navigation-drawer app permanent :clipped="true">
            <v-list>
                <v-list-tile @click="toProfileSettings">
                    <v-icon left>settings</v-icon>
                    Настройки
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile @click="toPurchaseHistory" v-if="!user.isAdmin">
                    <v-icon left>history</v-icon>
                    История покупок
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile v-if="user.isAdmin" @click="toAdmin">
                    <v-icon left>dashboard</v-icon>
                    Админка
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile @click="logOut">
                    <v-icon left>exit_to_app</v-icon>
                    Выход
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

    <v-container>
        <v-layout justify-center>
            <v-flex xs12 md12>
                <router-view></router-view>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        computed: {
            user() {
                return this.$store.getters.user;
            },
        //     purchase() {
        //         // this.$store.dispatch('fetchPurchases')
        //         // console.log(this.$store.getters.purchaseList);
        //         return this.$store.getters.purchaseList;
        //     }
        // },
        // created() {
        //     this.$store.dispatch('fetchPurchases')
        //         .then(res => {
        //             console.log('Новый список в КоллБэке!');
        //             console.log(res);
        //             this.purchase = this.$store.getters.purchaseList;
        //         });
        },
        methods: {
            logOut() {
                this.$store.dispatch('logOut');
                this.$router.push('/')
            },
            toAdmin() {
                this.$router.push('/admin/')
            },
            toPurchaseHistory() {
                this.$router.push('/profile/purchases')
            },
            toProfileSettings() {
                this.$router.push('/profile/settings')
            }
        }
    }
</script>

<style scoped>
</style>