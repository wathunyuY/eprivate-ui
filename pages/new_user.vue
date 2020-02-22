<template>
    <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card>
                <v-card-title>เพิ่มผู้ใช้งาน</v-card-title>
                <v-divider/>
                <v-card-text>
                    <v-form>
                    <v-text-field prepend-icon="mdi-lock" v-model="fullname" label="ชื่อ-สกุล" ></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" v-model="username" label="ชื่อผู้ใช้" ></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" v-model="password" label="รหัสผ่าน" type="password"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" v-model="confirm_password" label="ยืนยันรหัสผ่านอีกครั้ง" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="_newUser">ตกลง</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          
      </v-container>
</template>

<script>
import rawDisplayer from './../components/base/raw-displayer'
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
  } from 'vuex'
    export default {
        head:{
            title:'เพิ่มผู้ใช้งาน'
        },
        middleware:'authenticated',
        components:{
            rawDisplayer,
        },
        data:()=>{
            return{
                fullname:null,
                username:null,
                password:null,
                confirm_password:null
            }
        },
        methods: {
            ...mapActions(['newUser']),
            _newUser(){
                this.newUser({
                    fullname:this.fullname,
                    username:this.username,
                    password:this.password,
                    confirm_password:this.confirm_password,
                })
                this.fullname=null
                this.username=null
                this.password=null
                this.confirm_password=null
            }
        },
        computed: {
        // ...mapState(['person_json']),
        },
        created(){
        }
        
    }
</script>
s