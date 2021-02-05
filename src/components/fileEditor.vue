<template>
  <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-items-center pa-5">
        <div class="d-flex flex-column">
          <h1 class="ma-0">{{ filename }}</h1>
          <p class="ma-0 xml-version font-italic" v-if="version">
            {{ version }}
          </p>
        </div>
        <LanguageDisplay
          v-if="activeFile"
          class="ml-auto"
          :languages="languages"
        />
      </div>

      <div class="pa-5">
        <div
          class="d-flex flex-column w-100"
          outlined
          v-for="(unit, index) in transunits"
          :key="unit.id"
        >
          <div class="mb-2">
            <h5 class="grey--text">ID: {{ unit.id }}</h5>
          </div>
          <div class="d-flex w-100">
            <v-textarea
              class="mr-1"
              :value="unit.source"
              label="Source"
              outlined
              disabled
              auto-grow
              dense
              rows="0"
            ></v-textarea>
            <v-textarea
              class="ml-1"
              v-model="unit.target"
              @change="saveChange(unit.id, unit.target)"
              label="Target"
              outlined
              auto-grow
              :tabindex="index + 30"
              rows="0"
              dense
            ></v-textarea>
            <v-menu offset-y top left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="amber"
                  icon
                  :disabled="!unit.note"
                  :class="{ 'disabled-faded': !unit.note }"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-message-bulleted</v-icon>
                </v-btn>
              </template>
              <Comment :text="unit.note" />
            </v-menu>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import LanguageDisplay from "@/components/languageDisplay.vue";
import Comment from "@/components/comment.vue";

import * as xparse from "@/helpers/xliff/xliffParse.ts";

export default {
  data() {
    return {
      showNote: false
    };
  },
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
    languages() {
      if (this.activeFile) {
        const langs = xparse.getXliffLanguages(this.activeFile.object);
        if (langs) {
          return langs;
        }
      }
      return { source: "", target: "" };
    },
    ...mapGetters(["getActiveFile"])
  },
  methods: {
    saveChange(unitID, unitText) {
      this.updateField({
        filename: this.activeFile.filename,
        unitID: unitID,
        unitText: unitText
      });
    },
    ...mapActions(["updateField"])
  },
  components: {
    LanguageDisplay,
    Comment
  }
};
</script>

<style lang="scss" scoped>
.xml-version {
  font-size: 0.9em;
  opacity: 0.3;
}

.disabled-faded {
  opacity: 0.5;
}
</style>
