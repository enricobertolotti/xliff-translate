<template>
  <div class="d-flex flex-column w-100 header-container">
    <div class="d-flex w-100 align-items-center">
      <h2 class="d-flex m-0 mr-auto">Files</h2>
      <input
        type="file"
        id="fileupload"
        ref="xmlFiles"
        multiple
        hidden
        v-on:change="handleFileUpload()"
      />
      <label for="fileupload" class="m-0">
        <div
          class="icon mr-3"
          data-toggle="tooltip"
          placement="auto"
          title="Upload files"
        >
          <svg-icon iconName="upload_outline" />
        </div>
      </label>

      <div
        class="icon mr-3"
        @click="downloadAllFiles()"
        data-toggle="tooltip"
        placement="auto"
        title="Download all files as a .zip file"
      >
        <svg-icon iconName="download_outline" />
      </div>

      <div
        class="icon"
        @click="deleteAllFiles()"
        data-toggle="tooltip"
        placement="auto"
        title="Delete all XML files"
      >
        <svg-icon iconName="trash_outline" />
      </div>
    </div>
    <div class="d-flex w-100 my-2">
      <divider />
    </div>
  </div>
</template>

<script>
import * as fio from "@/helpers/xliff/fileIO";
import { mapActions } from "vuex";

export default {
  methods: {
    async handleFileUpload() {
      // For each file handle the upload
      Promise.resolve(
        this.$refs.xmlFiles.files.forEach(file => {
          fio.uploadFiles(file);
        })
      );
    },
    deleteAllFiles() {
      this.deleteAllXliffOBJs();
    },
    downloadAllFiles() {
      fio.downloadAllFiles();
    },
    ...mapActions(["deleteAllXliffOBJs"])
  }
};
</script>

<style lang="scss" scoped>

.icon {
  height: 1.2em;
  width: 1.2em;
  object-fit: contain;
  opacity: 0.5;

  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
