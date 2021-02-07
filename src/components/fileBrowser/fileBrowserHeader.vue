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
        @click="showDeleteWarning = true"
        data-toggle="tooltip"
        placement="auto"
        title="Delete all XML files"
      >
        <svg-icon iconName="trash_outline" />
      </div>
    </div>
    <b-collapse id="collapse-4" v-model="showDeleteWarning" class="mt-2">
      <div class="w-100 deleteWarning bg-danger text-white">
        <div class="d-flex justify-content-center w-100 deleteWarningText">
          <p class="m-0 mb-1">
            Are you sure you want <br />
            to delete all files?
          </p>
        </div>
        <div class="d-flex w-100">
          <b-button
            class="btn btn-light d-flex w-100 justify-content-center mr-1"
            @click="showDeleteWarning = false"
            >No</b-button
          >
          <b-button
            class=" btn btn-danger d-flex w-100 justify-content-center ml-1 border-light"
            @click="deleteAllFiles()"
            >Yes</b-button
          >
        </div>
      </div>
    </b-collapse>
    <div class="d-flex w-100 my-2">
      <divider />
    </div>
  </div>
</template>

<script>
import * as fio from "@/helpers/xliff/fileIO";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showDeleteWarning: false
    };
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
    deleteAllFiles() {
      this.showDeleteWarning = false;
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
.deleteWarning {
  border-radius: 0.5em;
  background-color: rgb(206, 0, 0);
  padding: 0.5em;
}

.deleteWarningText {
  text-align: center;
  padding: 0;
  margin: 0;
  color: white;
}

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
