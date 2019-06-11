import axios from 'axios'

export default {
    state: {
        user: JSON.parse(localStorage.getItem('user')),
        apiUrl: 'http://localhost:5000/mainPost',
        userList: []
    },
    mutations: {
        setUser( state, payload){
            state.user = payload;
            if (state.user !== null) {
                localStorage.setItem('user', JSON.stringify(state.user))
            }
        },
        setUserList(state, payload) {
            state.userList = payload;
        }
    },
    actions: {
         registerUser({state, commit}, {login, email, password}) {
             return new Promise((res)=> {
                 commit('clearError');
                 commit('setLoading', true);
                 axios.post(`${state.apiUrl}`, {
                         router: 'signUp',
                         login,
                         email,
                         password
                     }
                 ).then(response => {
                     console.log(response.data);
                     console.log('HashId: ', response.data.hashId);
                     commit('setUser', response.data);
                     commit('setLoading', false);
                     res('ok')
                 }).catch(e => {
                     commit('setLoading', false);
                     commit('setError', e.response.data.error);
                     res(undefined)
                 })
             })

        },
        // async registerUser({state, commit}, {login, email, password}) {
        //     commit('clearError');
        //     commit('setLoading', true);
        //     try {
        //         const user = await axios.post(`${state.apiUrl}`, {
        //             router: 'signUp',
        //             login,
        //             email,
        //             password
        //         });
        //         commit('setUser', user.data);
        //         commit('setLoading', false);
        //     } catch (e) {
        //         commit('setLoading', false);
        //         commit('setError', e.message);
        //         throw e;
        //     }
        // },
        loginUser({state, commit }, {login, password}){
            return new Promise((res, rej) => {
                commit('clearError');
                commit('setLoading', true);
                axios.post(`${state.apiUrl}`, {
                        router: 'login',
                        login,
                        password
                    }
                ).then(response => {
                    console.log(response.data);
                    console.log('HashId: ', response.data.hashId);
                    commit('setUser', response.data);
                    commit('setLoading', false);
                    res('ok')
                }).catch(e => {
                    console.log(e);
                    commit('setLoading', false);
                    commit('setError', e.response.data.error);
                    res(undefined)
                })
            })
        },

        //Редактируем пользователя
        editUser({state, commit}, {firstName, lastName, address, login, email, password}) {
            return new Promise((res, rej) => {
                commit('clearError');
                commit('setLoading', true);
                axios.post(`${state.apiUrl}`, {
                        router: 'editUser',
                        token: JSON.parse(localStorage.getItem('user')).token,
                        firstName,
                        lastName,
                        address,
                        login,
                        email,
                        password
                    }
                ).then(response => {
                    console.log(response.data);
                    console.log('HashId: ', response.data.hashId);
                    commit('setUser', response.data);
                    commit('setLoading', false);
                    res('ok')
                }).catch(e => {
                    console.log(e);
                    commit('setLoading', false);
                    commit('setError', e.response.data.error);
                    res(undefined)
                })
            })
        },

        // async loginUser({state, commit}, {login, password}) {
        //     commit('clearError');
        //     commit('setLoading', true);
        //     try {
        //         const user = await axios.post(`${state.apiUrl}`, {
        //             router: 'login',
        //             login,
        //             password
        //         });
        //         console.log(user);
        //         commit('setUser', user.data);
        //         commit('setLoading', false)
        //     } catch (e) {
        //         console.log(JSON.parse(e.response.data.error));
        //         commit('setLoading', false);
        //         commit('setError', JSON.parse(e.response.data.error));
        //         throw e;
        //     }
        // },
        async fetchUsers({state, commit}) {
            commit('setLoading', true);
            try {
                const users = await axios.post(`${state.apiUrl}`, {
                    router: 'getAllUsers'
                });
                console.log(users);
                commit('setUserList', users.data);
                commit('setLoading', false);
            } catch (e) {
                commit('setLoading', false);
            }
        },
        logOut({ commit }){
            commit('setLoading', true);
            localStorage.removeItem('user');
            commit('setUser', null);
            commit('setLoading', false);
        }
    },
    getters: {
        user: state => state.user,
        isUserLoggedIn: state => {
            return state.user !== null;
        },
        userList: state => state.userList,
        userById: state => id => state.userList.find(user => user.hashId === id)
    }
}