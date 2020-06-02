<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :class="{'base-button':(enlargeButton&&disableEnlarge)}"
    @mouseenter="playSound('hover'),enlargeButton=true"
    @click="playSound('click'),enlargeButton=false"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      enlargeButton: false
    };
  },
  props: {
    audio: {
      default: false
    },
    isLetsGo: {
      default: false
    },
    disableEnlarge: {
      default: true
    }
  },
  methods: {
    playSound(type) {
      if (this.audio) {
        let audio;
        if (type === "hover") {
          audio = this.$store.state.sounds.hover;
        } else if (type === "click") {
          if (this.isLetsGo) {
            audio = this.$store.state.sounds.letsGo;
          } else {
            audio = this.$store.state.sounds.click;
          }
        }
        if (this.isLetsGo && type === "click") {
          audio.volume = 0.2;
        }
        audio.play();
      }
    }
  }
};
</script>
<style scoped>
.base-button:hover {
  transform: scale(1.1);
}
</style>