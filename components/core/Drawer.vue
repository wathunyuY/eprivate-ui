<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    src="http://eprivate.engrdept.com/api/assets/images/profile/menu.png"
    dark
  >
    <v-list>
      <!-- <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item> -->
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">{{auth.payload.fullname}}</v-list-item-title>
          <v-list-item-subtitle>{{auth.payload.username}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        :href="link.href"
        @click="onClick($event, link)"
      >
        <v-list-item-icon>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-text="link.text" />
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="red darken-4" @click="logout" block>ออกจากระบบ ({{auth.payload.fullname}})</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations,
    mapActions,
    mapState
  } from 'vuex'

  export default {
    name: 'CoreDrawer',

    computed: {
      ...mapState(['auth']),
      ...mapGetters(['links']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },

    methods: {
      ...mapActions(['logout']),
      ...mapMutations(['setDrawer']),
      onClick (e, item) {
        e.stopPropagation()

        if (item.to === '/') {
          this.$vuetify.goTo(0)
          this.setDrawer(false)
          return
        }

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href)
        this.setDrawer(false)
      }
    }
  }
</script>
