<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-toolbar dark color="blue-grey darken-3" class="toolbar-main" :clipped-left="true" app height="75">
        <v-toolbar-title>
            <router-link to="/" class="logo"> BücherWelt </router-link>
            </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn to="/cart" flat>
                <v-badge left color="red" v-if="cart > 0">
                    <template v-slot:badge>
                        <span>{{cart}}</span>
                    </template>
                </v-badge>
                <v-icon>shopping_cart</v-icon>
            </v-btn>
            <v-btn
            v-for="link in links"
            :key="link.title"
            :to="link.url"
            flat>
                <v-icon left>{{link.icon}}</v-icon>
                {{link.title}}
            </v-btn>
            <v-btn flat v-if="isUserLoggedIn" to="/profile">
                {{ user.email }}
            </v-btn>
        </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
    computed: {
        cart() {
            console.log('cart: ', this.$store.getters.getCartList);
            let temp =  this.$store.getters.getCartList;
            let sum = 0;
            temp.forEach(element => {
                console.log('elem counter', element.counter);
                sum +=  element.counter;
                console.log('sum: ', sum)
                return element.counter
            })
            console.log('counter: ', temp)
            return sum;
        },
        user() {
            return this.$store.getters.user;
        },
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn;
        },
        links() {
            if(this.isUserLoggedIn){
                return [
                    // {title: '', icon: 'shopping_cart',  url: '/cart'},
                    {title: 'Книги', icon: 'book',  url: '/'},
                    {title: 'Доставка', icon: 'rowing',  url: '/deliver'},
                    {title: 'О нас', icon: 'help',  url: '/about'},
                    // {title: 'Профиль', icon: 'person',  url: '/profile'},
                ]
            }
            return [
                // {title: '', icon: 'shopping_cart',  url: '/cart'},
                {title: 'Книги', icon: 'book',  url: '/'},
                {title: 'Доставка', icon: 'rowing',  url: '/deliver'},
                {title: 'О нас', icon: 'help',  url: '/about'},
                {title: 'Войти', icon: '',  url: '/login'}
            ]
        },

    },
    methods: {

        //Выход из аккаунта
        logOut() {
            this.$store.commit('clearCart');
            this.$store.dispatch('logOut');
            this.$router.push('/list')
        },
    }
}
</script>

<style>

    .logo {
        color: white;
        text-decoration: none;
        font-size: 2rem;
        margin-left: 30px;
    }

</style>
