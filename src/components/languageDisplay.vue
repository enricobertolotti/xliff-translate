<template>
  <div>
    <div class="d-flex align-items-center">
      <img class="icon" v-if="sourceIcon" :src="sourceIcon" />
      <p class="m-0 ml-2">{{ languages.source }}</p>
      <div class="icon ml-2">
        <svg-icon iconName="arrow_right" />
      </div>
      <img class="icon ml-2" v-if="targetIcon" :src="targetIcon" />
      <p class="m-0 ml-2">{{ languages.target }}</p>
    </div>
  </div>
</template>

<script>
import { iconLookup } from "@/helpers/icons/iconMap.ts";
import svgIcon from "./micro/svgIcon.vue";
export default {
  components: { svgIcon },
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
.icon {
  width: 1.2em;
  height: 1.2em;
  object-fit: contain;
}
</style>
