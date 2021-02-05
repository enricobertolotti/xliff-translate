<template>
  <div>
    <div class="d-flex align-items-center ma-4">
      <img
        class="langIcon align-self-center"
        v-if="sourceIcon"
        :src="sourceIcon"
      />
      <p class="ma-0 align-self-center">{{ languages.source }}</p>
      <v-icon medium>mdi-chevron-right</v-icon>
      <img
        class="langIcon align-self-center"
        v-if="targetIcon"
        :src="targetIcon"
      />
      <p class="ma-0 align-self-center">{{ languages.target }}</p>
    </div>
  </div>
</template>

<script>
import { iconLookup } from "@/helpers/icons/iconMap.ts";
export default {
  props: {
    languages: {
      source: "",
      target: ""
    }
  },
  computed: {
    sourceIcon() {
      return this.languages ? this.getIcon(this.languages.source) : "";
    },
    targetIcon() {
      return this.languages ? this.getIcon(this.languages.target) : "";
    }
  },
  methods: {
    getIcon(languageCode) {
      const iconName = iconLookup(languageCode);
      return iconName
        ? require(`@/assets/icons/countries/${iconName}.svg`)
        : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.langIcon {
  width: 1.2em;
  height: 1.2em;
  margin: 0.5em;
  object-fit: contain;
}
</style>
