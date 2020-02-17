<template>
 <!-- style="background-image: url('https://i2.wp.com/www.shorteng.com/wp-content/uploads/2015/12/photo.jpg?resize=470%2C313');" -->
  <v-app>
    <Snackbar/>
    
    <core-toolbar v-if="auth.time" />
    
    <core-drawer v-if="auth.time" />

    <core-view />

    <core-footer v-if="auth.time" />

    <!-- <core-cta v-if="auth.time" /> -->
  </v-app>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState,
    mapActions
  } from 'vuex'
  export default {
    name: 'App',
    components: {
      CoreCta: () => import('@/components/core/Cta'),
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreToolbar: () => import('@/components/core/Toolbar'),
      CoreView: () => import('@/components/core/View'),
      Snackbar: () => import('@/components/core/Snackbar')
    },
    data () {
      return {
      //
      }
    },
    computed: {
      ...mapState(['auth'])
    },
  }
</script>
