<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        label="วันเกิด"
        readonly
        v-on="on"
        :hint="date_543"
        persistent-hint
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
      locale="th"
    ></v-date-picker>
  </v-menu>
</template>
<script>
  export default {
    name:'Birthdate',
    props:['value'],
    data: () => ({
      date: null,
      date_543:null,
      menu: false,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      date(val){
        this.date_543 = this.date.toString().slice(-5)+"-"+ (parseInt(this.date.toString().slice(0,4))+543)
        let d = new Date(this.date);
        this.date_543 = `${d.getDate() > 10 ? d.getDate():'0'+d.getDate()}-${d.getMonth()+1 > 10 ? d.getMonth()+1:'0'+(d.getMonth()+1)}-${d.getFullYear()+543}`
        this.$emit('input',val)
      }
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
    mounted(){
      this.date = this.value
    }
  }
</script>