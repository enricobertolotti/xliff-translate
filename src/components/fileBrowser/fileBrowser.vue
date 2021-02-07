<template>
  <div class="d-flex flex-column p-4 file-browser">
    <div class="d-flex w-100">
      <FileBrowserHeader />
    </div>

    <div class="d-flex w-100 flex-grow-1">
      <FileList />
    </div>
  </div>
</template>

<script>
// Import components
import FileBrowserHeader from "./fileBrowserHeader.vue";
import FileList from "./fileList.vue";

export default {
  components: {
    FileBrowserHeader,
    FileList
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
