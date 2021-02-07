<template>
  <div class="d-flex flex-column flex-grow-1 m-3">
    <div v-if="activeFile">
      <FileBar :filename="filename" :version="version" :languages="languages" />
    </div>

    <div class="trans-units">
      <div
        class="d-flex flex-column align-items-start w-100 mb-3"
        outlined
        v-for="(unit, index) in transunits"
        :key="unit.id"
      >
        <div>
          <p class="m-0 mr-3 section-id">{{ unit.id }}</p>
        </div>
        <div class="d-flex w-100">
          <b-form-textarea
            class="mr-1"
            :value="unit.source"
            disabled
            auto-grow
            rows="0"
          ></b-form-textarea>
          <b-form-textarea
            class="ml-1"
            v-model="unit.target"
            @change="saveChange(unit.id, unit.target)"
            auto-grow
            :tabindex="index + 30"
            rows="0"
          ></b-form-textarea>
          <div>
            <img
              id="note-target"
              v-if="unit.note"
              class="note enabled"
              src="@/assets/icons/ui/note_filled_yellow.svg"
            />
            <img
              v-else
              class="note disabled"
              src="@/assets/icons/ui/note_filled.svg"
            />
          </div>

          <b-popover target="note-target" triggers="hover" placement="top">
            <template #title>Note</template>
            {{ unit.note }}
          </b-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import FileBar from "./fileBar.vue";

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
        return version ? "XML: " + version : "Cannot Read Version";
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
    FileBar
    // Comment
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-family: "Montserrat", sans-serif;
  color: #255372;
}

.xml-version {
  font-size: 0.9em;
  opacity: 0.3;
}

.trans-unit {
  margin: 0.9em 1.4em;
}

.disabled-faded {
  opacity: 0.5;
}

.trans-units {
  overflow-y: scroll;
  overflow-x: none;
}

.section-id {
  opacity: 0.3;
}

.note {
  width: 1.3em;
  height: 1.3em;
  margin: 0 0 0 0.5em;
  object-fit: contain;
}

.disabled {
  opacity: 0.1;
}

.enabled {
  &:hover {
    cursor: pointer;
  }
}
</style>
