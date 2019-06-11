<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 md12>
                <v-layout justify-center>
                    <v-flex xs6>
                        <v-text-field
                                outline
                                v-model="filterText"
                                label="Поиск"
                        >

                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-card>
                    <v-layout wrap justify-center>

                        <v-flex xs12 md12>
                            <v-card v-for="category in filteredCategories" v-if="categoryList.length > 0">
                                <v-layout justify-center>
                                    <v-flex xs8 md8>
                                        <v-card-title>
                                            <h2>{{ category.title }}</h2>
                                        </v-card-title>
                                    </v-flex>
                                </v-layout>

                            </v-card>
                            <v-card v-else>
                                <v-card-title>
                                    <h2>Вы еще не добавили категорий</h2>
                                </v-card-title>
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
        name: "CategoryList",
        data() {
            return {
                filterText: ''
            }
        },
        computed: {
            categoryList() {
                return this.$store.getters.categoryList
            },
            filteredCategories() {
                return this.categoryList.filter( element => {
                    return element.title.toLowerCase().match(this.filterText.toLowerCase())
                })
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        created() {
            this.$store.dispatch('fetchCategories')
        }
    }
</script>

<style scoped>

</style>