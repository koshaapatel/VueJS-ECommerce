<template>
  <div>
    <h1>Checkout</h1>

    <table class="table table-hover" v-if="cart.length">
      <caption class="text-right h3">
        <b>Total:</b>
        <price class="d-block text-success font-weight-light" :value="Number(cartTotal)"></price>
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Item</th>
          <th scope="col" class="text-center">Qty</th>
          <th scope="col" class="text-right">Price</th>
          <th scope="col" class="text-right">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <td class="text-center">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button @click="$emit('add', item.product)" class="btn btn-info">+</button>
              <button @click="$emit('delete', index)" class="btn btn-outline-info">-</button>
            </div>
          </td>
          <th scope="row">{{item.product.name}}</th>
          <td class="text-center">{{item.qty}}</td>
          <td class="text-right">{{Number(item.product.price)}}</td>
          <td class="text-right">{{Number(item.qty * item.product.price)}}</td>
        </tr>
      </tbody>
    </table>
        <div class="display" v-html="display"></div>
    <div class="btn-toolbar" >
      <router-link class="btn btn-primary" to="/">Keep Shopping</router-link>
      <button type="button" class="btn btn-success" @click="$emit('placeorder')" >Place Order</button>
    </div>
  </div>
</template>

<script>
import Price from "./Price.vue";
import VueRouter from "vue-router";
import ProductService from '@/services/ProductService';


export default {
  name: "checkout",
  props: ["cart", "cartTotal",    "pName"],
  components: {
    Price,
    VueRouter
  },

   data() {
    return {
        user: '',
        product: '',
        productId: '',
        quantity: '',
        display: ''
    }
  },

  methods: {
  }
};
</script>
<style>
.btn-toolbar{
  display: inline-block;
}

button{
  margin-left: 10px;
}

</style>