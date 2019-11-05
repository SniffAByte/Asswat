<template>
  <div>
    <Header />
    <div class="introduction" id="introduction">
      <div class="container">
        <h1>Asswat</h1>
        <p
          class="lead"
        >send and say honest messages to your coworkers without even knowing who sent it.</p>
        <h3>How it works</h3>
        <p
          class="lead"
        >Asswat allows you to receive constructive feedback from your co-workers and friends with keeping their personalities hidden</p>
        <router-link :to="{ name: 'auth.register' }">
          <Btn>Get Started</Btn>
        </router-link>
      </div>
    </div>
    <div class="statistics">
      <div class="container">
        <h1>Numbers Talk</h1>
        <div class="stat">
          <div class="lead">Messages to users:</div>
          <span>1,524</span>
        </div>
        <div class="stat">
          <div class="lead">Total users:</div>
          <span>907</span>
        </div>
        <div class="stat">
          <div class="lead">Sent Messages today:</div>
          <span>74</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Layout/Header.vue";
import Footer from "../components/Layout/Footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
.introduction {
  padding: 80px 0;
  background: #fff;
  h1 {
    font-family: monoton;
  }
  h3 {
    margin-top: 30px;
    font-family: Righteous;
  }
}
.statistics {
  padding: 80px 0;
  background: linear-gradient(to right, #248da8, #196579);
  color: #fff;
  h1 {
    font-family: monoton;
  }
  .stat {
    margin-top: 30px;
    font-family: Righteous;
    & > div {
      text-transform: capitalize;
    }
    & > span {
      margin-left: 40px;
      color: #f5fbca;
      font-size: 1.5rem;
    }
  }
}
</style>