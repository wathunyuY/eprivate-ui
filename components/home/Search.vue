<template>
  <v-container
    id="search"
    tag="section"
  > 
    <v-toolbar
    color="green darken-1"
  >
    <v-toolbar-title>ค้นหา </v-toolbar-title>
        <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        item-text="id_card"
        item-value="id"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="รหัสประจำตัวประชาชน"
        solo-inverted
        ></v-autocomplete>
        <v-btn icon>
        <v-icon x-large @click="getPerson(select)">mdi-account-search-outline</v-icon>
        </v-btn>
    </v-toolbar>
    <Add v-if="form_model"/>
  </v-container>
</template>
<script>
  import rawDisplayer from './../base/raw-displayer'
  import Add from './../Add'
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
    async mounted(){
    },
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
        // states: [],
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
      select (val) {
        this.getPerson(val)
      },
    },
    methods: {
        ...mapActions(['getPersons','getPerson','clearPerson']),
        async querySelections (v) {
            this.loading = true
            await this.getPersons({id_card:v});
            this.items = this.$store.state.persons;
            this.loading = false
        },
    },
    computed: {
      ...mapState(['form_model']),
      ...mapGetters(['personsFullname']),
    },
    mounted(){
      this.clearPerson(1);
    }
  }
</script>