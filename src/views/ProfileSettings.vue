<template>
    <v-container>
        <v-layout align-center justify-center>
            <v-flex xs8 md8>
                <v-card>
                    <h1 class="text-xs-center">Профиль</h1>
                    <v-layout wrap justify-center>
                        <v-flex xs8 md8>
                            <v-card flat>
<!--                                <v-card-title>-->
<!--                                    {{ book.hashId }}-->
<!--                                </v-card-title>-->
                                <v-card-text>
                                    <v-form v-model="valid" ref="form" validation>
                                        <v-text-field
                                                outline
                                                disabled
                                                v-model="login"
                                                name="password"
                                                label="Имя пользователя"
                                                :rules="loginRules"
                                                type="text"></v-text-field>
                                        <v-text-field
                                                outline
                                                v-model="email"
                                                name="email"
                                                :rules="loginRules"
                                                label="Email"
                                                type="email"></v-text-field>
                                        <v-text-field
                                                outline
                                                v-model="password"
                                                name="password"
                                                label="Пароль"
                                                :rules="passwordRules"
                                                :append-icon="show ? 'visibility' : 'visibility_off'"
                                                :type="show ? 'text' : 'password'"
                                                @click:append="show = !show"></v-text-field>
                                        <v-text-field
                                                outline
                                                v-model="firstName"
                                                name="firstName"
                                                label="Имя"
                                                type="text"></v-text-field>
                                        <v-text-field
                                                outline
                                                v-model="lastName"
                                                name="firstName"
                                                label="Фамилия"
                                                type="text"></v-text-field>
                                        <v-text-field
                                                outline
                                                v-model="address"
                                                name="address"
                                                label="Адрес"
                                                type="text"></v-text-field>

                                    </v-form>
                                </v-card-text>
                            </v-card>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="editUserEvent" color="info">Обновить</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "ProfileSettings",
        data() {
            return {
                show: false,
                login: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                email: '',
                valid: false,
                loginRules: [
                    v => !!v || 'Пустое поле',
                ],
                passwordRules: [
                    v => !!v || 'Пустое поле',
                    v => v.length >= 6 || 'Пароль должен быть не менее 6 знаков'
                ]
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            }
        },
        mounted() {
            this.login = this.user.login;
            this.password = this.user.password;
            this.firstName = this.user.firstName;
            this.lastName = this.user.lastName;
            this.address = this.user.address;
            this.email = this.user.email;
        },

        methods: {
            //Отправляем на сервак запрос на обновление пользователя
            editUserEvent() {
                let user = {};
                user.firstName = this.firstName;
                user.lastName = this.lastName;
                user.login = this.login;
                user.address = this.address;
                user.email = this.email;
                user.password = this.password;

                this.$store.dispatch('editUser', user)
                    .then((res) => {
                        // this.$store.dispatch('fetchPurchases');
                        // if (res) {
                        //     this.$router.push('/');
                        // }
                        // location.reload()
                    })
                    .catch((e) => {

                    })
            }
        }
    }
</script>

<style scoped>
</style>