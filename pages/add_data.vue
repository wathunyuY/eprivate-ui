<template>
    <Add />
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
        middleware:'authenticated',
        components:{
            rawDisplayer,
            Add
        },

        methods: {
            ...mapActions(['clearPerson']),
        },
        computed: {
        // ...mapState(['person_json']),
        },
        created(){
            this.clearPerson(null);
        }
        
    }
</script>
s