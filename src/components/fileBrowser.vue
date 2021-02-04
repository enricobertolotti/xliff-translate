<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <v-list-item v-for="filename in filenames" :key="filename" link>
        <v-list-item-content>
          <v-list-item-title @click="setActiveFile(filename)">
            <v-icon>mdi-file</v-icon>
            {{ filename }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-alert v-if="success" type="success">
        I'm a success alert.
      </v-alert>

      <v-divider class="my-2"></v-divider>

      <v-list-item link color="grey lighten-4">
        <v-list-item-content>
          <input
            type="file"
            id="fileupload"
            ref="xmlFiles"
            hidden
            v-on:change="handleFileUpload()"
          />
          <label for="fileupload">
            <v-icon small color="blue-grey">mdi-upload</v-icon> Upload File
          </label>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { xmlToJSObj } from "@/helpers/xliffParse.ts";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      success: false
    }
  },
  computed: {
    filenames() {
      return this.getAllxliffIDs;
    },
    ...mapGetters(["getAllxliffIDs"])
  },
  methods: {
    async handleFileUpload() {
      // Get file and read text
      const filename = this.$refs.xmlFiles.files[0].name;
      const xliffString = await this.$refs.xmlFiles.files[0].text();

      // Convert string to XLIFF Object
      const xmlObj = xmlToJSObj(xliffString);
      console.log(xmlObj);

      // Upload it to the store
      this.$store.dispatch("addXliffOBJ", {
        filename: filename,
        object: xmlObj
      });

      this.success = true;
      setTimeout(this.resetAlert(), 2000);
    },
    resetAlert() {
      this.success = false;
    },
    setActiveFile(filename) {
      this.setActiveFile(filename);
    },
    ...mapMutations(["setActiveFile"])
  }
};
</script>

<style lang="scss" scoped></style>
