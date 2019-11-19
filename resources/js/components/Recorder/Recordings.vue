<template>
  <div id="trackHolder" class="tracks" v-if="recorded">
    <div class="track">
      <audio :src="url" controls></audio>
      <div class="track__actions">
        <button class="track__button track__button--play" :disabled="playing" @click="playAudio"></button>
        <button class="track__button track__button--pause" :disabled="!playing" @click="pauseAudio"></button>
      </div>
      <input type="text" class="track__name" placeholder="Your Message" disabled />
      <button class="track__button track__button--remove" @click="setRecorded(false)"></button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      playing: false
    };
  },
  computed: mapGetters("Message", ["url", "recorded"]),
  methods: {
    ...mapMutations("Message", ["setRecorded"]),
    playAudio() {
      this.playing = true;
      document.getElementsByTagName("audio")[0].play();
    },
    pauseAudio() {
      this.playing = false;
      document.getElementsByTagName("audio")[0].pause();
    }
  }
};
</script>

<style lang="scss">
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
      background: #fff;
      outline: none;
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
</style>