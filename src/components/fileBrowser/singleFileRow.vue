<template>
  <div
    class="d-flex align-items-center w-100 row"
    :class="{ active: file.active }"
  >
    <p class="filename mb-0 mr-5 " :class="{ active: file.active }">
      {{ file.filename }}
    </p>
    <div class="ml-auto file-right-arrow">
      <svg-icon v-if="file.active" iconName="arrow_right_blue" />
      <svg-icon v-else iconName="arrow_right" />
    </div>
  </div>
</template>

<script>
import svgIcon from "@/components/micro/svgIcon.vue";
export default {
  components: { svgIcon },
  name: "single-file-row",
  props: {
    file: {
      active: Boolean,
      filename: String,
      selected: Boolean
    }
  },
  computed: {
    rightArrow() {
      return this.active
        ? require(`@/assets/icons/ui/arrow_right.svg`)
        : require(`@/assets/icons/ui/arrow_right.svg`);
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: var(--light-blue) !important;
  background-color: var(--lighter-blue);
}

.filename {
  color: rgba(0, 0, 0, 0.5);
}

.row {
  border-radius: 0.5em;
  margin: 0.3em 0;
  padding: 0.2em 0.6em;

  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: var(--lighter-blue);
  }
}

.file-right-arrow {
  height: 0.8em;
  width: 0.8em;
  opacity: 0.5;
}
</style>
