export default {

    //Изначальное состояние
    state: {
        //Список с товарами - их ID

        //Пример объекта корзины
        // cartObj: {
        //     book: {},
        //     counter: 0
        // },

        cartList: []
    },


    mutations: {
        //Добавление в корзину
        //В параметрах принимает стейт и книгу
        addBookToCart(state, book) {

            let temp = state.cartList.find(value => value.book.hashId == book.hashId );

            console.log('Найденная кника ', temp);

            if (temp) {
                temp.counter ++;
                console.log('корзина ', temp);
                // state.cartList.push(temp);
            } else {
                let  cartObj = {};
                cartObj.counter = 1;
                cartObj.book = book;
                console.log('корзина ', cartObj);
                state.cartList.push(cartObj);
            }
        },

        //Изменение покупки + -
        //value -> либо +1 либо -1
        toggleCartItem(state, {book, value}) {

            console.log('ПРИХОД ', book, '  ', value);

            let temp = state.cartList.find(val => val.book.hashId == book.hashId );

            console.log('Найденная кника ', temp);

            if (temp) {
                //Если мы удалем одну книгу и количество этих книг == 1 -> остается 0
                //Мы ее удаляем из покупок
                if (value < 0 && temp.counter == 1) {
                    let index = state.cartList.indexOf(temp);
                    state.cartList.splice(index, 1)
                    return;
                }
                temp.counter += value;
                console.log('корзина ', temp);
            }
        },

        //Удаление элемента корзины
        deleteCartItem(state, book) {
            let temp = state.cartList.find(value => value.book.hashId == book.hashId );
            if (temp) {
                let index = state.cartList.indexOf(temp);
                state.cartList.splice(index, 1)
            }
        },

        //Очистка корзины
        clearCart(state){
            state.cartList = [];
        }
    },
    actions: {

    },
    getters: {

        //Метод для получения списка с товарами в корзине
        getCartList(state) {
            return state.cartList;
        }

    }
}