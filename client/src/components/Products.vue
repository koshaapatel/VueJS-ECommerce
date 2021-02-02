<template>
  <div>
    <product-list :maximum="maximum" :products="products"></product-list>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
import PriceSlider from "./PriceSlider.vue";
import ProductList from "./ProductList.vue";

export default {
  name: "products",
  props: [
    "products",
    "maximum",
    "cart",
    "cartQty",
    "cartTotal",
    "sliderStatus",
    "sliderState"
  ],
  components: {
    Navbar,
    PriceSlider,
    ProductList
  }
};
</script>