<template>
  <div id="trackHolder" class="tracks" v-if="recorded">
    <Record :url="url" :parent="{send: 'send', placeholder: 'Your Message', id: 1}" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Record from "./Record.vue";
export default {
  components: {
    Record
  },
  computed: mapGetters("Message", ["recorded", "url"])
};
</script>

<style lang="scss">
.tracks {
  max-width: 300px;
  border: 1px solid #eee;
  background: white;
  border-radius: 10px;
  margin: 0 auto;
}
</style>