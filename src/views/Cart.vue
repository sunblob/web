<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-layout justify-center>
            <v-flex xs9 md9>
                <h1>Корзина</h1>
                <v-card v-if="cartList.length > 0">
                    <v-layout wrap>
                        <v-flex xs12 md12>
                            <v-card class="card-hover" v-for="cartItem in cartList" flat>
                                <v-container grid-list-xs>
                                    <v-layout row wrap>
                                        <v-flex xs1>
                                            <v-img
                                                    position="left"
                                                    contain
                                                    height="100"
                                                    :src="cartItem.book.image">
                                            </v-img>
                                        </v-flex>
                                        <v-flex xs11>
                                            <v-card-title>
                                                <div>
                                                    <span>Название: {{ cartItem.book.title }}</span> <br>
                                                    <span>Автор: {{ cartItem.book.author }}</span> <br>
                                                    <span>Цена: {{ cartItem.book.price }} руб.</span>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div>
                                                    <v-icon @click="bookHolder(cartItem.book)">cancel</v-icon>
                                                </div>
                                            </v-card-title>
                                            <v-card-actions>
                                                <div class="quantity_pick">
                                                    <h4 class="sub_title">Количество</h4>
                                                    <div class="quantity_box">
                                                        <v-icon @click="decCount(cartItem.book)">remove</v-icon>
                                                            <span> {{ cartItem.counter }}</span>
                                                        <v-icon @click="incCount(cartItem.book)">add</v-icon>
                                                    </div>
                                                </div>
                                            </v-card-actions>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
                <div v-else class="text-xs-center">
                    <h3>Пусто</h3>
                </div>
                <v-container>
                    <h3 v-if="totalPrice !== 0">{{`Сумма: ` + totalPrice}}  ₽ </h3>
                    <v-btn
                            @click.stop="dialog = true"
                            dark
                            color="orange darken-4"
                            :disabled="cartList.length < 1">Оплатить</v-btn>
                    <v-dialog
                            v-model="dialog"
                            width="600"
                    >




<!--                        ФОРМА ОПЛАТЫ!-->


                        <v-stepper v-model="e1">
                            <v-stepper-header>
                                <v-stepper-step :complete="e1 > 1" step="1" color="orange darken-4">Данные</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="e1 > 2" step="2" color="orange darken-4">Оплата</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step step="3" color="orange darken-4">Подтверждение</v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>
                                <v-stepper-content step="1">
                                    <v-card>
                                        <v-card
                                                flat
                                                class="mb-5"
                                                height="400px"
                                        >
                                            <v-card-text>
                                                <div>
                                                    <span v-if="isUserLoggedIn">Имя пользователя: {{ user.login }}</span> <br>
                                                    <v-form>
                                                        <v-text-field
                                                                color="deep-orange darken-2"
                                                                v-model="firstName"
                                                                name="firstName"
                                                                label="Имя*"
                                                                type="text"></v-text-field>
                                                        <v-text-field
                                                                color="deep-orange darken-2"
                                                                v-model="lastName"
                                                                name="lastName"
                                                                label="Фамилия*"
                                                                type="text"></v-text-field>
                                                        <v-text-field
                                                                color="deep-orange darken-2"
                                                                v-model="address"
                                                                name="address"
                                                                label="Адрес*"
                                                                type="text"></v-text-field>
                                                    </v-form>
                                                </div>
                                                <span class="hint">* обязательные поля для заполнения</span>
                                            </v-card-text>
                                        </v-card>
                                        <v-card-actions>
                                            <v-btn
                                                    flat
                                                    @click="e1 = 2"
                                                    class="grey lighten-3"
                                                    :disabled="firstName === ''
                                                    || lastName === ''
                                                    || address === ''"
                                            >
                                                <span class="deep-orange--text text--darken-1" >Далее</span>
                                            </v-btn>

                                            <v-spacer></v-spacer>
                                            <v-btn flat @click="dialog = false" class="red--text text--accent-1">Отмена</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content step="2">
                                    <v-card>
                                        <v-card
                                                flat
                                                class="mb-5"
                                                height="400px"
                                        >
                                            <v-card-text>
                                                <form>
                                                    <v-text-field
                                                            color="deep-orange darken-2"
                                                            mask="credit-card"
                                                            v-model="card"
                                                            name="card"
                                                            label="Номер карты"
                                                            type="text"></v-text-field>
                                                    <v-text-field
                                                            color="deep-orange darken-2"
                                                            mask="###"
                                                            v-model="cvv"
                                                            name="card"
                                                            label="Код"
                                                            type="number"></v-text-field>
                                                </form>
                                            </v-card-text>
                                        </v-card>
                                        <v-card-actions>
                                            <v-btn
                                                    flat
                                                    @click="e1 = 3"
                                                    class="grey lighten-3"
                                                    :disabled="card === '' ||  cvv.length < 3"
                                            >
                                                <span class="deep-orange--text text--darken-1">Далее</span>
                                            </v-btn>
                                            <v-btn
                                                    flat
                                                    @click="e1 = 1"
                                                    class="grey lighten-3"
                                            >
                                                <span class="deep-orange--text text--darken-1">Назад</span>
                                            </v-btn>

                                            <v-spacer></v-spacer>
                                            <v-btn flat @click="dialog = false" class="red--text text--accent-1">Отмена</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-stepper-content>

                                <v-stepper-content step="3">
                                    <v-card>
                                        <v-card
                                                flat
                                                class="mb-5"
                                                height="400px"
                                        >
                                            <v-card-text>
                                                <div>
                                                    <span>Стоимость: {{ totalPrice }} ₽</span>
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                        <v-card-actions>
                                            <v-btn
                                                    flat
                                                    class="grey lighten-3"
                                                    @click="buyAllItems"
                                                    :disabled="cartList.length < 1"
                                            >
                                                <span class="deep-orange--text text--darken-1">Оплатить</span>
                                            </v-btn>
                                            <v-btn
                                                    flat
                                                    class="grey lighten-3"
                                                    @click="e1 = 2"
                                            >
                                                <span class="deep-orange--text text--darken-1">Назад</span>
                                            </v-btn>

                                            <v-spacer></v-spacer>
                                            <v-btn flat @click="dialog = false" class="red--text text--accent-1">Отмена</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>

