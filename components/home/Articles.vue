<template>
  <section id="feed">
    <feed>
      <slot />
    </feed>
  </section>
</template>

<script>
  import BaseBtn from './../base/Btn';
  export default {
    components: {
      'base-btn':BaseBtn,
      feed: () => import('@/components/Feed')
    }
  }
</script>
