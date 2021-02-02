<template>
<div>
    <form >
        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" v-model="firstName" class="form-control" id="firstName" placeholder="">
        </div>
        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" v-model="lastName" class="form-control" id="lastName" placeholder="">
        </div>
        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" v-model="email" class="form-control" id="email" placeholder="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
        </div>
        <div class="form-group">
            <label for="addressLine1">Street Address</label>
            <input type="text" v-model="addressLine1" class="form-control" id="addressLine1" placeholder="">
        </div>
        <div class="form-group">
            <label for="addressLine2">Address Line 2</label>
            <input type="text" v-model="addressLine2" class="form-control" id="addressLine2" placeholder="">
        </div>
        <div class="form-group">
            <label for="city">City</label>
            <input type="text" v-model="city" class="form-control" id="city" placeholder="">
        </div>
        <div class="form-group">
            <label for="province">Province</label>
            <input type="text" v-model="province" class="form-control" id="province" placeholder="">
        </div>
        <div class="form-group">
            <label for="postalCode">Postal Code</label>
            <input type="text"  v-model="postalCode" class="form-control" id="postalCode" placeholder="">
        </div>
        <div class="form-group">
            <label for="country">Country</label>
            <input type="text" v-model="country" class="form-control" id="country" placeholder="">
        </div>
        <div class="error" v-html="error"></div>
        <button type="submit" class="btn btn-primary" @click="signup" >Register</button>
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

    data() {
    return {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        postalCode: '',
        country: '',
        error: null,
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        rules: {
          required: value => !!value || 'Required.'
        },

    }
  },

  methods: {
      async signup(){
       try{
          const response = await  UserService.signup({
              email: this.email,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              addressLine1: this.addressLine1,
              addressLine2: this.addressLine2,
              city: this.city,
              province: this.province,
              postalCode: this.postalCode,
              country: this.country

          })
          this.$router.push({
                name: 'login'
            })
       }catch(err){

         this.error = err.response.data.message

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
