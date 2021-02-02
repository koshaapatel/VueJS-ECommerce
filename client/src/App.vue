<template>
  <div id="app" class="container mt-5">
    <h1>Shopping Cart</h1>
    <navbar :cart="cart" :cartQty="cartQty" :cartTotal="cartTotal"></navbar>
    <router-view
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      :sliderStatus="sliderStatus"
      :maximum.sync="maximum"
      :products="products"
      @add="addItem"
      @delete="deleteItem"
      @placeorder="placeOrders"
      @toggle="toggleSliderStatus"
    ></router-view>
  </div>
</template>
<script>
import productService from './services/ProductService';
import NavBar from './components/Navbar';


export default {
  name: "app",
  data: function() {
    return {
      maximum: 99,
      sliderStatus: true,
      cart: [],
      products: null
    };
  },
  computed: {
      cartTotal: function() {
      let sum = 0;
      for (let key in this.cart) {
        sum = sum + this.cart[key].product.price * this.cart[key].qty;
      }
      return sum;
    },
    cartQty: function() {
      let qty = 0;
      for (let key in this.cart) {
        qty = qty + this.cart[key].qty;
      }
      return qty;
    }
  },
  methods: {
    toggleSliderStatus: function() {
      this.sliderStatus = !this.sliderStatus;
    },
    deleteItem: function(id) {
      if (this.cart[id].qty > 1) {
        this.cart[id].qty--;
      } else {
        this.cart.splice(id, 1);
      }
    },
    addItem: function(product) {
      var whichProduct;
      //console.log(this.cart);
      var existing = this.cart.filter(function(item, index) {
        if (item.product._id == Number(product._id)) {
          whichProduct = index;
          return true;
        } else {
          return false;
        }
      });
      if (existing.length) {
        this.cart[whichProduct].qty++;
      } else {
        this.cart.push({ product: product, qty: 1 });
      }
    },
    placeOrders : function(){
         try{
         productService.placeOrder({
              user: this.$store.state.user[0]._id
              }).then(data => {
         this.display = data.data.message
           console.log(data.data.message);
           alert(data.data.message);
           this.cart = []
      });
          
       }catch(err){
         console.trace(err);

       }

    }
  },
  mounted: function() {
     productService.getProducts()
      .then(data => {
        this.products = data.data.Products;
        console.log(data.data.Products);
      });
  }
};
</script>