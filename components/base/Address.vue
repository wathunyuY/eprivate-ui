<template>
    <v-row>------------
        <v-col cols="12" md="3" >
        <v-select
            v-model="province"
            label="จังหวัด"
            required
            :item="['ss']"
        ></v-select>
        </v-col>
        <v-col cols="12" md="3" >
        <v-select
            v-model="district"
            label="อำเภอ/เขต"
            required
        ></v-select>
        </v-col>
        <v-col cols="12" md="3" >
        <v-select
            v-model="sub_district"
            label="ตำบล/แขวง"
            required
        ></v-select>
        </v-col>
        <v-col cols="12" md="3" >
        <v-text-field
            v-model="zipcode"
            label="รหัสไปรษณี"
            required
        ></v-text-field>
        </v-col>----------------
    </v-row>
</template>

<script>
export default {
    name: 'Address',
    props:['province','district','sub_district','zipcode'],


}
</script>