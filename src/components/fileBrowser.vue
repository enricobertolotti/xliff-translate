<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <div class="d-flex w100 mx-4">
        <h2 class="mr-12">Files</h2>
        <input
          type="file"
          id="fileupload"
          ref="xmlFiles"
          hidden
          v-on:change="handleFileUpload()"
        />
        <label for="fileupload">
            <v-icon class="button-round ml-5" color="blue lighten-2" >mdi-upload</v-icon>
        </label>

        <v-btn text icon color="red" @click="deleteAll()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>

      <v-divider class="my-2"></v-divider>

      <v-list-item v-for="filename in filenames" :key="filename" link>
        <v-list-item-content>
          <v-list-item-title class="d-flex">
            <div class="d-flex"  @click="setActiveFile(filename)">
              <v-icon>mdi-file</v-icon>
              <p>{{ filename }}</p>
            </div>
            
            <v-btn
              class="ml-auto"
              icon
              color="red"
              @click="deleteFile(filename)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-alert v-if="success" type="success">
        I'm a success alert.
      </v-alert>
    </v-list>
  </v-sheet>
</template>

<script>
import { xmlToJSObj } from "@/helpers/xliff/xliffParse.ts";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      success: false,
    };
  },
  computed: {
    filenames() {
      return this.getAllxliffIDs;
    },
    ...mapGetters(["getAllxliffIDs"]),
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
    deleteFile(filename) {
      this.removeXliffOBJ(filename);
    },
    ...mapMutations(["setActiveFile"]),
    ...mapActions(["removeXliffOBJ"])
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
  background-color: rgba($color: #4FC3F7, $alpha: 0.1);
}

</style>
