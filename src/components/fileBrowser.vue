<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <v-list-item v-for="filename in filenames" :key="filename" link>
        <v-list-item-content>
          <v-list-item-title> {{ filename }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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
import { mapGetters } from "vuex";

export default {
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
      const obj = xmlToJSObj(xliffString);
      console.log(obj);

      // Upload it to the store
      this.$store.dispatch("addXliffOBJ", filename, obj);
      console.log("it got here");
    }
  }
};
</script>

<style lang="scss" scoped></style>
