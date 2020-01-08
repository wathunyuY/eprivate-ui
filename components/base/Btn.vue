<template>
  <v-btn
    fab
    small
    color="primary"
    :style="styles"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
  export default {
    name: 'base-btn',

    inheritAttrs: false,

    props: {
      square: Boolean
    },

    computed: {
      styles () {
        return {
          borderRadius: this.square ? '2px' : undefined
        }
      }
    }
  }
</script>
