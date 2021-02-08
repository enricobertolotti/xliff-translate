<template>
  <v-card class="d-flex w-100 pa-5 ma-3">
    <img class="logo align-self-center mr-2" :src="imageURL" :alt="project.name" />
    <div class="d-flex flex-column text-container">
      <h5 class="title">{{ project.name }}</h5>
      <p class="description">{{ project.text }}</p>
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
        ? require(`@/assets/icons/logos/${this.project.iconName}`)
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

.text-container {
  margin: 1em 0.4em;
}

.title {
  margin: 0 5em 0.1em 0;
  opacity: 0.8;
}

.description {
  opacity: 0.5;
  margin: 0 5em 0 0;
}

.link {
  opacity: 0.7;

  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
}
</style>
