<template>
  <div class="xyz align-center justify-center">
    <base-button
      @click="show = true"
      v-if="!show"
      x-large
      color="black"
      class="white--text display-1"
    >Start</base-button>
    <transition name="component-fade">
      <v-card
        v-if="show && !showQuestion && !success"
        :tile="true"
        :elevation="20"
        class="pt-12 mx-auto absolutecard"
        height="500"
        width="1024"
      >
        <div>
          <v-card-text class="pt-12 display-3 font-weight-regular red-text">CHARACTER STRUCTURES</v-card-text>
          <div>
            <base-button
              @click="showQuestion = true,startShowOption()"
              :isLetsGo="true"
              :audio="true"
              x-large
              color="black"
              class="white--text mt-12 display-1"
            >let's Go</base-button>
          </div>
          <div>
            <base-button
              :audio="true"
              @click="show = false"
              x-large
              color="grey"
              class="white--text mt-5 display-1"
            >Go Back</base-button>
          </div>
        </div>
      </v-card>
    </transition>
    <transition name="component-fade">
      <v-card
        :key="uid"
        v-show="show && showQuestion && !success"
        :tile="true"
        :elevation="20"
        class="pt-5 mx-auto absolutecard"
        height="500"
        width="1024"
      >
        <div :class="{'overlay':showingTipsTrains}"></div>
        <div>
          <base-button
            :disabled="showingTipsTrains"
            @click="highlightTrain"
            class="close-btn"
            icon
            :audio="true"
          >
            <img style="width: 70px;" src="../assets/images/close.png" alt />
          </base-button>
          <transition name="component-fade">
            <div class="tips" v-if="showclosetip">
              <img src="../assets/images/arrow.png" />
              <p>Hey, you can always click here if you are unsure about the answer.</p>
            </div>
          </transition>
          <v-card-text
            key="12"
            color="#e1001e"
            class="fade-text display-1 font-weight-regular red-text"
          >FIND THE CHARACTER FOR "TO GO/TO MOVE"</v-card-text>
          <transition name="component-fade">
            <div v-show="showCharacters" class="chinese-content mt-10">
              <Question
                v-for="(character) in characters"
                :key="character.type"
                :char="character"
                :tipsTrainsStarted="showingTipsTrains"
                @click="setSelected(character.type),isQuestionSelected=true"
                @restPostion="restPostion"
                @showtip="handleShowAnswerTips"
                @motionRunning="showingTipsTrains = true"
              />
            </div>
          </transition>
          <transition name="component-fade">
            <div v-if="showAnswerTips" class="answertips">
              <p>Have a check of the evolution of this character and see what is missing there!</p>
            </div>
          </transition>
        </div>
      </v-card>
    </transition>
    <transition name="component-fade">
      <v-card
        v-if="success"
        :tile="true"
        :elevation="20"
        class="pt-12 mx-auto absolutecard"
        height="500"
        width="1024"
      >
        <div>
          <v-card-text class="pt-12 display-3 font-weight-regular red-text">CONGRATULATIONS</v-card-text>
          <div>
            <base-button
              @click="reset"
              :audio="true"
              x-large
              color="black"
              class="white--text mt-12 display-1"
            >Restart</base-button>
          </div>
        </div>
      </v-card>
    </transition>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import Question from "@/components/Question";

