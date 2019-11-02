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
      <div class="col-md-6 login">
        <form action="#" method="POST" id="form">
          <span>Sign in</span>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Your email" />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Your password" />
          </div>
          <Btn>Login</Btn>
          <hr />
          <div class="row">
            <router-link class="col-6 text-left" :to="{ name: 'auth.register' }">New user?</router-link>
            <router-link class="col-6 text-left" to="#">Forgot password</router-link>
          </div>
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
      inner: "Login to your account"
    }
  }
};
</script>