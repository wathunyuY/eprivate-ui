<template>
    <v-autocomplete
        v-model="address"
        label="ตำบล/แขวง , อำเภอ/เขต , จังหวัด , รหัสไปรษณี"
        required
        :items="getAddressText"
        item-text="text"
        item-value="id"
        :loading="loading"
        :search-input.sync="search"
        class="mx-4"
        flat
        hide-no-data
        hide-details
        solo-inverted
    ></v-autocomplete>
</template>

<script>
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
  } from 'vuex'
    export default {
        name: 'Address',
        props:['value'],
        components:{
        },
        data: () => ({
            address:null,
            loading: false,
            search: null,
        }),
        methods: {
            ...mapActions(['getAddresses','getAddressById']),
            async querySelections (v) {
                this.loading = true
                await this.getAddresses(v);
                this.loading = false
            },
        },
        async mounted(){
        },
        computed: {
            ...mapGetters(['getAddressText'])
        },
        watch:{
            search (val) {
                val && val !== this.select && this.querySelections(val)
            },
            async address(v){
                this.$emit('input', await this.getAddressById(v))
            },
        }
    }
</script>