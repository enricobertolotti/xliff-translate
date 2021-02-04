<template>
  <div class="d-flex align-items-center">
    <!-- <v-img v-if="sourceIcon" src="sourceIcon"></v-img> -->
    <p class="ma-0 align-self-center">{{ sourceLang }}</p>
    <v-icon medium>mdi-chevron-right</v-icon>
    <img class="langIcon align-self-center" v-if="targetIcon" src="targetIcon" />
    <p class="ma-0 align-self-center">{{ targetLang }}</p>
  </div>
</template>

<script>
import { iconLookup } from "@/helpers/icons/iconMap.ts";
export default {
  props: {
    sourceLang: String,
    targetLang: String
  },
  computed: {
    sourceIcon() {
      const iconName = iconLookup(this.sourceLang);
      return iconName
        ? require(`@/assets/icons/countries/${iconName}.svg`)
        : null;
    },
    targetIcon() {
      const iconName = iconLookup(this.targetLang);
      return iconName
        ? require(`@/assets/icons/countries/${iconName}.svg`)
        : null;
    }
  }
};
</script>

<style lang="scss" scoped>

.langIcon {
  width: 1.2em;
  height: 1.2em;
  object-fit: contain;
}

</style>