<!--                        КОНЕЦ ФОРМЫ-->

                    </v-dialog>
                    <template>
                        <v-layout row justify-center>
                            <v-dialog v-model="dialog2" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">Действительно удалить товар из корзины?</v-card-title>
                                    <v-card-text>Данное дейстиве нельзя будет отменить!</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red" flat @click="deleteCartItem(book)">Да</v-btn>
                                        <v-btn color="green darken-1" flat @click="dialog2 = false">Нет</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>
                    </template>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {

        data() {
            return {
                firstName: '',
                lastName: '',
                address: '',
                card: '',
                cvv: '',
                dialog: false,
                dialog2: false,
                e1: 0,
                book: {}
            }
        },
        computed: {
            cartList() {
                console.log('cart', this.$store.getters.getCartList);
                return this.$store.getters.getCartList;
            },
            totalPrice() {
                let tempPrice = 0;
                this.cartList.forEach(entry => {
                    tempPrice += (entry.counter * entry.book.price)
                });
                return tempPrice;
            },
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn;
            },
            user() {
                return this.$store.getters.user;
            },
        },
        methods: {
            deleteCartItem(book){
                this.$store.commit('deleteCartItem', book);
                this.dialog2 = false;
            },

            bookHolder(book) {
                this.dialog2 = true;
                this.book = book
            },

            //Покупка всего что есть в корзине
            buyAllItems() {
                if(this.isUserLoggedIn) {

                    axios.post('http://localhost:5000/mainPost' , {
                        router: 'addPurchase',
                        token: JSON.parse(localStorage.getItem('user')).token,
                        totalPrice: this.totalPrice,
                        purchaseItemList: this.cartList,

                    }).then(response => {
                        console.log('response:', response.data);
                        this.$store.dispatch('fetchPurchases');
                    }).catch(e => e.response.data.error);
                    this.$store.commit('clearCart');
                    this.$router.push(`/profile/purchases`);
                } else {
                    this.$store.commit('clearCart');
                    this.$router.push('/')
                }
            },

            incCount(book) {
                let temp = {};
                    temp.book = book;
                    temp.value = 1;
                this.$store.commit('toggleCartItem',temp)
            },
            decCount(book) {
                let temp = {};
                    temp.book = book;
                    temp.value = -1;
                this.$store.commit('toggleCartItem', temp)
            }
        },
        mounted() {
            if (this.isUserLoggedIn) {
                this.firstName = this.user.firstName;
                this.lastName = this.user.lastName;
                this.address = this.user.address;
            } else {
                this.firstName = '';
                this.lastName = '';
                this.address = '';
            }
        }
    }
</script>

<style>
    .sub_title{
        font-weight: bold;
        color:#ff7657;
        display: block;
        margin-bottom: 10px;
        font-size: 1.1em;
    }
    .quantity_pick .quantity_box{
        margin-top: 20px;
    }
    .quantity_pick .quantity_box i{
        cursor: pointer;
    }
    .quantity_pick .quantity_value{
        border: 1px solid #cacaca;
        padding: 6px 10px;
        font-size: 1.4em;
        border-radius: 10px;
    }

    .hint {
        color: darkgray;
        font-size: 0.8rem;
    }
</style>
