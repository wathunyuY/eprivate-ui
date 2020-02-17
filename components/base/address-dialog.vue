<template>
    <v-dialog v-model="address_dialog">
      <v-card>
        <v-card-title class="headline">ค้นหาที่อยู่ {{address}}</v-card-title>
        <v-card-text>
            <Address v-model="address"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="address_dialog = false">ยกเลิก</v-btn>
          <v-btn color="green darken-1" text @click="ok">ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
  } from 'vuex'
  import Address from './../base/smart-address'
    export default {
        name: 'AddressDialog',
        props:['value','alert'],
        components:{
            Address
        },
        data: () => ({
            address:null,
            address_dialog:false
        }),
        methods: {
            ok(){
                this.$emit('input', this.address)
                this.address_dialog = false
                // this.toggleAddressDilog();
            },
            // ...mapMutations(['toggleAddressDilog']),
        },
        async mounted(){
        },
        computed: {
            // ...mapState(['address_dialog'])
        },
        watch:{
            alert(v){
                this.address_dialog = this.$props.alert
            }
        }
    }
</script>