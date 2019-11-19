<template>
  <div class="recorder-panel">
    <button
      class="voice-button"
      :class="{'resume': paused, 'pause': !paused}"
      :disabled="!recording"
      @click="toggleRecording"
    ></button>
    <button class="voice-button record" @click="startRecording" :disabled="recording || recorded"></button>
    <button class="voice-button stop" :disabled="!recording" @click="stopRecording"></button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      recording: false,
      paused: false,
      gumStream: null,
      rec: null
    };
  },
  computed: mapGetters("Message", ["recorded"]),
  methods: {
    ...mapMutations("Message", ["setRecorded", "setBlob", "setUrl"]),
    startRecording() {
      this.recording = true;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false
        })
        .then(stream => {
          this.gumStream = stream;
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          var audioContext = new AudioContext();
          var input = audioContext.createMediaStreamSource(stream);
          this.rec = new Recorder(input, { numChannels: 1 });
          this.rec.record();
        })
        .catch(err => {});
    },
    toggleRecording() {
      if (this.rec.recording) {
        //pause
        this.rec.stop();
        this.paused = true;
      } else {
        //resume
        this.rec.record();
        this.paused = false;
      }
    },
    stopRecording() {
      this.setRecorded(true);
      this.recording = false;
      this.rec.stop(); //stop microphone access
      this.gumStream.getAudioTracks()[0].stop();
      //create the wav blob and pass it on to createDownloadLink
      this.rec.exportWAV(this.createDownloadLink);
    },
    createDownloadLink(blob) {
      this.setBlob(blob);
      var URL = window.URL || window.webkitURL;
      var url = URL.createObjectURL(blob);
      this.setUrl(url);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>