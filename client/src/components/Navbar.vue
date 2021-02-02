<template>
  <nav class="navbar navbar-dark bg-dark" >
    <button 
            class="btn btn-outline-success my-2 my-sm-0"  
            @click="navigateTo({name:'product'})" >
            Products
    </button>
    <button 
            class="btn btn-outline-success my-2 my-sm-0" 
            v-if="!$store.state.isUserLoggedIn" 
            @click="navigateTo({name:'signup'})" > Sign Up</button>
    <button class="btn btn-outline-success my-2 my-sm-0" v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name:'login'})" > Log In</button>
    <div class="navbar-text ml-auto d-flex">
         <span v-if="$store.state.isUserLoggedIn"  class="name" > User: {{$store.state.user[0].email}} </span>
            <button class="btn btn-outline-success my-2 my-sm-0" 
        v-if="$store.state.isUserLoggedIn" @click="logout" > Log Out</button>
      <button class="btn btn-sm btn-outline-success" @click="$parent.$emit('toggle')">
        <i class="fas fa-dollar-sign"></i>
        <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
      </button>
      <div class="dropdown ml-2" v-if="cart.length>0">
        <button
          class="btn btn-success btn-sm dropdown-toggle"
          id="cartDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="badge badge-pill badge-light">{{cartQty}}</span>
          <i class="fas fa-shopping-cart mx-2"></i>
          <price :value="Number(cartTotal)"></price>
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="cartDropdown">
          <div v-for="(item, index) in cart" :key="index">
            <div class="dropdown-item-text text-nowrap text-right">
              <span class="badge badge-pill badge-warning align-text-top mr-1">{{item.qty}}</span>
              {{item.product.name}}
              <b>
                <price :value="Number(item.qty * item.product.price)"></price>
              </b>
              <a
                href="#"
                @click.stop="$parent.$emit('delete', index)"
                class="badge badge-danger text-white"
              >-</a>
            </div>
          </div>
          <router-link
            class="btn btn-sm btn-outline-info text-dark float-right mr-4"
            to="/checkout"
          >Checkout</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Price from "./Price.vue";
import VueRouter from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import productService from "@/services/UserService";

export default {
  name: "navbar",
  props: ["cart", "cartQty", "cartTotal"],
  components: {
    FontAwesomeIcon,
    VueRouter,
    Price
  },

  methods: {
    navigateTo(route){
            this.$router.push(route)
        },
        logout(){
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'product'
            })
        }
  }
};
</script>

<style scoped>
.name{
  color: white;
}
</style>