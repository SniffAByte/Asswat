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
          <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="First Name" v-model="user.fname" />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Last Name" v-model="user.lname" />
            </div>
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email Address"
              v-model="user.email"
            />
          </div>
          <div class="form-row">
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="user.pass"
              />
            </div>
            <div class="col">
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                v-model="user.cpass"
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