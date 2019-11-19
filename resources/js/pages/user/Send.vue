<template>
  <div>
    <Navbar />
    <div class="sendbox">
      <div class="about">
        <img :src="user.pic ? user.pic : DEFAULT_PIC" />
        <h4>{{ user.name }}</h4>
      </div>
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
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="textMsg"
          role="tabpanel"
          aria-labelledby="text-tab"
        >
          <textarea placeholder="leave a constructive message" v-model="message"></textarea>
          <a class="text text-danger" v-if="errors.message">{{ errors.message[0] }}</a>
        </div>
        <div class="tab-pane fade" id="recordMsg" role="tabpanel" aria-labelledby="record-tab">
          <div class="recorder-panel">
            <button
              class="voice-button"
              :class="{'resume': voice.paused, 'pause': !voice.paused}"
              :disabled="!voice.recording"
              @click="toggleRecording"
            ></button>
            <button
              class="voice-button record"
              @click="startRecording"
              :disabled="voice.recording || voice.recorded"
            ></button>
            <button class="voice-button stop" :disabled="!voice.recording" @click="stopRecording"></button>
          </div>
          <div id="trackHolder" class="tracks" v-if="voice.recorded">
            <div class="track">
              <audio :src="voice.url" controls></audio>
              <div class="track__actions">
                <button
                  class="track__button track__button--play"
                  :disabled="voice.playing"
                  @click="playAudio"
                ></button>
                <button
                  class="track__button track__button--pause"
                  :disabled="!voice.playing"
                  @click="pauseAudio"
                ></button>
              </div>
              <input type="text" class="track__name" placeholder="Unsecret Message" disabled />
              <button class="track__button track__button--remove" @click="resetRecording"></button>
            </div>
          </div>
          <a class="text text-danger" v-if="errors.record">{{ errors.record[0] }}</a>
        </div>
      </div>
      <button class="btn btn-primary" @click="submitMessage">Send</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Layout/Navbar.vue";

