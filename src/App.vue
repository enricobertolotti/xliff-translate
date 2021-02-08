<template>
  <div>
    <!-- Modal Overlay -->
    <transition name="fade">
      <div
        v-if="showOverlay"
        class="d-flex infoOverlay justify-content-center align-items-center"
      >
        <InfoOverlay @exit="showOverlay = false" />
      </div>
    </transition>

    <!-- Main Screen -->
    <div class="d-flex main-view flex-grow-1 p-4">
      <div class="d-flex interface-container">
        <div class="menu-bar h-100">
          <MenuBar @showInfo="showOverlay = true" />
        </div>
        <div class="d-flex files-container">
          <div class="filebrowser">
            <FileBrowser />
          </div>
          <div class="d-flex flex-grow-1 fileeditor">
            <FileEditor v-if="activeFile" />
            <NoFile v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileBrowser from "@/components/fileBrowser/fileBrowser.vue";
import NoFile from "@/components/fileEditor/nofile.vue";
import FileEditor from "@/components/fileEditor/fileEditor.vue";
import MenuBar from "@/components/menuBar.vue";
import InfoOverlay from "@/components/infoOverlay/infoOverlay.vue";

import { mapGetters } from "vuex";

// import Overlay from "@/components/overlayInfo.vue";

export default {
  data() {
    return {
      showOverlay: false
    };
  },
  computed: {
    activeFile() {
      return this.getActiveFile != null;
    },
    ...mapGetters(["getActiveFile"])
  },
  methods: {
    openPersonalWebsite() {
      window.open(
        "http://portfolio-personal-website.s3-website.eu-central-1.amazonaws.com/",
        "_blank"
      );
    }
  },
  components: {
    FileBrowser,
    FileEditor,
    NoFile,
    MenuBar,
    InfoOverlay
  },
  mounted() {
    this.$store.commit("initialiseStore");
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap");

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
  background: linear-gradient(var(--light-blue), var(--blue));
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
  background-color: #f5f8fb;
}

.infoOverlay {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

::-webkit-scrollbar {
  display: none;
}

// Animation Keyframes
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
