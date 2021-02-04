<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat elevation-20>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
        <h3>XLIFF Translate</h3>

        <v-spacer></v-spacer>
        <v-btn text>About</v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container class="ma-0">
        <v-row>
          <v-col cols="3">
            <FileBrowser />
          </v-col>

          <v-col min-height="70vh">
            <FileEditor />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import FileBrowser from "@/components/fileBrowser.vue";
import FileEditor from "@/components/fileEditor.vue";

export default {
  components: {
    FileBrowser,
    FileEditor
  },
  mounted() {
    this.$store.commit("initialiseStore");
  }
};
</script>
