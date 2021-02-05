<template>
  <v-app id="inspire">
    <v-overlay z-index="100" :value="showOverlay">
      <Overlay @exit="showOverlay = false" />
    </v-overlay>
      <div class="d-flex main-view flex-grow-1 p-4" :class="{ dim: showOverlay }">
        <div class="d-flex interface-container">
          <div class="menu-bar">
            <MenuBar @showInfo="showOverlay=true" />
          </div>
          <div class="d-flex files-container">
            <div class="filebrowser">
            <FileBrowser />
          </div>
          <div class="d-flex flex-grow-1 fileeditor">
            <FileEditor />
          </div>
          </div>
        </div>
      </div>
  </v-app>
</template>

<script>
import FileBrowser from "@/components/fileBrowser.vue";
import FileEditor from "@/components/fileEditor.vue";
import MenuBar from "@/components/menuBar.vue";

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
    MenuBar,
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
:root {
  --darker-blue: #091b23;
  --dark-blue: #255372;
  --blue: #369ce5;
  --light-blue: #3fa3e9;
  --lighter-blue: #eff7fd;
}

.main-view {
  height: 100vh;
  padding: 1.5em;
  background-color: #091b23;
  overflow: hidden;
}

.interface-container {
  height: 100%;
  width: 100%;
  border-radius: 1.8em;
  box-shadow: 1em 0em 2em rgba($color: #000000, $alpha: 0.2);
  background: linear-gradient(#369ce5, #3fa3e9);
}

.menu-bar {
  height: 100%;
  width: 5em;
}

.files-container {
  position: relative;
  z-index: 20;
  width: 100%;
  background-color: white;
  border-radius: 4em;
  box-shadow: 1em 0em 3em rgba($color: #000000, $alpha: 0.3);
}

.text-caption {
  opacity: 0.3;
}

.text-caption:hover {
  cursor: pointer;
}

.filebrowser {
  border-radius: 1.8em 0 0 1.8em;
  background-color: white;
}

.fileeditor {
  border-radius: 0 1.8em 1.8em 0;
  background-color: #eff7fd;
}

.dim {
  opacity: 0.05 !important;
}
</style>
