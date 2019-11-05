<template>
  <div>
    <Navbar />
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 me">
            <div class="img">
              <img
                src="https://www.midlandsderm.com/wp-content/uploads/2019/04/Rachel-R.-Person-760x760.jpg"
                class="img-fluid"
              />
            </div>
            <div class="about">
              <h3>Mahmoud Shiref</h3>
              <a href="#">api.aswat.test/mahmoud_shirefaslkjdakshdkajsdh</a>
              <div class="row">
                <div class="col-6">
                  <button class="col-12 btn btn-primary">Settings</button>
                </div>
                <div class="col-6">
                  <button class="col-12 btn btn-danger">Deactivate</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 messages">
            <div class="message" v-for="i in 5" :key="i">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

              <i
                class="fa fa-caret-down"
                id="messageSettings"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              <div class="dropdown-menu" aria-labelledby="messageSettings">
                <div class="dropdown-item">
                  <i class="fa fa-trash fl-left"></i>
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/Layout/Navbar.vue";
import Footer from "../../components/Layout/Footer.vue";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.page-content {
  margin-top: 30px;
  .me {
    text-align: center;
    .img {
      max-height: 255px;
      max-width: 255px;
      border-radius: 50%;
      overflow: hidden;
      margin: auto;
    }
    .about {
      margin: 10px 0 20px 0;
      font-family: Cairo;
      h3 {
        font-weight: bold;
        text-align: center;
        margin: 0;
      }
      a {
        color: #28c3d4;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        overflow: hidden;
        margin-bottom: 10px;
      }
      button {
        font-size: 0.85rem;
      }
    }
  }
  .messages {
    .message {
      background: #fff;
      padding: 15px 40px 15px 20px;
      border-radius: 15px;
      text-align: justify;
      position: relative;
      margin-bottom: 20px;
      svg {
        color: #248ea9;
      }
      & > svg {
        position: absolute;
        top: 17.5px;
        right: 15px;
        cursor: pointer;
      }
    }
  }
}
</style>