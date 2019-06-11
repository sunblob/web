import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import books from './books'
import users from './users'
import cart from './cart'
import purchase from './purchase'
import category from './category'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        books, shared, users, cart, purchase, category
    }

})
