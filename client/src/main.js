import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";

import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";
import { sync } from 'vuex-router-sync';
import store from '@/store/store';

import {
  faShoppingCart,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faDollarSign);

import Products from "./components/Products.vue";
import ProductList from "./components/ProductList";
import Cart from "./components/Checkout.vue";
import Signup from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import Navbar from "./components/Navbar";
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.component('Navbar', Navbar);

const router = new VueRouter({
  routes: [
    {
      path: "*",
      name: 'product',
      component: Products
    },
    {
      path: "*",
      name: 'product',
      component: Products
    },
    {
      path: "/productList",
      name: 'productList',
      component: ProductList
    },
    {
      path: "/product",
      name: 'product',
      component: Products
    },
    {
      path: "/checkout",
      name: 'checkout',
      component: Cart
    },
    {
      path: "/signup",
      name: 'signup',
      component: Signup
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    }
  ]
});

sync(store, router);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
