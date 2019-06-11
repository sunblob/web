<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container id="Admin" :dark="dark">
        <v-navigation-drawer
                v-model="primaryDrawer.model"
                absolute
                overflow
                app
        >
            <v-toolbar>
                {{date | date}}
            </v-toolbar>

            <v-list>
                <v-list-tile @click="toUserList">
                    <v-icon left>face</v-icon>
                    Пользователи
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile @click="toOrders">
                    <v-icon left>description</v-icon>
                    Заказы
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-group no-action
                              :prepend-icon="item1.icon"
                              v-model="item1.active">
                    <template v-slot:activator>
                        <v-list-tile class="kek">
                            <v-list-tile-title>Товары</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <v-list-tile @click="toProducts">
                        <v-list-tile-title>
                            Все товары
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="toAddProduct" >
                        <v-list-tile-title>
                            Добавить
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list-group>
                <v-divider></v-divider>
                <v-list-group no-action
                              :prepend-icon="item2.icon"
                              v-model="item2.active">
                    <template v-slot:activator>
                        <v-list-tile class="kek">
                            <v-list-tile-title>Категории</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <v-list-tile @click="toCategoryList">
                        <v-list-tile-title>
                            Все категории
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="toAddCategory">
                        <v-list-tile-title>
                            Добавить категорию
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list-group>
                <v-divider></v-divider>
                <v-list-tile @click="backToProfile">
                    <v-icon left>exit_to_app</v-icon>
                    Выйти
                </v-list-tile>

            </v-list>

        </v-navigation-drawer>
        <v-toolbar  app absolute>
            <v-toolbar-side-icon
                    @click.stop="primaryDrawer.model = !primaryDrawer.model"
            ></v-toolbar-side-icon>
            <v-toolbar-title>Administration Zone</v-toolbar-title>
        </v-toolbar>

    </v-container>
</template>

<script>
    export default {
        name: "Admin",
        data: () => ({
            date: new Date(),
            interval: null,
            dark: false,
            primaryDrawer: {
                model: null,
                type: 'default',
            },
            item1: {
                icon: 'store',
                active: false
            },
            item2: {
                icon: 'subject',
                active: false
            }
        }),
        mounted() {
            this.interval = setInterval(()=> {
                this.date = new Date()
            }, 1000)
        },
        beforeDestroy() {
            clearInterval(this.interval)
        },
        methods: {
            backToProfile() {
                this.$router.push('/profile')
            },
            toProducts() {
                this.$router.push('/admin/products')
            },
            toUserList() {
                this.$router.push('/admin/users')
            },
            toAddProduct() {
                this.$router.push('/admin/products/add')
            },
            toCategoryList() {
                this.$router.push('/admin/categories')
            },
            toAddCategory() {
                this.$router.push('/admin/categories/add')
            },
            toOrders() {
                this.$router.push('/admin/orders')
            }
        }
    }
</script>

<style scoped>
    .kek {
        margin-left: -17px;
    }
</style>
