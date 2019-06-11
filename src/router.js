import Vue from 'vue'
import Router from 'vue-router'
import { authGuard, adminGuard } from './route_guard'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   meta: {layout: 'main'},
    //   component: () => import('./views/Home.vue')
    // },
    {
      path: '/',
      name: 'list',
      meta: {layout: 'main'},
      component: () => import('./views/BookList.vue')
    },
    {
      path: '/book/:hashId',
      name: 'book',
      meta: {layout: 'main'},
      component: () => import('./views/Book.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {layout: 'main'},
      component: () => import('./views/About.vue')
    },
    {
      path: '/deliver',
      name: 'deliver',
      meta: {layout: 'main'},
      component: () => import('./views/Deliver.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {layout: 'main'},
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main'},
      beforeEnter: authGuard,
      component: () => import('./views/Profile.vue'),
      children: [
        {
          path: '/profile/purchases',
          name: 'purchases',
          meta: {layout: 'main'},
          beforeEnter: authGuard,
          component: () => import('./views/PurchaseHistory.vue')
        },
        {
          path: '/profile/settings',
          name: 'settings',
          meta: {layout: 'main'},
          beforeEnter: authGuard,
          component: () => import('./views/ProfileSettings.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'main'},
      component: () => import('./views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'main'},
      component: () => import('./views/auth/Register.vue')
    },
    {
      path: '/admin/products',
      name: 'products',
      meta: {layout: 'admin'},
      component: () => import('./views/admin/Products.vue'),
      beforeEnter: adminGuard,
    },
    {
      path: '/admin/products/:hashId/edit',
      name: 'editproduct',
      props: true,
      meta: {layout: 'admin'},
      component: () => import('./views/admin/EditBook.vue'),
      beforeEnter: adminGuard
    },
    {
      path: '/admin/products/add',
      name: 'addproduct',
      meta: {layout: 'admin'},
      component: () => import('./views/admin/AddBook.vue'),
      beforeEnter: adminGuard
    },
    {
      path: '/admin/users',
      name: 'userlist',
      meta: {layout: 'admin'},
      component: () => import('./views/admin/Users.vue'),
      beforeEnter: adminGuard
    },
    {
      path: '/admin/users/:hashId',
      name: 'user',
      meta: {layout: 'admin'},
      component: () => import('./views/admin/SingleUser.vue'),
      beforeEnter: adminGuard
    },
    {
      path: '/admin/categories',
      name: 'categories',
      meta: {layout: 'admin'},
      component: () => import('./views/admin/CategoryList.vue'),
      beforeEnter: adminGuard
    },
    {
      path: '/admin/categories/add',
      name: 'addcategory',
      meta: {layout: 'admin'},
      component: () => import('./views/admin/AddCategory.vue'),
      beforeEnter: adminGuard
    },
    {
      path: '/admin/orders',
      name: 'orders',
      meta: {layout: 'admin'},
      component: () => import('./views/admin/Orders.vue'),
      beforeEnter: adminGuard
    }
  ]
})
