<template>
    <div>
    <v-container xs12 md12>
    </v-container>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 md12>
                <v-card>
                    <v-container
                            fluid
                            grid-list-md
                    >
                        <v-layout row wrap>
                            <v-flex
                                v-for="book in books"
                                :key="book.id"
                                xs3
                            >
                                <v-card>
                                    <v-img
                                        :src="book.image"
                                        height="200"
                                        width="100"
                                        position="center"
                                    >
                                    </v-img>
                                    <v-card-title>
                                        <router-link tag="span" class="black--text title link" :to="'/book/'+book.id">{{book.title}}</router-link>
                                    </v-card-title>
                                    <v-card-text>
                                        <span class="blue-grey--text text--lighten-2">{{ book.author }}</span>
                                    </v-card-text>
                                    <v-card-actions>
                                        <span class="black--text price">{{ book.price }} ₽ </span>
                                        <v-spacer></v-spacer>
                                        <v-btn color="info">
                                            Купить
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                
            }
        },
        computed: {
            books(){
                return this.$store.getters.books;
            }
        },
        // mounted() {
        //     let arr = this.$store.getters.books.map(item => item.title)
        //     console.log(arr)
        // }
    }

</script>

<style scoped>
    #title{
        margin: 20px 0;
        font-size: 50px;
    }

    .price{
        font-size: 1.3rem;
        margin-left: 10px;
    }
    .link{
        cursor: pointer;
    }
</style>