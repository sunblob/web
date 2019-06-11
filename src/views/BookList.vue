<template>
    <v-container v-if="!loading">
        <v-layout justify-center>
            <v-flex xs10 md10>
                <v-layout justify-center>
                    <v-flex xs6>
                        <v-text-field
                                outline
                                color="deep-orange darken-2"
                                v-model="filterText"
                                label="Поиск"
                        >

                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-container
                  fluid
                  grid-list-md
                  class="book-wrapper"
                >
                  <v-layout row wrap>
                    <v-flex
                      v-for="book in filteredBooks"
                      :key="book.hashId"
                      xs3
                    >
                      <v-card class="card-item">
                        <v-img
                          :src="book.image"
                          height="200"
                          contain
                          @click="toBook(book.hashId)"
                          class="img"
                        >
                        </v-img>
                        <v-card-title >
                            <router-link tag="span" class="black--text title link title-text" :to="'/book/'+book.hashId"  >{{book.title}}</router-link>
                        </v-card-title>
                        <v-card-text>
                            <span class="blue-grey--text text--lighten-2">{{ book.author }}</span> <br>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="deep-orange darken-2" dark @click="bookHolder(book)">
                                Купить
                            </v-btn>
                            <v-spacer></v-spacer>
                            <span class="black--text price">{{ book.price }} ₽ </span>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
<!--              </v-card>-->
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
     data() {
         return {
             filterText: '',
             book: {},
             dialog: false,
             quantity: 1,
         }
     },
     computed: {
         books(){
             console.log('books: ', this.$store.getters.books);
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

     //Добавление в корзину
     methods: {
         addBookToCart(book) {
             this.book.quantity = this.quantity;
             this.$store.commit('addBookToCart', book);
             this.dialog = false;
             // this.$router.push('/cart');
         },
         addButStay(book) {
             this.$store.commit('addBookToCart', book);
             this.dialog = false;
         },
         toBook(id) {
             this.$router.push({ path: `/book/${id}`})
         },
         bookHolder(book) {
             this.dialog = true;
             this.book = book
         },
         // addQuantity(){
         //     if (this.book.quantity>=0){
         //         this.book.quantity++
         //     }
         // },
         // subtractQuantity(){
         //     if (this.book.quantity>0){
         //         this.book.quantity--
         //     }
         // },
     },
     created() {
         this.$store.dispatch('fetchBooks');
     },
 }

</script>

<style scoped>
    #title{
        margin: 20px 0;
        font-size: 50px;
    }

    .price{
        font-size: 1.3rem;
        margin-left: 5px;
    }
    .link{
        cursor: pointer;
    }
    .card-item {
      border-radius: 10px;
        padding: 10px;
    }
    .card-item:hover {
        background-color: #f3f3f3;
    }
    .card-img {
        padding: 10px;
    }
    .book-wrapper {
        margin-top: 50px;
    }
    .img {
        cursor: pointer;
    }

    .title-text {
        height: 20px;
    }

</style>
