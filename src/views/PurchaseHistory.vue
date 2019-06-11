<template>
    <v-container fluid v-if="purchase.length > 0">
        <v-layout align-center justify-center>
            <v-flex xs8 md8>
                <v-card class="card-hover">
                    <h1 class="text-xs-center">История покупок</h1>
                    <v-layout wrap>
                        <v-flex xs12 md12>
                            <v-card class="card-hover" v-for="(item, index) in purchase" flat>
                                <v-container grid-list-xs>
                                    <v-layout row wrap>
                                        <v-flex xs8>
                                        <v-card-title>
                                            <div>
                                                <span>Дата покупки: {{ new Date(item.date * 1000).toLocaleDateString()}}</span><br>
                                                <span>Стоимость: {{ item.totalPrice }} ₽</span><br>
                                                <span>ID покупки: {{ item.hashId }}</span>
                                            </div>
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
    <v-container v-else>
        <h1>Вы еще ничего не покупали</h1>
    </v-container>
</template>

<script>
    export default {
        name: "PurchaseHistory",
        computed: {
            purchase() {
                return this.$store.getters.purchaseList;
            }
        },
        created() {
            this.$store.dispatch('fetchPurchases')
        }
    }
</script>

<style scoped>
    .card-hover:hover {
        background-color: whitesmoke;
    }
</style>