// Import and initialise vuex
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Import Definitions
import { XLIFFObject, XLIFFStoreObject } from "@/models/xliffDefinitions";

// Import Helpers
import * as lsIO from "@/helpers/xliff/localstoreIO";

export default new Vuex.Store({
  state: {
    xliffOBJs: Array<XLIFFStoreObject>(),
    activeFile: ""
  },

  getters: {
    getAllxliffIDs(state): Array<string> {
      return state.xliffOBJs.map(object => object.filename);
    },
    getAllxliffOBJs(state): Array<XLIFFObject> {
      return state.xliffOBJs.map(object => object.object);
    },
    getAllxliffs(state): Array<XLIFFStoreObject> {
      return state.xliffOBJs;
    },
    getActiveFile(state): XLIFFStoreObject | null {
      const activeFile = state.xliffOBJs.filter(
        obj => obj.filename == state.activeFile
      )?.[0];
      return activeFile ? activeFile : null;
    },
    getXliffStoreObj: state => (filename: string): XLIFFStoreObject | null => {
      console.log("Store: ", filename);
      const obj = state.xliffOBJs.find(obj => obj.filename == filename);
      console.log("Store: ", obj);
      return obj ? obj : null;
    }
  },

  mutations: {
    initialiseStore(state) {
      const xliffIDs = lsIO.localstorageGetIDs();
      const xliffStoreObjs = Array<XLIFFStoreObject>();

      // Loop through IDs and load object associated with it
      if (xliffIDs) {
        xliffIDs.forEach(filename => {
          const xliffObj = lsIO.localstorageLoadOBJ(filename);
          if (xliffObj != null) {
            xliffStoreObjs.push({
              filename: filename,
              object: xliffObj
            });
          }
        });
      }

      state.xliffOBJs = xliffStoreObjs;
    },
    addXliffOBJ(state, { filename, object }) {
      state.xliffOBJs.push({ filename: filename, object: object });
    },
    removeXliffOBJ(state, filename) {
      state.xliffOBJs = state.xliffOBJs.filter(obj => obj.filename != filename);
    },
    updatelocalStore(state) {
      lsIO.localstorageSetIDs(state.xliffOBJs.map(obj => obj.filename));
    },
    setActiveFile(state, filename: string): void {
      state.activeFile = filename;
    },
    clearActiveFile(state): void {
      state.activeFile = "";
    }
  },
  actions: {
    addXliffOBJ(context, { filename, object }) {
      // Add it to store
      context.commit("addXliffOBJ", { filename: filename, object: object });
      // Add it to localstorage
      lsIO.localstorageAddOBJ(filename, object);
      // Update localstorage
      context.commit("updatelocalStore");
    },
    removeXliffOBJ(context, filename) {
      // Remove it from store
      context.commit("removeXliffOBJ", filename);
      // Remove it from localstorage
      lsIO.localstorageRemoveOBJ(filename);
      // Update localstorage
      context.commit("updatelocalStore");
      // console.log("[Store] removed", filename);
    },
    deleteAllXliffOBJs(context) {
      const allIDs: Array<string> = context.getters.getAllxliffIDs;
      allIDs.forEach(filename => {
        context.dispatch("removeXliffOBJ", filename);
      });
    }
  }
});
