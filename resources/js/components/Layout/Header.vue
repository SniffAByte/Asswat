<template>
  <div>
    <Navbar />
    <header>
      <div>
        <h1>Say whatever you want safely and honestly</h1>
        <router-link :to="{ name: 'auth.register' }">
          <Btn>Get Started</Btn>
        </router-link>
      </div>
      <router-link id="scroll-down" to="#introduction" refresh>
        <i class="fa fa-sort-down"></i>
      </router-link>
    </header>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  components: {
    Navbar
  }
};
</script>


<style lang="scss" scoped>
header {
  background: linear-gradient(to right, #248da8, #196579);
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  h1 {
    font-family: Monoton;
    color: #fff;
    max-width: 800px;
  }
}
</style>