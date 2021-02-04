<template>
  <div class="d-flex w-100 h-100">
    <input type="file" id="file" ref="xmlFiles" multiple v-on:change="handleFileUpload()"/>
    <div class="d-flex flex-column" v-for="(file, index) in files" :key="index">
      <h1 >{{file[0]}}</h1>
      <p>XML Version: {{getVersion(file[1])}}</p>
      <p>Translation: {{getLanguages(file[1])}}</p>
    </div>
    <h3></h3>
    <!-- <button @click="downloadFile()">Download</button> -->
  </div>
</template>

<script>

  // Import store items
  import { mapGetters, mapActions } from 'vuex'

  // Import parsers
  import * as xliff from "@/components/Tools/Helpers/xliffParser.js"

  export default {
    computed: {
      files() {
          return this.getAllxliffs
      },
      
      ...mapGetters("xliffStore", [
        'getAllxliffs'
      ])
    },
    methods: {
      getFile(filename) {
        console.log("getting files", filename)
        const tempFile = this.files.filter(xliff => xliff[0] === filename)[0][1]
        console.log(tempFile)
        return tempFile
      },
      getVersion(file) {
        return xliff.getXMLVersion(file)
      },
      getLanguages(file) {
        return xliff.getXliffLanguages(file)
      },
      async handleFileUpload(){
        const filename = this.$refs.xmlFiles.files[0].name
        const res = await this.$refs.xmlFiles.files[0].text()
        const obj = xliff.xmlToJSObj(res)

        // Upload it to the store
        this.addXliffOBJ({filename: filename, obj: obj})
        console.log("it got here")
      },
      downloadFile(){
        const objectURL = URL.createObjectURL(this.file)
        const filename = this.name + ".xml"

        const element = document.createElement('a');
        element.style = "display: none";
        document.body.appendChild(element);
        
        element.href = objectURL;
        element.download = filename;
        element.click();
        window.URL.revokeObjectURL(objectURL)
      },
      ...mapActions("xliffStore", [
        'addXliffOBJ'
      ])
    },
    mounted() {
      this.$store.commit('xliffStore/initialiseStore')
    }
  }
</script>

<style lang="scss" scoped>

</style>