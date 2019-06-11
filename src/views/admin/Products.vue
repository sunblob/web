<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
                            <v-card class="card-hover" v-for="book in filteredBooks" flat>
                                <v-container grid-list-xs>
                                    <v-layout row wrap>
                                        <v-flex xs2>
                                            <v-img
                                                    position="left"
                                                    contain
                                                    height="100"
                                                    :src="book.image">
                                            </v-img>
                                        </v-flex>
                                        <v-flex xs10>
                                            <v-card-title>
                                                <div>
                                                    <span>Название: {{ book.title }}</span> <br>
                                                    <span>Автор: {{ book.author }}</span> <br>
                                                    <span>Цена: {{ book.price }} руб.</span>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div>
                                                    <span>ID: {{ book.hashId }}</span>
                                                </div>
                                            </v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="info" :to="'/admin/products/'+book.hashId+'/edit'">Редактировать</v-btn>
                                                <v-btn color="error" @click.stop="idHolder(book.hashId)">Удалить</v-btn>
                                            </v-card-actions>
                                        </v-flex>
<!--                                        @click="deleteBook(book.hashId)"-->
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <template>
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Действительно удалить книгу?</v-card-title>
                        <v-card-text>Данное дейстиве нельзя будет отменить!</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" flat @click="deleteBook(id)">Да</v-btn>
                            <v-btn color="green darken-1" flat @click="dialog = false">Нет</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>
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
    import axios from 'axios'

    export default {
        name: "Products",
        data() {
            return {
                filterText: '',
                dialog: false,
                id: ''
            }
        },
        computed: {
            books() {
                return this.$store.getters.books;
            },
            filteredBooks() {
                return this.books.filter( element => {
                    return element.title.toLowerCase().match(this.filterText.toLowerCase())
                })
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            deleteBook(id) {
                this.dialog = false;
                axios.post('http://localhost:5000/mainPost', {
                    router: 'deleteBook',
                    bookId: id,
                    token: JSON.parse(localStorage.getItem('user')).token
                })
                .then(response => {
                    console.log(response.data);
                    this.$store.dispatch('fetchBooks');
                })
                .catch(e => console.log(e.response.data.error))
            },
            idHolder(id) {
                this.dialog = true;
                this.id = id
            }
            // deleteBook(id) {
            //     this.$store.dispatch('deleteBookById', id)
            // }
        },
        created() {
            this.$store.dispatch('fetchBooks');
        }
    }
</script>

<style scoped>

    .card-hover:hover {
        background-color: whitesmoke;
    }

</style>