<template>
  <v-app id="inspire">
    <v-overlay z-index="100" :value="showOverlay">
      <Overlay @exit="showOverlay = false" />
    </v-overlay>

    <v-app-bar
      app
      color="white"
      flat
      elevation-20
      :class="{ dim: showOverlay }"
    >
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey lighten-3" size="32"></v-avatar>
        <h3 class="t-2">XLIFF Translate</h3>

        <v-spacer></v-spacer>
        <v-btn text @click="showOverlay = true"
          ><v-icon>mdi-information-outline</v-icon></v-btn
        >
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3" :class="{ dim: showOverlay }">
      <div class="d-flex flex-grow-1">
        <div class="filebrowser">
          <FileBrowser />
        </div>
        <div class="d-flex flex-grow-1 fileeditor">
          <FileEditor />
        </div>
      </div>
    </v-main>

    <v-footer color="grey lighten-3" :class="{ dim: showOverlay }">
      <p @click="openPersonalWebsite()" class="ma-auto text-caption">
        © 2021 Enrico Bertolotti
      </p>
    </v-footer>
  </v-app>
</template>

<script>
import FileBrowser from "@/components/fileBrowser.vue";
import FileEditor from "@/components/fileEditor.vue";
import Overlay from "@/components/overlayInfo.vue";

export default {
  data() {
    return {
      showOverlay: false
    };
  },
  components: {
    FileBrowser,
    FileEditor,
    Overlay
  },
  methods: {
    openPersonalWebsite() {
      window.open(
        "http://portfolio-personal-website.s3-website.eu-central-1.amazonaws.com/",
        "_blank"
      );
    }
  },
  mounted() {
    this.$store.commit("initialiseStore");
  }
};
</script>

<style lang="scss" scoped>
.text-caption {
  opacity: 0.3;
}

.text-caption:hover {
  cursor: pointer;
}

.filebrowser {
  margin: 1em 0.5em 1em 1em;
}

.fileeditor {
  margin: 1em 1em 1em 0.5em;
}

.dim {
  opacity: 0.05 !important;
}
</style>
