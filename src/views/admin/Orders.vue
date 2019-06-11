<template>
    <v-container fluid v-if="orderList.length > 0">
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
                <v-card class="card-hover">
                    <v-layout wrap>
                        <v-flex xs12 md12>
                            <v-card class="card-hover" v-for="(item, index) in filteredOrders" flat>
                                <v-container grid-list-xs>
                                    <v-layout row wrap justify-center>
                                        <v-flex xs12>
                                            <v-card-text>
                                                <div>
                                                    <span>Дата покупки: {{ new Date(item.date * 1000).toLocaleDateString()}}</span><br>
                                                    <span>Стоимость: {{ item.totalPrice }} ₽</span>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <span>UserID: {{item.userHashId}}</span>
                                            </v-card-text>
                                            <v-card-actions>
                                                <span>#{{index+1}}</span>
                                                <v-spacer></v-spacer>
                                                <span>ID заказа: {{item.hashId}}</span>
                                                <v-spacer></v-spacer>
                                                <v-btn color="info" :to="'/admin/users/'+item.userHashId">Открыть профиль</v-btn>
                                            </v-card-actions>
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
</template>

<script>
    export default {
        name: "Orders",
        data() {
            return {
                filterText: ''
            }
        },
        computed: {
            orderList() {
                console.log('orders:', this.$store.getters.purchaseList)
                return this.$store.getters.purchaseList;
            },
            filteredOrders() {
                return this.orderList.filter( element => {
                    return (element.userHashId.toLowerCase().match(this.filterText.toLowerCase())
                        || element.hashId.toLowerCase().match(this.filterText.toLowerCase()))
                })
            },
        },
        created() {
            this.$store.dispatch('fetchPurchases')
            this.$store.dispatch('fetchUsers')
        }
    }
</script>

<style scoped>

</style>