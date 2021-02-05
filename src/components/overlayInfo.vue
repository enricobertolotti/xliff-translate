<template>
  <v-card class="pa-4" width="70vw">
    <div class="d-flex w-100 justify-content-between ma-3">
      <h4 class="">
        Thanks to the amazing, open-source projects that made this possible
      </h4>
      <v-icon class="ml-auto x" color="white" @click="exit()"
        >mdi-close-circle-outline</v-icon
      >
    </div>
    <div>
      <SingleProject
        v-for="project in overlayProjects"
        :key="project.iconName"
        :project="project"
      />
    </div>
  </v-card>
</template>

<script>
import SingleProject from "@/components/overlaySingleProject.vue";

export default {
  data() {
    return {
      overlayProjects: [
        {
          name: "Vue.js",
          iconName: "vue",
          text: "Amazing progressive framework for building user interfaces.",
          websiteLink: "https://vuejs.org/",
          githubLink: "https://github.com/vuejs/vue"
        },
        {
          name: "Vuetify",
          iconName: "vuetify",
          text: "Vue UI Library with beautifully handcrafted Components",
          websiteLink: "https://vuetifyjs.com/en/",
          githubLink: "https://github.com/vuetifyjs/vuetify"
        },
        {
          name: "Vuex",
          iconName: "vuex",
          text:
            "Powerful state management pattern + library for Vue applications",
          websiteLink: "https://vuex.vuejs.org/",
          githubLink: "https://github.com/vuejs/vuex"
        }
      ]
    };
  },
  components: {
    SingleProject
  },
  methods: {
    exit() {
      this.$emit("exit");
    }
  }
};
</script>

<style lang="scss" scoped>
.x {
  opacity: 0.7;
}

.x:hover {
  opacity: 1;
}
</style>
