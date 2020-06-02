import Vue from 'vue';
import Vuex from 'vuex';
import questionSound from "@/assets/audio/question.mp3";
import tipsSound from "@/assets/audio/tipshow.wav";
import hoverSound from "@/assets/audio/mouseover.wav";
import clickSound from "@/assets/audio/mouseclick.wav";
import letsGoSound from "@/assets/audio/letsgo.wav";
import correctAnswerSound from "@/assets/audio/correctanswer.wav";
import highlightSound from "@/assets/audio/highlight.wav";
import suggestionSound from "@/assets/audio/suggestion.mp3";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sounds: {},
    },
    mutations: {
        SET_SOUND(state, sounds) {
            state.sounds = sounds;
        }
    },
    actions: {
        async loadSounds(context) {
            const question = await new Audio(questionSound);
            const tips = await new Audio(tipsSound);
            const hover = await new Audio(hoverSound);
            const click = await new Audio(clickSound);
            const letsGo = await new Audio(letsGoSound);
            const correctAnswer = await new Audio(correctAnswerSound);
            const highlight = await new Audio(highlightSound);
            const suggestion = await new Audio(suggestionSound);
            context.commit('SET_SOUND', {
                question,
                tips,
                hover,
                click,
                letsGo,
                correctAnswer,
                highlight,
                suggestion
            });
        }
    }
})

export default store;