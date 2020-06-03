<template>
  <span
    v-bind="$attrs"
    v-on="$listeners"
    class="chr"
    :class="[{'selected':char.clicked,'motion-started':showMotion},char.class]"
    @mouseenter="playSound('hover')"
    @click="playSound('click',char.correct),showIncorrectHints(char.correct)"
  >
    <transition name="component-fade">
      <video
        ref="videoelement"
        style="position: absolute;left: 0;top: 0;"
        v-show="showMotion"
        class="chr-img"
        :class="{'chr-motion':showMotion}"
      >
        <source :src="video" type="video/mp4" />Your browser does not support HTML5 video.
      </video>
    </transition>
    <transition name="component-fade">
      <span>
        <img v-show="char.type === 1" class="chr-img" :src="require('../assets/images/1.png')" />
        <img
          :class="{'correct-char':(char.type === 2 && char.highlight)}"
          v-show="char.type === 2"
          class="chr-img"
          :src="require('../assets/images/2.png')"
        />
        <img v-show="char.type === 3" class="chr-img" :src="require('../assets/images/3.png')" />
        <img
          :class="{'higlight-3':(char.type === 3 && (showHighlight || char.highlight)),'higlight-1':(char.type === 1 && (showHighlight || char.highlight))}"
          class="higlight"
          v-show="((showHighlight) || char.highlight) && (char.type === 3 || char.type === 1)"
          :src="require('../assets/images/higlighter.gif')"
        />
        <img
          v-show="(char.type === 2 && char.highlight)"
          :class="{'correct':char.highlight}"
          class="higlight"
          :src="require('../assets/images/right.png')"
        />
      </span>
    </transition>
  </span>
</template>

<script>
import video from "@/assets/video/video.mp4";
export default {
  data() {
    return {
      video,
      showMotion: false,
      showHighlight: false
    };
  },
  props: {
    highlight: {
      default: false
    },
    char: {
      required: true
    }
  },
  methods: {
    playSound(type, isCorrect = false) {
      let audio;
      if (type === "hover") {
        audio = this.$store.state.sounds.hover;
      } else if (type === "click") {
        audio = this.$store.state.sounds.click;
      }
      audio.play().then(() => {
        if (isCorrect) {
          audio = this.$store.state.sounds.correctAnswer;
          audio.play();
        }
      });
    },
    showIncorrectHints(isCorrect, callFromParent = false) {
      if (!isCorrect && !this.showMotion) {
        this.$emit("motionRunning");
        setTimeout(() => {
          this.showHighlight = true;
          this.$store.state.sounds.highlight.play();
          setTimeout(() => {
            this.showHighlight = false;
            this.$emit("showtip", 1);
            this.$store.state.sounds.tips.play();
            setTimeout(() => {
              this.$store.state.sounds.suggestion.play();
              this.$store.state.sounds.suggestion.onended = () => {
                this.showMotion = true;
                this.$refs.videoelement.play();
                if (!callFromParent) {
                  setTimeout(() => {
                    this.$refs.videoelement.onended = () => {
                      if (!callFromParent) {
                        setTimeout(() => {
                          this.$emit("restPostion");
                        }, 1000);
                      }
                    };
                  }, 1000);
                }
              };
            }, 500);
          }, 3000);
        }, 1000);
      }
    }
  }
};
</script>
<style scoped>
.chr {
  padding: 40px 30px;
  width: 25%;
  height: 276px;
  display: inline-block;
  margin: 0 2.5%;
  cursor: pointer;
  transition: transform 0.9s;
  position: relative;
}
.chr img.higlight {
  position: absolute;
}
.chr:hover {
  border: 3px dashed #7f7f7f;
  border-radius: 40px;
}
.chr .chr-img {
  width: 100%;
  vertical-align: middle;
  transition: transform 0.9s;
}
.chr.clicked-left {
  transform: translateX(120%);
  /* opacity: 0; */
}
.chr.clicked-right {
  transform: translateX(-120%);
}
.chr.move-right {
  transform: translateX(300%);
}
.chr.move-left {
  transform: translateX(-300%);
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 1s;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
.chr img.higlight-3 {
  width: 100px;
  top: 20px;
  right: 28px;
}
.chr img.higlight-1 {
  width: 100px;
  top: 32px;
  right: 133px;
}
.chr img.correct {
  width: 100px;
  left: 90px;
  top: 76px;
}
.chr img.correct-char {
  transform: scale(1.2);
}
.chr-motion {
  transform: translateX(90%);
}
.clicked-right.motion-started {
  transform: translateX(-160%) !important;
}
.clicked-left.motion-started {
  transform: translateX(80%) !important;
}
.motion-started.clicked-center {
  transform: translateX(-40%);
}
</style>