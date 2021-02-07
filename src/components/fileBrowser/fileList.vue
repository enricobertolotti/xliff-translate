<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="d-flex w-100 justify-content-left">
      <p class="selector">SELECT</p>
    </div>
    <div class="d-flex flex-column w-100">
      <div
        class="d-flex w-100 single-file-row"
        v-for="filename in filenames"
        :key="filename"
        @click="setActiveFile(filename)"
      >
        <SingleFileRow
          :file="{
            active: activeFile == filename,
            filename: filename,
            selected: true
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
// Components
import SingleFileRow from "./singleFileRow.vue";

// Helpers
import { mapGetters, mapMutations, mapActions } from "vuex";
import * as fio from "@/helpers/xliff/fileIO";

export default {
  computed: {
    filenames() {
      return this.getAllxliffIDs;
    },
    activeFile() {
      console.log(this.getActiveFile);
      return this.getActiveFile ? this.getActiveFile.filename : "";
    },
    ...mapGetters(["getAllxliffIDs", "getActiveFile"])
  },
  methods: {
    setActiveFile(filename) {
      this.setActiveFile(filename);
    },
    deleteFile(filename) {
      this.removeXliffOBJ(filename);
    },
    downloadFile(filename) {
      fio.downloadFile(filename);
    },
    downloadAllFiles() {
      fio.downloadAllFiles();
    },
    ...mapMutations(["setActiveFile"]),
    ...mapActions(["removeXliffOBJ"])
  },
  components: {
    SingleFileRow
  }
};
</script>

<style lang="scss" scoped>
.selector {
  font-weight: 500;
  font-size: 0.8em;
  color: lightgray;
  opacity: 0.7;
  transition: all 0.3s ease;

  margin: 0;

  &:hover {
    cursor: pointer;
    color: var(--light-blue);
  }
}

.selectActive {
  color: var(--light-blue) !important;
}

</style>
