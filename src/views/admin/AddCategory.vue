<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs10 md10>
                <v-card>
                    <v-layout wrap justify-center>
                        <v-flex xs8 md8>
                            <v-card-text>
                                <v-text-field
                                        outline
                                        v-model="categoryName"
                                        label="Название">

                                </v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="info" @click="onSubmit">Добавить</v-btn>
                            </v-card-actions>
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
        name: "AddCategory",
        data() {
            return {
                categoryName: ''
            }
        },
        methods: {
            onSubmit() {
                axios.post('http://localhost:5000/mainPost', {
                    router: 'addCategory',
                    token: JSON.parse(localStorage.getItem('user')).token,
                    title: this.categoryName
                }).then(res => {
                    console.log(res.data)
                    this.$router.push('/admin/categories')
                }).catch(e => console.log(e.response.data.error))
            }
        }
    }
</script>

<style scoped>

</style>