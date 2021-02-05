<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <div class="d-flex w100 mx-4">
        <h2 class="mr-12">Files</h2>
        <input
          type="file"
          id="fileupload"
          ref="xmlFiles"
          multiple
          hidden
          v-on:change="handleFileUpload()"
        />
        <label for="fileupload">
          <v-icon class="button-round ml-5" color="blue lighten-2"
            >mdi-upload</v-icon
          >
        </label>

        <v-btn text icon color="green" @click="downloadAllFiles()">
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-btn text icon color="red" @click="deleteAllFiles()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>

      <v-divider class="my-2"></v-divider>

      <v-list-item v-for="filename in filenames" :key="filename" link>
        <v-list-item-content>
          <v-list-item-title class="d-flex">
            <div class="d-flex" @click="setActiveFile(filename)">
              <v-icon class="ma-0">mdi-file</v-icon>
              <p class="my-auto">{{ filename }}</p>
            </div>

            <v-btn
              class="ml-auto"
              icon
              color="green"
              @click="downloadFile(filename)"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="deleteFile(filename)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { xmlToJSObj } from "@/helpers/xliff/xliffParse.ts";
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
    ...mapGetters(["getAllxliffIDs"])
  },
  methods: {
    async handleFileUpload() {
      // For each file handle the upload
      Promise.resolve(
        this.$refs.xmlFiles.files.forEach(file => {
          fio.uploadFiles(file);
        })
      );
    },
    setActiveFile(filename) {
      this.setActiveFile(filename);
    },
    deleteFile(filename) {
      this.removeXliffOBJ(filename);
    },
    deleteAllFiles() {
      this.deleteAllXliffOBJs();
    },
    downloadFile(filename) {
      fio.downloadFile(filename);
    },
    downloadAllFiles() {
      fio.downloadAllFiles();
    },
    ...mapMutations(["setActiveFile"]),
    ...mapActions(["removeXliffOBJ", "deleteAllXliffOBJs"])
  }
};
</script>

<style lang="scss" scoped>
.button-round {
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
}

.button-round:hover {
  cursor: pointer;
  background-color: rgba($color: #4fc3f7, $alpha: 0.1);
}
</style>
