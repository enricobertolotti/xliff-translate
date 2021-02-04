<template>
  <div class="d-flex align-items-center ma-4">
    <img
      class="langIcon align-self-center"
      v-if="sourceIcon"
      :src="sourceIcon"
    />
    <p class="ma-0 align-self-center">{{ sourceLang }}</p>
    <v-icon medium>mdi-chevron-right</v-icon>
    <img
      class="langIcon align-self-center"
      v-if="targetIcon"
      :src="targetIcon"
    />
    <p class="ma-0 align-self-center">{{ targetLang }}</p>
  </div>
</template>

<script>
import { iconLookup } from "@/helpers/icons/iconMap.ts";
export default {
  props: {
    sourceLang: String,
    targetLang: String,
  },
  computed: {
    sourceIcon() {
      const iconName = iconLookup(this.sourceLang);
      console.log();
      return iconName ? require(`@/assets/icons/countries/united-states-of-america.svg`) : null;
    },
    targetIcon() {
      const iconName = iconLookup(this.targetLang);
      return iconName
        ? require(`@/assets/icons/countries/${iconName}.svg`)
        : null;
    },
  },
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
