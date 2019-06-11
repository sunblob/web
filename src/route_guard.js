import store from './store/store'

export  function authGuard(to, from, next) {
    if (store.getters.user) {
        next()
    } else {
        next('/login?loginError')
    }
}

export function adminGuard(to, from, next) {
    if (store.getters.user.isAdmin) {
        next()
    } else {
        next('/login?permissionError')
    }
}