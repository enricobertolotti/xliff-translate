<template>
    <v-list color="transparent" class="py-8 px-4">
      <div class="d-flex w100 mx-4">
        <h2 class="mr-auto">Files</h2>
        <input
          type="file"
          id="fileupload"
          ref="xmlFiles"
          multiple
          hidden
          v-on:change="handleFileUpload()"
        />
        <label for="fileupload">
          <div class="d-flex button-round">
            <img src="@/assets/icons/ui/upload_outline.svg" class="icon ma-auto">
          </div>
        </label>

        <v-btn text icon color="green" @click="downloadAllFiles()">
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-btn text icon color="red" @click="deleteAllFiles()">
          <img src="@/assets/icons/ui/trash_outline.svg" class="icon">
        </v-btn>
      </div>

      <v-divider class="my-2"></v-divider>

      <v-list-item v-for="filename in filenames" :key="filename" link>
        <v-list-item-content>
          <v-list-item-title class="d-flex">
            <div class="d-flex" @click="setActiveFile(filename)">
              <v-icon class="ma-0">mdi-file</v-icon>
              <p class="my-auto mr-3">{{ filename }}</p>
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
              <img src="@/assets/icons/ui/trash_outline.svg" class="icon">
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</template>

<script>
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
h2 {
  font-family: 'Montserrat', sans-serif;
  color: #255372;
}

.icon {
  height: 1.2em;
  width: 1.2em;
  object-fit: contain;
}

.button-round {
  height: 2.1em;
  width: 2.1em;
  border-radius: 50%;
}

.button-round:hover {
  cursor: pointer;
  background-color: rgba($color: #4fc3f7, $alpha: 0.1);
}
</style>
