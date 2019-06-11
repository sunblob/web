<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs8 md8>
                <v-btn to="/" class="my-btn" color="error">Назад</v-btn>
                <v-card>
                    <v-container
                            fluid
                            grid-list-md
                    >
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-img
                                        contain
                                    :src="book.image"
                                    height="500px">
                                </v-img>
                            </v-flex>
                            <v-flex xs6>
                                <v-card-title>
                                    <span class="black--text title">{{ book.title }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <span class="blue--text">{{ book.author }}</span><br>
                                </v-card-text>
                                <v-card-actions>
                                    <span class="black--text price">{{ book.price }} ₽ </span><br>
                                </v-card-actions>
                                <v-card-text>
                                    <v-btn dark color="deep-orange darken-2" class="my-btn" @click.stop="dialog = true">Купить</v-btn>
                                    <br>
                                    <span class="orange--text text--darken-4">Описание:</span>
                                    <span class="black--text"><br>{{ book.about }}</span><br>
                                    <span class="orange--text text--darken-4">Жанры: </span>
                                    <span class="black--text">
                                        <div v-for="genre in book.genreList">{{genre}}</div>
                                    </span>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <template>
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Купить {{ book.title }}?</v-card-title>
<!--                        <v-card-text>Вы можете продолжить покупки.</v-card-text>-->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click="addBookToCart(book)">Да</v-btn>
                            <v-btn color="green darken-1" flat @click="dialog = false">Нет</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>
    </v-container>
</template>

<script>
export default {
    name: "Book",
    data() {
        return {
            dialog: false,
        }
    },
    computed: {
        book(){
            console.log('HashId = ' + this.$route.params.hashId);
            console.log('computed: ', this.$store.getters.bookById(this.$route.params.hashId));
            return this.$store.getters.bookById(this.$route.params.hashId);
        },
        totalPrice() {
            return this.quantity * this.book.price
        }
    },
    methods: {
        addBookToCart(book) {
            this.$store.commit('addBookToCart', book);
            this.dialog = false;
            // this.$router.push('/cart');
        },
        addButStay(book) {
            this.$store.commit('addBookToCart', book);
            this.dialog = false;
        }
    },
    created() {
        this.$store.dispatch('fetchBooks')
    }
}
</script>

<style scoped>
    .title{
        font-size: 40px;
    }
    .my-btn{
        margin-left: 0px;
        margin-bottom: 20px;
    }

    .price{
        margin-left: 5px;
        font-size: 3rem;
    }

</style>
