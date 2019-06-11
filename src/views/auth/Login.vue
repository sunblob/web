<template>
    <v-container fluid fill-height class="con">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12, main-container">
                    <v-toolbar dark color="blue-grey darken-3">
                        <v-toolbar-title>Войти</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" validation>
                            <v-text-field
                                    color="orange darken-4"
                                    v-model="login"
                                    prepend-icon="person"
                                    name="login"
                                    label="Имя пользователя*"
                                    :rules="loginRules"
                                    type="text"></v-text-field>
                            <v-text-field
                                    color="orange darken-4"
                                    v-model="password"
                                    id="password"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Пароль*"
                                    :rules="passwordRules"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <span class="spa">Еще нет аккаунта?</span>
                        <v-btn color="deep-orange darken-2" dark to="/register">Зарегистрироваться</v-btn>
                        <v-spacer></v-spacer>
                        <div class="log-btn">
                        <v-btn @click.prevent="onSubmit" :loading="loading" :disabled="!valid || loading">Войти</v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                show: false,
                login: '',
                password: '',
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
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
             onSubmit() {
                 if (this.$refs.form.validate()) {
                     const user = {
                         login: this.login,
                         password: this.password,
                     };
                     this.$store.dispatch('loginUser', user)
                         .then((res) => {
                            // this.$store.dispatch('fetchPurchases');
                             if (res) {
                                 this.$router.push('/');
                             }
                         })
                         .catch((e) => {

                         })

                }
            }
        }
    }
</script>

<style scoped>
    .main-container {
        width: 450px;
    }
    .con{
        min-height: 800px;
    }
    .spa{
        margin: 0 20px;
    }

    .log-btn {
        margin-left: 10px;
    }
</style>