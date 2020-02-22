<template>
    <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card>
                <v-card-title>เปลี่ยนรหัสผ่าน</v-card-title>
                <v-divider/>
                <v-card-text>
                    <v-form>
                    <v-text-field prepend-icon="mdi-lock" v-model="old_password" label="รหัสผ่านเดิม" type="password"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" v-model="new_password" label="รหัสผ่านใหม่" type="password"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" v-model="confirm_password" label="ยืนยันรหัสผ่านใหม่อีกครั้ง" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="_changePassword()">ตกลง</v-btn>
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
            title:'เปลี่ยนรหัสผ่าน'
        },
        middleware:'authenticated',
        components:{
            rawDisplayer,
        },
        data:()=>{
            return{
                old_password:null,
                new_password:null,
                confirm_password:null
            }
        },
        methods: {
            ...mapActions(['changePassword']),
            _changePassword(){
                this.changePassword({
                    old_password:this.old_password,
                    new_password:this.new_password,
                    confirm_password:this.confirm_password,
                })
                this.old_password=null
                this.new_password=null
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