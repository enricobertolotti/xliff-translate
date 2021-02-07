<template>
  <div class="d-flex w-100 h-100 justify-content-center align-items-center">
    <div v-if="noFiles">
      <p>
        Hi there 👋 <br />
        Upload some files to get started
      </p>
    </div>
    <div v-else>
      <p>
        Awesome 🎉 <br />
        Select a file in the file editor to start translating!
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    noFiles() {
      return this.getAllxliffs.length == 0;
    },
    ...mapGetters(["getAllxliffs"])
  }
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  color: #666666;
}
</style>
