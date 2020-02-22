<template>
    <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card>
                <v-card-title>E-Private</v-card-title>
                <v-divider/>
                <v-card-text>
                    <v-form>
                    <v-text-field prepend-icon="mdi-account" v-model="username" label="ชื่อผู้ใช้" type="text"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" v-model="password" label="รหัสผ่าน" id="password" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="postLogin">เข้าสู่ระบบ</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          
      </v-container>
</template>
<script>
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
  } from 'vuex'
export default {
    head:{
        title:'เข้าสู่ระบบ'
    },
    data:()=>{
        return{
            username:null,
            password:null
        }
    },
    methods:{
        ...mapActions(['login']),
        postLogin(){
            this.login({username:this.username,password:this.password})
        }
    },
    computed:{
        ...mapState(['auth']),
    }
}
</script>