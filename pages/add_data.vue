<template>
    <Add :form_model="person_json"/>
</template>

<script>
import rawDisplayer from './../components/base/raw-displayer'
import Add from './../components/Add'
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
  } from 'vuex'
    export default {
        components:{
            rawDisplayer,
            Add
        },

        methods: {
        },
        computed: {
        ...mapState(['person_json']),
        }
        
    }
</script>
s