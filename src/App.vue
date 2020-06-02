<template>
  <v-app id="inspire">
    <v-app-bar app color="#e7334b" dark>
      <v-toolbar-title>Learn Chinese</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="#e7334b" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$store.dispatch("loadSounds");
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@700&display=swap");
@import "assets/app.css";
</style>
