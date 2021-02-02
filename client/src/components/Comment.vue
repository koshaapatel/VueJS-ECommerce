<template>
<div>
    <form >
        <div class="form-group">
            <label for="commentDesc">Comment Description</label>
            <input type="email" v-model="commentDesc" class="form-control" id="commentDesc" placeholder="">
        </div>
        <div class="form-group">
            <label for="rating">Rating</label>
           <select v-model="rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
        </div>
        <div class="form-group">
            <input type="file" class="form-control" id="image">
        </div>
        <div class="error" v-html="error"></div>
        <button type="submit" class="btn btn-primary" @click="postComment" >Post Comment</button>
    </form>
</div>
    
</template>
<script>
import ProductService from '@/services/ProductService.js';
import Navbar from "./Navbar.vue";

export default {
    components: {
        Navbar
    },

    data() {
    return {
        product: '',
        user: '',
        commentDesc: null,
        rating:'',
        image:'',
        show1: false,
        show2: true,
        rules: {
          required: value => !!value || 'Required.'
        },

    }
  },

  methods: {
     async postComment(){
       try{
          const response = await  ProductService.postComment({
              product: "",
              user: state.user,
              commentDesc: this.commentDesc,
              rating: this.rating,
              image: this.image
          })
       }catch(error){
         this.error = error.response.data.error
       }
       
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
