<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-sheet height="100%" width="100%" rounded="lg">
      <div class="d-flex align-items-center pa-5">
        <h1>{{ filename }}</h1>
        <LanguageDisplay sourceLang="EN" targetLang="DE" />
        <p v-if="version">{{ version }}</p>
      </div>
    </v-sheet>

    <v-sheet class="mt-3" height="100%" width="100%" rounded="lg">
      <div class="pa-5">
        <div
          class="d-flex flex-column w-100 h-100"
          outlined
          v-for="unit in transunits"
          :key="unit.id"
        >
          <div class="mb-2">
            <h3>ID: {{ unit.id }}</h3>
          </div>
          <div class="d-flex w-100">
            <v-textarea
              class="mr-1"
              :value="unit.source"
              label="Source"
              outlined
              readonly
              auto-grow
              rows="1"
            ></v-textarea>
            <v-textarea
              class="ml-1"
              :value="unit.target"
              label="Target"
              outlined
              auto-grow
              rows="1"
              clearable
            ></v-textarea>
          </div>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LanguageDisplay from "@/components/languageDisplay.vue";

import * as xparse from "@/helpers/xliff/xliffParse.ts";

export default {
  computed: {
    activeFile() {
      return this.getActiveFile;
    },
    filename() {
      return this.activeFile ? this.activeFile.filename : "No file selected";
    },
    version() {
      if (this.activeFile) {
        const version = xparse.getXMLVersion(this.activeFile.object);
        return version ? "XML Version: " + version : "Cannot Read Version";
      } else {
        return null;
      }
    },
    transunits() {
      if (this.activeFile) {
        const units = xparse.getTransUnits(this.activeFile.object);
        console.log(units);
        return units;
      } else {
        return [];
      }
    },
    ...mapGetters(["getActiveFile"])
  },
  methods: {
    getLanguageIcon() {
      return require();
    }
  },
  components: {
    LanguageDisplay
  }
};
</script>

<style lang="scss" scoped></style>
