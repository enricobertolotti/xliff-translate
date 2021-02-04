// Import and initialise vuex
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Import Definitions
import { XLIFFObject, XLIFFStoreObject } from "@/models/xliffDefinitions";

// Import Helpers
import * as lsIO from "@/helpers/localstoreIO.ts";

export default new Vuex.Store({
  state: {
    xliffOBJs: Array<XLIFFStoreObject>()
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
    addXliffOBJ(state, { filename, obj }) {
      state.xliffOBJs.push({ filename: filename, object: obj });
    },
    removeXliffOBJ(state, filename) {
      state.xliffOBJs = state.xliffOBJs.filter(obj => obj.filename != filename);
    },
    updatelocalStore(state, getters) {
      lsIO.localstorageSetIDs(getters.getAllxliffIDs());
    }
  },
  actions: {
    addToDo(context, xliffObj: XLIFFObject) {
      context.commit("addToDo", xliffObj);
    }
  }
});
