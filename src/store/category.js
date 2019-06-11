import axios from 'axios'

export default {
    state: {
        categoryList: [],
        apiUrl: 'http://localhost:5000/mainPost'
    },
    mutations: {
        setCategory(state, payload) {
            state.categoryList = payload;
        }
    },
    actions: {
        fetchCategories({ state, commit }) {
            axios.post(`${state.apiUrl}`, {
                router: 'getAllCategories'
            }).then(response => {
                commit('setCategory', response.data);
            }).catch(e => console.log(e))
        }
    },
    getters: {
        categoryList: state => state.categoryList
    }
}