<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>{{ text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    text: String
  }
};
</script>

<style lang="scss" scoped></style>
