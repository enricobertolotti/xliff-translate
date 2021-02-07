<template>
  <div class="d-flex justify-content-between pb-3">
    <div class="d-flex flex-column">
      <h2 class="m-0">{{ filename }}</h2>
      <p class="m-0 xml-version font-italic" v-if="version">
        {{ version }}
      </p>
    </div>
    <div class="d-flex">
      <LanguageDisplay class="ml-auto my-auto" :languages="languages" />
    </div>
  </div>
</template>

<script>
import LanguageDisplay from "@/components/languageDisplay.vue";

export default {
  props: {
    filename: String,
    version: String,
    languages: {
      source: String,
      target: String
    }
  },
  components: {
    LanguageDisplay
  }
};
</script>

<style lang="scss" scoped></style>
