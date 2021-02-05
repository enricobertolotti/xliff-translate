<template>
  <v-card class="d-flex w-100 pa-5 ma-3">
    <img class="logo align-self-center" :src="imageURL" :alt="project.name" />
    <div class="d-flex flex-column ml-3">
      <h3 class="ma-0">{{ project.name }}</h3>
      <p class="grey--text ma-0">{{ project.text }}</p>
    </div>
    <img
      class="project-image ml-auto link align-self-center"
      @click="openLink('github')"
      src="@/assets/icons/logos/github.svg"
      alt="Github"
    />
    <img
      class="project-image ml-2 link align-self-center"
      @click="openLink('website')"
      src="@/assets/icons/logos/website.svg"
      alt="Website"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    project: null
  },
  computed: {
    imageURL() {
      return this.project
        ? require(`@/assets/icons/logos/${this.project.iconName}.svg`)
        : "";
    }
  },
  methods: {
    openLink(website) {
      if (website == "github") {
        window.open(this.project.githubLink, "_blank");
      } else if (website == "website") {
        window.open(this.project.websiteLink, "_blank");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  height: 2.5em;
  width: 2.5em;
  padding: 0.5em;
}

.project-image {
  height: 1.6em;
  width: 1.6em;
  object-fit: contain;
}

.link {
  opacity: 0.7;
}

.link:hover {
  cursor: pointer;
  opacity: 0.9;
}
</style>
