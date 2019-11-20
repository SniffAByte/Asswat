<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 intro">
        <router-link :to="{ name: 'index' }" tag="h2">Asswat</router-link>
        <p class="lead">Say whatever you want safely and honestly</p>
        <router-link id="scroll-down" to="#form" refresh class="d-md-none">
          <i class="fa fa-sort-down"></i>
        </router-link>
      </div>
      <div class="col-md-6 login" id="form">
        <form action="#" method="POST" @submit.prevent="Register">
          <span>Sign up</span>
          <div class="text text-danger text-left" v-if="error && error.name">{{ error.name[0] }}</div>
          <div class="form-row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
                v-model="user.fname"
                required
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
                v-model="user.lname"
                required
              />
            </div>
          </div>

          <div class="text text-danger text-left" v-if="error && error.email">{{ error.email[0] }}</div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email Address"
              v-model="user.email"
              required
            />
          </div>
          <div
            class="text text-danger text-left"
            v-if="error && error.password"
          >{{ error.password[0] }}</div>
          <div class="form-row">
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="user.pass"
                required
              />
            </div>
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                v-model="user.cpass"
                required
              />
            </div>
          </div>

          <Btn>Register</Btn>
          <hr />
          <router-link class="text-center" :to="{ name: 'auth.login' }">Already have an account?</router-link>
          <hr />
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/sass/auth.scss";
</style>

<script>
import { mapGetters } from "vuex";
export default {
  head: {
    title: {
      inner: "Create an account"
    }
  },
  data() {
    return {
      user: {
        fname: "",
        lname: "",
        email: "",
        pass: "",
        cpass: ""
      }
    };
  },
  computed: mapGetters("Auth", ["error"]),
  methods: {
    Register() {
      this.$store.dispatch("Auth/register", {
        name: this.user.fname + " " + this.user.lname,
        email: this.user.email,
        password: this.user.pass,
        password_confirmation: this.user.cpass
      });
    }
  }
};
</script>