export default {
  data() {
    return {
      show: false,
      showQuestion: false,
      showCharacters: false,
      isQuestionSelected: false,
      success: false,
      showclosetip: false,
      showAnswerTips: false,
      showingTipsTrains: false,
      uid: 1,
      characters: [
        {
          correct: false,
          type: 1,
          clicked: false,
          class: "",
          highlight: false
        },
        {
          correct: true,
          type: 2,
          clicked: false,
          class: "",
          highlight: false
        },
        {
          correct: false,
          type: 3,
          clicked: false,
          class: "",
          highlight: false
        }
      ]
    };
  },
  components: {
    BaseButton,
    Question
  },
  created() {
    this.characters = this.lodash.shuffle([...this.characters]);
  },
  methods: {
    highlightTrain() {
      this.showingTipsTrains = true;
      this.characters.map(item => {
        item.class = "";
        item.clicked = false;
        item.highlight = false;
      });
      this.characters.forEach((item, index) => {
        if (item.type === 1) {
          item.highlight = true;
          if (index === 0) {
            item.class = "clicked-left";
            this.characters[1].class = "move-left";
            this.characters[2].class = "move-right";
          } else if (index === 1) {
            item.class = "clicked-center";
            this.characters[0].class = "move-left";
            this.characters[2].class = "move-right";
          } else if (index === 2) {
            item.class = "clicked-right";
            this.characters[0].class = "move-left";
            this.characters[1].class = "move-right";
          }
          this.$store.state.sounds.highlight.play();
        } else {
          item.highlight = false;
        }
      });
      setTimeout(() => {
        this.characters.forEach((item, index) => {
          if (item.type === 3) {
            item.highlight = true;
            if (index === 0) {
              item.class = "clicked-left";
              this.characters[1].class = "move-left";
              this.characters[2].class = "move-right";
            } else if (index === 1) {
              item.class = "clicked-center";
              this.characters[0].class = "move-left";
              this.characters[2].class = "move-right";
            } else if (index === 2) {
              item.class = "clicked-right";
              this.characters[0].class = "move-left";
              this.characters[1].class = "move-right";
            }
            this.$store.state.sounds.highlight.play();
          } else {
            item.highlight = false;
          }
        });
        setTimeout(() => {
          this.characters.forEach((item, index) => {
            if (item.type === 2) {
              item.highlight = true;
              if (index === 0) {
                item.class = "clicked-left";
                this.characters[1].class = "move-left";
                this.characters[2].class = "move-right";
              } else if (index === 1) {
                item.class = "clicked-center";
                this.characters[0].class = "move-left";
                this.characters[2].class = "move-right";
              } else if (index === 2) {
                item.class = "clicked-right";
                this.characters[0].class = "move-left";
                this.characters[1].class = "move-right";
              }
              this.$store.state.sounds.highlight.play();
              setTimeout(() => {
                this.showingTipsTrains = false;
                item.highlight = false;
              }, 2000);
            } else {
              item.highlight = false;
            }
          });
          setTimeout(() => {
            this.characters.map(item => {
              item.class = "";
              item.clicked = false;
              item.highlight = false;
            });
          }, 3000);
        }, 3000);
      }, 3000);
    },
    restPostion() {
      this.showingTipsTrains = false;
      const characters = [...this.characters];
      characters.map(item => {
        item.class = "";
        item.clicked = false;
      });
      this.uid = this.uid + 1;
      this.isQuestionSelected = false;
      this.showAnswerTips = false;
      this.characters = characters;
    },
    handleShowAnswerTips(showtip) {
      this.showAnswerTips = showtip;
    },
    reset() {
      this.success = false;
      this.showQuestion = false;
      this.show = true;
      this.isQuestionSelected = false;
      this.showCharacters = false;
      const characters = [...this.characters];
      characters.map(item => {
        item.class = "";
        item.clicked = false;
      });
      this.characters = this.lodash.shuffle(characters);
    },
    startShowOption() {
      const audio = this.$store.state.sounds.question;
      audio.play();
      audio.onended = () => {
        this.showCharacters = true;
        setTimeout(() => {
          this.showclosetip = true;
          const audio = this.$store.state.sounds.tips;
          audio.play();
          setTimeout(() => {
            this.showclosetip = false;
          }, 2200);
        }, 600);
      };
    },
    setSelected(type) {
      if (!this.isQuestionSelected) {
        const characters = [...this.characters];
        characters.forEach((item, index) => {
          item.clicked = false;
          if (item.type === type) {
            if (!item.correct) {
              item.clicked = true;
              if (index === 0) {
                item.class = "clicked-left";
                characters[1].class = "move-left";
                characters[2].class = "move-right";
              } else if (index === 1) {
                item.class = "clicked-center";
                characters[0].class = "move-left";
                characters[2].class = "move-right";
              } else if (index === 2) {
                item.class = "clicked-right";
                characters[0].class = "move-left";
                characters[1].class = "move-right";
              }
            } else {
              this.success = true;
            }
          }
        });
        this.characters = characters;
      }
    }
  }
};
</script>
<style scoped>
.red-text {
  color: #e1001e;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 1s;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
.absolutecard {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  overflow: hidden;
}
.close-btn {
  position: absolute;
  right: 40px;
  top: 40px;
}
.tips {
  position: absolute;
  right: 130px;
  top: 94px;
  border: 1px dashed #c00000;
  padding: 15px 25px;
  border-radius: 5px;
  background: #e7e6e6;
  font-size: 18px;
}
.answertips {
  border: 3px dashed #c00000;
  padding: 15px 25px;
  border-radius: 10px;
  background: #e7e6e6;
  font-size: 18px;
  width: 70%;
  margin: 0 auto;
}
.tips p,
.answertips p {
  margin: 0;
}
.tips img {
  position: absolute;
  top: -17px;
  right: -22px;
  width: 50px;
}
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.chinese-content {
  height: 280px;
}
</style>