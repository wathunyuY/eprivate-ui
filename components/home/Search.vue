<template>
  <v-container
    id="search"
    tag="section"
  > 
    <v-toolbar
    style="background-image: url('http://eprivate.engrdept.com/api/assets/images/profile/search.png');background-size: cover;"
    color="green darken-1"
    dark
  >
    <v-toolbar-title>ค้นหา </v-toolbar-title>
        <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="personsForSerach"
        item-text="name"
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
    <!-- <v-data-table
      v-else
      :headers="headers"
      :items="persons"
      :items-per-page="5"
      class="elevation-1"
      @click:row="getPersonFromTable"
    ></v-data-table> -->
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
        search: null,
        select: null,
        headers: [
          {
            text: 'เลขบัตรประจำตัวประชาชน',
            align: 'left',
            sortable: false,
            value: 'id_card',
          },
          { text: 'ชื่อ-สกุล', value: 'name' },
          { text: 'ชื่อเล่น', value: 'nickname' },
          { text: 'ผลัดที่', value: 'take_terns' },
        ]
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
            this.loading = false
        },
        async getPersonFromTable(e){
          this.getPerson(e._id)
        }
    },
    computed: {
      ...mapState(['form_model','persons']),
      ...mapGetters(['personsForSerach']),
    },
    mounted(){
      this.clearPerson(1);
    }
  }
</script>