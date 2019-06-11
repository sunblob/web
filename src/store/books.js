import axios from "axios";

export default {
    state: {
        books: [],
        apiUrl: 'http://localhost:5000/mainPost'
    },
    mutations: {
        setBooks(state, payload){
            state.books = payload;
        },
        
    },
    actions: {

        async fetchBooks({state, commit}) {
            commit('setLoading', true);
            try {
                const books = await axios.post(`${state.apiUrl}`, {
                    router: 'getAllBook'
                });
                console.log(books);
                commit('setBooks', books.data);
                commit('setLoading', false);
            } catch (e) {
                commit('setLoading', false);
            }
        },

        // addBook({state, commit}, book) {
        //     axios.post(`${state.apiUrl}`, book)
        //         .then(response => {
        //             commit('setBooks', response.data)
        //         })
        // }

    },
    getters: {
        books: state => state.books,
        bookById: state => id => state.books.find(book => book.hashId === id),
    }
}