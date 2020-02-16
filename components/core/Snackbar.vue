<template>
    <v-snackbar
      v-model="snackbar"
      :timeout="6000"
      :top="'top'"
      >
      {{snackbar_mesage}}
      <v-btn
          :color="snackbar_color"
          text
          icon
          @click="snackbar = false"
      >
          <v-icon>{{snackbar_icon}}</v-icon>
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  name:'Snackbar',
  data() {
    return {
      snackbar_mesage:'',
      snackbar:false,
      snackbar_color:'',
      snackbar_icon:''
    }
  },
  mounted () {
    
  },
  created:function(){
    this.$store.watch(state=>state.snackbar.show,()=>{
      if(this.$store.state.snackbar.show){
        this.snackbar = true
        this.snackbar_mesage = this.$store.state.snackbar.message
        this.snackbar_color = this.$store.state.snackbar.color
        this.snackbar_icon = this.$store.state.snackbar.icon
        this.$store.commit('setSnackbar',false)
      }
    })
  },
  methods:{
    // logout() {
    //   Cookie.remove('auth')
    //   Cookie.remove('menu_type')
    //   this.$store.commit('setAuth', null)
    //   this.$store.commit('menuType', null)
    //   this.$router.push('/login')
    // }
  }

}
</script>