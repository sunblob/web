<template>
    <v-container fluid v-if="!loading">
        <v-layout align-center justify-center>
            <v-flex xs8 md8>
                <v-layout justify-center>
                    <v-flex xs6>
                        <v-text-field
                                v-model="filterText"
                                label="Поиск"
                                outline
                        >

                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-card>
                    <v-layout wrap>
                        <v-flex xs12 md12>
                            <v-card class="card-hover card-user" v-for="user in filteredUsers" flat>
                                <v-container grid-list-xs>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-card-title>
                                                <div>
                                                    <span>Имя пользователя: {{ user.login }}</span><br>
                                                    <span>ID: {{ user.hashId }}</span><br>
                                                    <span>Админ: {{ user.isAdmin }}</span>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <v-btn color="info" :to="'/admin/users/' + user.hashId">Открыть</v-btn>
                                            </v-card-title>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <div v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-xs-center pt-5">
                    <v-progress-circular indeterminate :size="70" :width="7" color="primary">

                    </v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Users",
        data() {
            return {
                filterText: ''
            }
        },
        computed: {
            users() {
                console.log('users: ', this.$store.getters.userList);
                return this.$store.getters.userList;
            },
            filteredUsers() {
                return this.users.filter( element => {
                    return (element.login.toLowerCase().match(this.filterText.toLowerCase()) || element.hashId.toLowerCase().match(this.filterText.toLowerCase()))
                })
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        created() {
            this.$store.dispatch('fetchUsers')
        }
    }
</script>

<style scoped>
    .card-hover:hover {
        background-color: whitesmoke;
    }
    .card-user {
        margin: 5px;
    }
</style>