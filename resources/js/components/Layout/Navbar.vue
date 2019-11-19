<template>
  <nav class="navbar navbar-expand-lg navbar-dark" :class="{'fixed-top': fixedTop}">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'index' }">Asswat</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#myNavbar"
        aria-controls="myNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse navbar-default" id="myNavbar">
        <ul class="navbar-nav ml-auto" v-if="!authenticated">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ name: 'index' }">
              Home
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="#">About Us</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Stats</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'auth.login' }">Login</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-else>
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ name: 'user.dashboard' }">Messages</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{}">Settings</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logout" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<style lang="scss">
nav {
  background: linear-gradient(to right, #248da8, #196579);
  padding: 1.3rem 1rem !important;
  &.fixed-top {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  }
  .navbar-toggler {
    border: none;
  }
  a {
    color: #fff;
    font-family: Cairo;
    &.navbar-brand {
      font-family: Monoton, cursive;
    }
    &[href] {
      transition: color 0.3s;
      &:hover {
        color: #7adfe1;
      }
    }
  }
}
</style>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      scrolled: 0
    };
  },
  computed: {
    fixedTop() {
      return this.scrolled > 200;
    }
  },
  methods: mapActions("Auth", ["logout"])
};
</script>