<template>
  <div class="d-flex w-100 h-100">
    <img :src="iconPath" />
  </div>
</template>

<script>
export default {
  props: {
    iconName: String
  },
  computed: {
    iconPath() {
      return require(`@/assets/icons/ui/${this.iconName}.svg`);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  max-height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
