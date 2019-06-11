import axios from 'axios'

export default {
    //Изначальное состояние
    state: {
        apiUrl: 'http://localhost:5000/mainPost',
        purchaseList: []
    },

    //Мутации - изменение состояния
    mutations: {
        setPurchase(state, payload){
            state.purchaseList = payload;
        }
    },

    //Первичное получение всех покупок пользователя
    actions: {
        fetchPurchases({state, commit}) {
            return new Promise((res, rej) => {
                axios.post(`${state.apiUrl}`, {
                    router: 'getAllPurchases',
                    token: JSON.parse(localStorage.getItem('user')).token
                })
                .then(response => {
                    console.log('История покупок',response.data);
                    commit('setPurchase', response.data)
                    res(response.data)
                })
                .catch(e => {
                    console.log(e.response.data.error)
                    res(undefined)
                })
            })
        },
    },

    //Получение списка
    getters: {
        //Метод для получения списка с товарами в корзине
        purchaseList: state => state.purchaseList,
        purchaseListByUserId: state => hashId => state.purchaseList.forEach(user => user.hashId === userHashId)
    }
}