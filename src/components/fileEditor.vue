<template>
  <v-sheet class="m-2" height="100%" rounded="lg">
    <div class="pa-3">
      <h1>{{ filename }}</h1>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    activeFile() {
      return this.getActiveFile;
    },
    filename() {
      return this.activeFile ? this.activeFile.filename : "No file selected";
    },
    ...mapGetters(["getActiveFile"])
  }
};
</script>

<style lang="scss" scoped></style>
