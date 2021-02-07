<template>
  <div class="d-flex flex-column justify-content-between vertical-row h-100">
    <img class="d-flex" src="@/assets/icons/ui/logo.svg" />
    <img
      class=" d-flex info-icon"
      @click="showInfo()"
      src="@/assets/icons/ui/info_outline.svg"
    />
  </div>
</template>

<script>
export default {
  methods: {
    showInfo() {
      this.$emit("showInfo");
    }
  }
};
</script>

<style lang="scss" scoped>
.vertical-row {
  padding: 1.5em 1em 1em 1em;
}

.info-icon {
  padding: 0.5em;
  opacity: 0.6;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
}
</style>
