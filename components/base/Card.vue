<template>
  <v-card
    tile
    text
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-card>
</template>

<script>
  export default {
    name: 'base-card',

    inheritAttrs: false
  }
</script>
