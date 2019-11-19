<template>
  <div>
    <Navbar />
    <div class="sendbox">
      <!-- User Pic And Name -->
      <div class="about">
        <img :src="user.pic ? user.pic : DEFAULT_PIC" />
        <h4>{{ user.name }}</h4>
      </div>
      <!-- End of User Pic And Name -->

      <!-- Navigation Tabs -->
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="text-tab"
            data-toggle="tab"
            href="#textMsg"
            role="tab"
            aria-controls="textMsg"
            aria-selected="true"
            @click="type = 'message'"
          >Text Message</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="record-tab"
            data-toggle="tab"
            href="#recordMsg"
            role="tab"
            aria-controls="recordMsg"
            aria-selected="false"
            @click="type = 'record'"
          >Voice Message</a>
        </li>
      </ul>
      <!-- End of Navigation Tabs -->

      <!-- Tabs Content -->
      <div class="tab-content" id="myTabContent">
        <!-- Normal Text Message Tab -->
        <div
          class="tab-pane fade show active"
          id="textMsg"
          role="tabpanel"
          aria-labelledby="text-tab"
        >
          <textarea
            placeholder="leave a constructive message"
            :value="message"
            @change="updateMessage"
          ></textarea>
          <a class="text text-danger" v-if="errors.message">{{ errors.message[0] }}</a>
        </div>
        <!-- End of Normal Text Message Tab -->

        <!-- Voice Message Tab -->
        <div class="tab-pane fade" id="recordMsg" role="tabpanel" aria-labelledby="record-tab">
          <RecorderPanel />
          <Recordings />
          <a class="text text-danger" v-if="errors.record">{{ errors.record[0] }}</a>
        </div>
        <!-- End of Voice Message Tab -->
      </div>
      <!-- End of Tabs Content -->
      <button class="btn btn-primary" @click="SendMessage(type)">Send</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Navbar from "../../components/Layout/Navbar.vue";
import RecorderPanel from "../../components/Recorder/RecorderPanel.vue";
import Recordings from "../../components/Recorder/Recordings.vue";

export default {
  data() {
    return {
      DEFAULT_PIC: process.env.MIX_DEFAULT_PIC,
      type: "message"
    };
  },
  computed: mapGetters("Message", ["user", "errors", "message"]),
  components: {
    Navbar,
    RecorderPanel,
    Recordings
  },
  methods: {
    ...mapActions("Message", ["fetchReceiver", "SendMessage"]),
    ...mapMutations("Message", ["updateMessage"])
  },
  mounted() {
    // Fetch User Info Or Abort 404
    const username = this.$route.params.username;
    this.fetchReceiver(username);
  }
};
</script>


<style lang="scss" scoped>
.sendbox {
  background: #fff;
  width: 90%;
  max-width: 900px;
  margin: 100px auto;
  position: relative;
  padding: 80px 15px 15px;
  border-radius: 5px;
  .about {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    & > img {
      border: 3px solid #fff;
      max-width: 100px;
      border-radius: 50%;
    }
    h4 {
      text-transform: capitalize;
      font-size: 1rem;
    }
  }
  textarea {
    padding: 5px;
    width: 100%;
    height: 150px;
    resize: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
    outline: none;
  }
}
</style>