<template>
  <div>
    <Navbar />
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 me">
            <div class="img">
              <img :src="DEFAULT_PIC" class="img-fluid" />
            </div>
            <div class="about">
              <h3>{{ user.name }}</h3>
              <router-link
                :to="{ name: 'user.send', params: { username: user.username } }"
              >api.aswat.test/{{ user.username }}</router-link>
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
            <div class="message" v-for="message in messages.data" :key="message.id">
              <template v-if="message.message">
                <p dir="auto">{{ message.message }}</p>
              </template>
              <template v-else>
                <Record
                  :url="message.record"
                  :parent="{ placeholder: 'Message #' + message.id, id: message.id }"
                />
              </template>
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
import Record from "../../components/Recorder/Record.vue";

export default {
  data() {
    return {
      messages: {},
      DEFAULT_PIC: process.env.MIX_DEFAULT_PIC
    };
  },
  components: {
    Navbar,
    Footer,
    Record
  },
  computed: {
    user() {
      return this.$store.state.Auth.user;
    }
  },
  async mounted() {
    this.$store.dispatch("Auth/fetchMe");
    // Fetch Messages
    const access_token = this.$store.state.Auth.access_token;
    await this.$http
      .get(`messages`, {
        headers: {
          Authorization: "Bearer " + access_token
        }
      })
      .then(response => response.json())
      .then(messages => {
        this.messages = messages;
      })
      .catch(error => console.log(error));
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
      .track {
        max-width: 300px;
        border-radius: 10px;
        border: 1px solid #eee;
      }
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