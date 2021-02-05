<template>
  <div class="d-flex flex-column justify-space-between vertical-row pa-3">
    <img class="d-flex pa-2 mt-2" src="@/assets/icons/ui/logo.svg" />
    <img class=" d-flex pa-4 align-self-end info-icon" @click="showInfo()" src="@/assets/icons/ui/info_outline.svg" />
  </div>
</template>

<script>
  export default {
    methods: {
      showInfo() {
        this.$emit("showInfo");
      }
    }
  }
</script>

<style lang="scss" scoped>
.vertical-row {
  height: 100%;
}

.info-icon {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.info-icon:hover {
  cursor: pointer;
  opacity: 0.9;
}
</style>