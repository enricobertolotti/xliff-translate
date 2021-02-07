<template>
  <div class="d-flex flex-column p-4 file-browser">
    
    <div class="d-flex w-100">
      <FileBrowserHeader />
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
// Import components
import SingleFileRow from "./singleFileRow.vue";
import FileBrowserHeader from "./fileBrowserHeader";

// Import helpers
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as fio from "@/helpers/xliff/fileIO";

export default {
  data() {
    return {
      success: false
    };
  },
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
    FileBrowserHeader,
    SingleFileRow
  }
};
</script>

<style lang="scss" scoped>
.file-browser {
  min-width: 17em;
}

.icon {
  height: 1.2em;
  width: 1.2em;
  object-fit: contain;
  opacity: 0.7;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
