<template>
  <div>
    <!-- <v-navigation-drawer
      permanent
      expand-on-hover
      fixed
      app
      clipped
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">Sandra Adams</v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar
      app
      text
      dark
      color="green darken-1"
      src="http://eprivate.engrdept.com/api/assets/images/profile/header.png"
    >
      <!-- <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="toggleDrawer"
      /> class="hidden-md-and-up"-->
      <v-app-bar-nav-icon  @click="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>ระบบฐานข้อมูลหน่วยฝึกทหารใหม่ พัน.บร.กบร.กช.</v-toolbar-title>
      <v-spacer />
      <v-btn text @click="logout" class="ml-0 hidden-sm-and-down">
        ({{auth.payload.fullname}}) ออกจากระบบ
        <v-icon right dark>mdi-logout</v-icon>
      </v-btn>
      <!-- <v-container
        mx-auto
        py-0
      >
        <v-layout>
          <v-img
            :src="require('@/assets/logo.png')"
            class="mr-5"
            contain
            height="48"
            width="48"
            max-width="48"
            @click="$vuetify.goTo(0)"
          />
          <v-row justify="center">
            <div class="display-1">ระบบฐานข้อมูลหน่วยฝึกทหารใหม่ พัน.บร.กบร.กช.</div>
          </v-row>
        </v-layout>
      </v-container> -->
      <template v-slot:extension>
        <v-layout>
          <v-row justify="center">
            <v-btn
              v-for="(link, i) in links_for_header"
              :key="i"
              :to="link.to"
              class="ml-0 hidden-sm-and-down font-weight-bold"
              text
              @click="onClick($event, link)"
            >
              {{ link.text }}
            </v-btn>
          </v-row>
        </v-layout>
        
      </template>
    </v-app-bar>
  </div>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations,
    mapState,
    mapActions
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['links_for_header']),
      ...mapState(['auth'])
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      ...mapActions(['logout']),
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href)
      }
    }
  }
</script>