export default {
  data() {
    return {
      type: "message",
      user: {},
      DEFAULT_PIC: process.env.MIX_DEFAULT_PIC,
      voice: {
        recording: false,
        paused: false,
        recorded: false,
        url: null,
        playing: false,
        rec: null,
        gumStream: null
      },
      message: "",
      errors: {}
    };
  },
  components: {
    Navbar
  },
  methods: {
    toggleRecording() {
      if (this.voice.rec.recording) {
        //pause
        this.voice.rec.stop();
        this.voice.paused = true;
      } else {
        //resume
        this.voice.rec.record();
        this.voice.paused = false;
      }
    },
    startRecording() {
      this.voice.recording = true;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false
        })
        .then(stream => {
          this.voice.gumStream = stream;
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          var audioContext = new AudioContext();
          var input = audioContext.createMediaStreamSource(stream);
          this.voice.rec = new Recorder(input, { numChannels: 1 });
          this.voice.rec.record();
          console.log("Recording started");
        })
        .catch(function(err) {
          //enable the record button if getUserMedia() fails
          console.log("recording failed + " + err);
        });
    },
    stopRecording() {
      this.voice.recorded = true;
      this.voice.recording = false;
      console.log("stopButton clicked");
      this.voice.rec.stop(); //stop microphone access
      this.voice.gumStream.getAudioTracks()[0].stop();
      //create the wav blob and pass it on to createDownloadLink
      this.voice.rec.exportWAV(this.createDownloadLink);
    },
    createDownloadLink(blob) {
      var URL = window.URL || window.webkitURL;
      var url = URL.createObjectURL(blob);
      this.voice.url = url;
    },
    playAudio() {
      this.voice.playing = true;
      console.log(document.getElementsByTagName("audio")[0]);
      document.getElementsByTagName("audio")[0].play();
    },
    pauseAudio() {
      this.voice.playing = false;
      document.getElementsByTagName("audio")[0].pause();
    },
    resetRecording() {
      this.voice.recorded = false;
    },
    submitMessage() {
      const username = this.$route.params.username;
      this.errors = {};
      if (this.type === "message") {
        this.$http
          .post(`${username}/send`, {
            message: this.message
          })
          .then(response => {
            alertify.notify("Your message has been sent.", "success");
            this.message = "";
            this.voice.recorded = false;
          })
          .catch(error => {
            this.errors = error.data.errors;
          });
      } else if (this.type === "record") {
        this.$http
          .post(`${username}/send`, {
            record: this.voice.url
          })
          .then(response => {
            alertify.notify("Your voice message has been sent.", "success");
            this.message = "";
            this.voice.recorded = false;
          })
          .catch(error => {
            this.errors = error.data.errors;
          });
      }
    }
  },
  async mounted() {
    const username = this.$route.params.username;
    await this.$http
      .get(`${username}`)
      .then(response => response.json())
      .then(user => (this.user = user))
      .catch(error => {
        return this.$router.push({ name: "404" });
      });
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
  .recorder-panel {
    display: flex;
    padding: 30px;
    justify-content: center;
    .voice-button {
      outline: none;
      width: 13vw;
      max-width: 100px;
      height: 13vw;
      max-height: 100px;
      border-radius: 50%;
      background: white;
      border: 1px solid #eee;
      position: relative;
      cursor: pointer;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.3s;
      display: flex;
      justify-content: center;
      margin: 0 10px;
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
      &:disabled {
        cursor: no-drop;
        opacity: 0.4;
      }
      &::before,
      &::after {
        content: "";
        display: block;
        background: tomato;
      }
      &.record::before {
        width: 5vw;
        max-width: 25px;
        height: 5vw;
        max-height: 25px;
        border-radius: 50%;
      }
      &.record::after {
        display: none;
      }

      &.resume::after {
        display: none;
      }

      &.resume::before {
        width: 0;
        height: 0;
        background: transparent;
        border-left: solid 25px tomato;
        border-bottom: solid 15px transparent;
        border-top: solid 15px transparent;
        margin-left: 8px;
        @media screen and (max-width: 700px) {
          border-left: solid 5vw tomato;
          border-bottom: solid 3vw transparent;
          border-top: solid 3vw transparent;
        }
      }

      &.pause {
        display: flex;
        justify-content: center;
      }

      &.pause::before,
      &.pause::after {
        width: 1.6vw;
        max-width: 10px;
        height: 5vw;
        max-height: 25px;
      }

      &.pause::after {
        margin-left: 5px;
      }

      &.stop::after {
        content: "\2713";
        background: none;
        color: tomato;
        font-size: 50px;
        @media screen and (max-width: 700px) {
          font-size: 5vw;
        }
      }
    }
  }
  // here
  .tracks {
    max-width: 300px;
    border: 1px solid #eee;
    background: white;
    border-radius: 10px;
    margin: 0 auto;
    .track {
      display: flex;
      justify-content: space-between;
      audio {
        display: none;
      }
      .track__actions {
        display: flex;
        justify-content: center;
      }
      .track__name {
        border: 0;
        font-family: sans-serif;
        color: #666;
        font-size: 14px;
        font-weight: bold;
      }
      .track__button {
        width: 30px;
        height: 30px;
        border: none;
        background: none;
        position: relative;
        display: flex;
        justify-content: center;
        cursor: pointer;
        &:disabled {
          cursor: no-drop;
          opacity: 0.4;
        }
        &::before,
        &::after {
          content: "";
          display: block;
          background: tomato;
        }
        &--play::before {
          width: 0;
          height: 0;
          background: transparent;

          border-left: solid 12px tomato;
          border-bottom: solid 8px transparent;
          border-top: solid 8px transparent;

          /* place the icon on middle */
          margin-left: 3px;
          &::after {
            display: none;
          }
        }
        &--pause {
          display: flex;
          justify-content: center;
          border-left: 1px solid #eee;
          border-right: 1px solid #eee;
          &::before,
          &::after {
            width: 5px;
            height: 15px;
          }

          &::after {
            margin-left: 2px;
          }
        }
        &--remove {
          border-left: 1px solid #eee;
          &::before,
          &::after {
            width: 4px;
            height: 15px;
            position: absolute;
            left: 50%;
            top: 50%;
          }

          &::before {
            transform: translate(-50%, -50%) rotate(45deg);
          }

          &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
    }
  }
}
</style>