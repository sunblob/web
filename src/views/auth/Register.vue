<template>
    <v-container fluid fill-height class="con">
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="blue-grey darken-3">
                        <v-toolbar-title>Регистрация</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" validation>
                            <v-text-field
                                    color="orange darken-4"
                                    v-model="login"
                                    prepend-icon="person"
                                    name="login"
                                    label="Имя пользователя"
                                    :rules="loginRules"
                                    type="text"></v-text-field>
                            <v-text-field
                                    color="orange darken-4"
                                    v-model="email"
                                    prepend-icon="person"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                            ></v-text-field>

                            <v-text-field
                                    color="orange darken-4"
                                    v-model="password"
                                    id="password"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Пароль"
                                    :rules="passwordRules"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"></v-text-field>
                            <v-text-field
                                    color="orange darken-4"
                                    v-model="confirmPass"
                                    prepend-icon="lock"
                                    name="confirmPassword"
                                    label="Подтверждение пароля"
                                    :rules="[comparePasswords]"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <span class="spa">Уже есть аккаунт?</span>
                        <v-btn color="deep-orange darken-2" dark to="/login">Войти</v-btn>

                        <v-spacer></v-spacer>

                        <v-btn
                                @click.prevent="onSubmit"
                                :loading="loading"
                                :disabled="!valid || loading"
                        >Зарегистрироваться</v-btn>

                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                show: false,
                login: '',
                email: '',
                password: '',
                confirmPass: '',
                valid: false,
                loginRules: [
                    v => !!v || 'Пустое поле',
                ],
                passwordRules: [
                    v => !!v || 'Пустое поле',
                    v => v.length >= 6 || 'Пароль должен быть не менее 6 знаков'
                ],
                emailRules: [
                    v => !!v || 'Пустое поле',
                    // v => /.+@.+/.test(v) || 'Введите почту правильно',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите почту правильно'
                ]
            }
        },
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPass ? 'Пароль не совпадает' : true
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
             onSubmit() {
                if (this.$refs.form.validate()){
                    const user = {
                        login: this.login,
                        email: this.email,
                        password: this.password,
                    };
                     this.$store.dispatch('registerUser', user)
                        .then((res) => {
                            if (res) {
                                this.$router.push('/')
                            }
                        })
                        .catch(() => {})
                }
            }
        }
    }
</script>

<style scoped>
    .con{
        min-height: 800px;
    }
    .spa{
        margin: 0 20px;
    }
</style>