<template>
    <v-container>
        <v-layout align-center justify-center>
            <v-flex xs8 md8>
                <v-btn to="/admin/users">Назад</v-btn>
                <v-card>
                    <h1 class="text-xs-center">Профиль</h1>
                    <v-layout wrap justify-center>
                        <v-flex xs8 md8>
                            <v-card flat>
                                <v-card-text>
                                    <div>
                                        <span>Имя пользователя: {{user.login}}</span><br>
                                        <span>Имя: {{user.firstName}}</span><br>
                                        <span>Фамилия: {{user.lastName}}</span><br>
                                        <span>Адрес: {{user.address}}</span><br>
                                        <span>Дата регистрации: {{new Date(user.date * 1000).toLocaleDateString()}}</span><br>
                                    </div>
                                </v-card-text>
                            </v-card>
<!--                            <v-card v-if="purchaseList">-->
<!--                                <v-card-text v-for="purchase in purchaseList">-->
<!--                                    {{ new Date(purchase.date *1000) }}-->
<!--                                </v-card-text>-->
<!--                            </v-card>-->
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "SingleUser",
        computed: {
            user() {
                return this.$store.getters.userById(this.$route.params.hashId)
            },
            // purchaseList() {
            //     return this.$store.getters.purchaseListByUserId(this.user.hashId)
            // }
        }
    }
</script>

<style scoped>

</style>