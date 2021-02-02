<template>
<div>
    <form >
        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" v-model="email" class="form-control" id="email" placeholder="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
        </div>
        <div class="error" v-html="error"></div>
        <button type="submit" class="btn btn-primary" @click="login" >Log In</button>
    </form>
</div>
    
</template>
<script>
import UserService from '@/services/UserService';
import Navbar from "./Navbar.vue";

export default {
    components: {
        Navbar
    },

    data: function() {
     return {
        email: '',
        password: '',
        error: null,
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        rules: {
          required: value => !!value || 'Required.'
        }
     }
  },

  methods: {
     async login(){
       try{
          const response = await  UserService.login({
              email: this.email,
              password: this.password
          })
          
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
                name: 'product'
            })
       }catch(error){

         this.error = error.response.data.message
         console.log(error);

       }
       
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.error{
    color: red;
}
</style>
