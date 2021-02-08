<template>
  <div class=" d-flex flex-column info-container m-5 p-5">
    <div class="d-flex w-100 justify-content-between mb-3 ">
      <div>
        <div class="d-flex align-items-center mb-2">
          <img class="logo mr-3" src="@/assets/icons/logos/icon_colorful.png" />
          <h3 class="mr-5 mb-0">XLIFF Translate</h3>
        </div>

        <p class="mr-5 mb-0">
          This project was made possible thanks to the amazing work of the open
          source communtity! <br />
          Down below are the open source projects that were used in this project
          🎉
        </p>
      </div>

      <img
        class="x"
        @click="exit()"
        src="@/assets/icons/ui/close_outline.svg"
        alt=""
      />
    </div>
    <div></div>
    <div class="d-flex flex-column w-100 projects">
      <SingleProject
        v-for="project in overlayProjects"
        :key="project.iconName"
        :project="project"
      />
    </div>
  </div>
</template>

<script>
import SingleProject from "@/components/infoOverlay/overlaySingleProject.vue";

export default {
  data() {
    return {
      overlayProjects: [
        {
          name: "Vue.js",
          iconName: "vue.png",
          text: "Amazing progressive framework for building user interfaces.",
          websiteLink: "https://vuejs.org/",
          githubLink: "https://github.com/vuejs/vue"
        },
        {
          name: "BootstrapVue",
          iconName: "bootstrapvue.png",
          text: "Simple bootstrap framework for vue with nice components",
          websiteLink: "https://bootstrap-vue.org/",
          githubLink: "https://github.com/bootstrap-vue/bootstrap-vue"
        },
        {
          name: "Vuex",
          iconName: "vuex.png",
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
.info-container {
  border-radius: 1em;
  background-color: white;
  box-shadow: 0 1em 2em rgba(0, 0, 0, 0.2);
}

.logo {
  height: 1.5em;
  width: 1.5em;
  object-fit: contain;
}

p {
  color: #333;
}

.x {
  width: 1em;
  height: 1em;
  opacity: 0.7;
  object-fit: contain;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
