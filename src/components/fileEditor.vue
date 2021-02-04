<template>
  <v-sheet class="m-2" height="100%" rounded="lg">
    <div class="pa-3">
      <h1>{{ filename }}</h1>
      <p v-if="languages">{{ languages }}</p>
      <p v-if="version">{{ version }}</p>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

import * as xparse from "@/helpers/xliffParse.ts";

export default {
  computed: {
    activeFile() {
      return this.getActiveFile;
    },
    filename() {
      return this.activeFile ? this.activeFile.filename : "No file selected";
    },
    languages() {
      if (this.activeFile) {
        const languages = xparse.getXliffLanguages(this.activeFile.object);
        return languages
          ? languages.source + " => " + languages.target
          : "Cannot Read Languages";
      } else {
        return null;
      }
    },
    version() {
      if (this.activeFile) {
        const version = xparse.getXMLVersion(this.activeFile.object);
        return version ? "XML Version: " + version : "Cannot Read Version";
      } else {
        return null;
      }
    },
    ...mapGetters(["getActiveFile"])
  },
  methods: {
    getLanguageIcon() {
      return require();
    }
  }
};
</script>

<style lang="scss" scoped></style>
