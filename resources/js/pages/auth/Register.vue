<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 intro">
        <router-link :to="{ name: 'index' }" tag="h2">Asswat</router-link>
        <p class="lead">Say whatever you want safely and honestly</p>
      </div>
      <div class="col-md-6 login">
        <form action="#" method="POST">
          <span>Sign up</span>
          <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="First Name" />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Last Name" />
            </div>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Email Address" />
          </div>
          <div class="form-row">
            <div class="col">
              <input type="password" class="form-control" placeholder="Password" />
            </div>
            <div class="col">
              <input type="password" class="form-control" placeholder="Confirm Password" />
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
  }
};
</script>