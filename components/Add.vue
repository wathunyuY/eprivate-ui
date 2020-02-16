<template>
  <v-form v-model="valid">
    <v-container>
    <v-card color="basil">
        <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text" v-if="form_model.id">{{form_model.firstname}} {{form_model.lastname}}</h1>
        <h1 class="font-weight-bold display-3 basil--text" v-else>เพิ่มข้อมูล</h1>
        </v-card-title>
        <v-card-title class="text-center justify-center py-6">
            <v-btn text @click="addPerson(form_model)">บันทึก</v-btn>
            <v-btn text @click="clearPerson(form_model.id)">ยกเลิก</v-btn>
        </v-card-title>
        <v-tabs
            v-model="tab"
            color="basil"
        >
            <v-tab
                v-for="item in 2"
                :key="item"
                class="headline"
            >
                หน้าที่ {{ item }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6" offset-md="3">
                            <v-file-input
                                :rules="upload_rules"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="รูปถ่าย"
                                prepend-icon="mdi-camera"
                                label="รูปถ่าย"
                                v-model="image_input"
                                @change="onUpload"
                            ></v-file-input>
                        </v-col>
                        <v-col cols="12" md="6" offset-md="3" v-if="this.form_model.image_profile">
                            <v-img :src="this.form_model.image_profile" aspect-ratio="1.7"></v-img>                        
                        </v-col>
                    </v-row>
                    <div class="title">1.ประวัติทั่วไป</div>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.firstname"
                            label="ชื่อพลทหาร"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.lastname"
                            label="นามสกุล"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.nickname"
                            label="ชื่อเล่น"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.take_terns"
                            label="ผลัดที่"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                        <v-text-field
                            v-model="form_model.id_card"
                            label="เลขบัตรประจำตัวประชาชน"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="form_model.birth_date"
                                label="วัน/เดือน/ปีเกิด"
                                prepend-icon="mdi-download"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker locale="th" v-model="form_model.birth_date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">ยกเลิก</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">ตกลง</v-btn>
                            </v-date-picker>
                        </v-menu>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.religion"
                            label="ศาสนา"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.nationality"
                            label="สัญชาติ"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.earmark"
                            label="ตำหนิ"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.weight"
                            label="น้ำหนัก"
                            required
                            suffix="กก."
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.height"
                            label="ส่วนสูง"
                            required
                            suffix="ซม."
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="2" >
                        <v-text-field
                            v-model="form_model.family_number"
                            label="มีพี่น้องจำนวน"
                            required
                            suffix="คน"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2" >
                        <v-text-field
                            v-model="form_model.brother_number"
                            label="ชาย"
                            required
                            suffix="คน"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2" >
                        <v-text-field
                            v-model="form_model.sister_number"
                            label="หญิง"
                            required
                            suffix="คน"
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.address_number"
                            label="ภูมิลำเนาอยู่บ้านเลขที่"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.address_catagory"
                            label="หมู่ที่"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.address_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.address_district"
                            label="อำเภอ/เขต"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.address_sub_district"
                            label="ตำบล/แขวง"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.address_zipcode"
                            label="รหัสไปรษณี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.address_tel"
                            label="เบอร์โทรศัพท์"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.marry_status"
                            label="สถานภาพ"
                            required
                            :items="my_life_status"
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="4" >
                        <v-text-field
                            v-model="form_model.children_number"
                            label="จำนวนบุตร"
                            required
                            suffix="คน"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" >
                        <v-text-field
                            v-model="form_model.children_men_number"
                            label="ชาย"
                            required
                            suffix="คน"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" >
                        <v-text-field
                            v-model="form_model.children_women_number"
                            label="หญิง"
                            required
                            suffix="คน"
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.old_work_address_number"
                            label="สถานที่ทำงานเดิม"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.old_work_address_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.old_work_address_district"
                            label="อำเภอ/เขต"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.old_work_address_sub_district"
                            label="ตำบล/แขวง"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.old_work_address_zipcode"
                            label="รหัสไปรษณี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.old_work_address_tel"
                            label="เบอร์โทรศัพท์"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.old_work_salary"
                            label="รายได้ต่อเดือน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.stay_with"
                            label="ปัจจุบันอาศัยอยู่กับ"
                            required
                            :items="stay_withs"
                        ></v-select>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_name"
                            label="ชื่อ-สกุล บิดา"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.dad_status"
                            label="สถานภาพ"
                            required
                            :items="life_status"
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_career"
                            label="อาชีพ"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_work"
                            label="สถานที่ทำงาน"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_address_number"
                            label="ที่อยู่ปัจจุบัน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_address_catagory"
                            label="หมู่ที่"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.dad_address_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.dad_address_district"
                            label="อำเภอ/เขต"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.dad_address_sub_district"
                            label="ตำบล/แขวง"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_address_zipcode"
                            label="รหัสไปรษณี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_salary"
                            label="รายได้ต่อเดือน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.dad_address_tel"
                            label="เบอร์โทรศัพท์"
                            required
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_name"
                            label="ชื่อ-สกุล มารดา"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.mom_status"
                            label="สถานภาพ"
                            required
                            :items="life_status"
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_career"
                            label="อาชีพ"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_work"
                            label="สถานที่ทำงาน"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_address_number"
                            label="ที่อยู่ปัจจุบัน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_address_catagory"
                            label="หมู่ที่"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.mom_address_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.mom_address_district"
                            label="อำเภอ/เขต"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.mom_address_sub_district"
                            label="ตำบล/แขวง"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_address_zipcode"
                            label="รหัสไปรษณี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_salary"
                            label="รายได้ต่อเดือน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.mom_address_tel"
                            label="เบอร์โทรศัพท์"
                            required
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_name"
                            label="ชื่อ-สกุล ผู้ปกครอง"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_career"
                            label="อาชีพ"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_work"
                            label="สถานที่ทำงาน"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_address_number"
                            label="ที่อยู่ปัจจุบัน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_address_catagory"
                            label="หมู่ที่"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.parent_address_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.parent_address_district"
                            label="อำเภอ/เขต"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.parent_address_sub_district"
                            label="ตำบล/แขวง"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_address_zipcode"
                            label="รหัสไปรษณี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_salary"
                            label="รายได้ต่อเดือน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.parent_address_tel"
                            label="เบอร์โทรศัพท์"
                            required
                        ></v-text-field>
                        </v-col>
                    </v-row>

                    <div class="title">2.การเข้ารับราชการ</div>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.civil_service"
                            label="การเข้ารับราชการ"
                            required
                            :items="civil_services"
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.civil_service_time"
                            label="ระยะเวลารับราชการ"
                            required
                            :items="civil_service_time"
                        ></v-select>
                        </v-col>
                    </v-row>
                    <div class="title">3.วุฒิการศึกษา</div>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.education"
                            label="วุฒิการศึกษา"
                            required
                            :items="educations"
                        ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <div class="title">4.ประวัติโรคประจำตัว</div>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.congenital_disease"
                            label="ประวัติโรคประจำตัว"
                            required
                            :items="['มี','ไม่มี','เคยมี']"
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field :disabled="form_model.congenital_disease != 'เคยมี'"
                            v-model="form_model.congenital_disease_specify"
                            label="โรคประจำตัวที่เคยมี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.congenital_disease_name"
                            label="ชื่อโรคประจำตัว"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.congenital_disease_hospital"
                            label="สถานพยาบาล/โรงพยาบาลที่เข้ารับการรักษา"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.congenital_disease_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.congenital_disease_district"
                            label="อำเภอ/เขต"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="6" >
                        <v-text-field
                            v-model="form_model.congenital_disease_when"
                            label="เมื่อ"
                            required
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <div class="title">5.ประวัติเสพยาเสพติด</div>
                    <!-- {{form_model.drug_type_for_takes}} -->
                    <v-row no-gutters>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.drug_history_before_civil_service"
                            label="ประวัติเสพยาเสพติด (ก่อนเข้ารับราชการ)"
                            required
                            :items="['เสพ','เคยเสพแต่เลิก','ไม่เคย']"
                        ></v-select>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col v-for="(i,j) in form_model.drug_type_for_takes" :key="j" cols="12" >
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-row align="center">
                                        <v-checkbox
                                        v-model="i.status" 
                                        hide-details
                                        class="shrink mr-2 mt-0"
                                        ></v-checkbox>
                                        <v-text-field
                                        :readonly="i.tag != 'อื่นๆ ระบุ...'"
                                        v-model="i.name"
                                        :label="i.tag"
                                        required
                                        ></v-text-field>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        v-model="i.number_per_day"
                                        label="ปริมาณเสพต่อวัน"
                                        required
                                        :disabled="!form_model.drug_type_for_takes.find(f=>f.tag == i.tag)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        v-model="i.last"
                                        label="เสพครั้งสุดท้ายเมื่อ"
                                        required
                                        :disabled="!form_model.drug_type_for_takes.find(f=>f.tag == i.tag)"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <div class="title">6.ประวัติข้อมูลเคยติดคดี</div>
                    <v-row no-gutters>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.guilty_history"
                            label="ประวัติข้อมูลเคยติดคดี"
                            required
                            :items="['เคย','ไม่เคย','เคย (ปัจจุบันยังไม่จบ)']"
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.guilty_name"
                            label="คดี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.guilty_action"
                            label="โทษ"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.guilty_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <div class="title">7.ความสามารถพิเศษ</div>
                    <v-row>
                        <v-col cols="12">
                            <v-combobox
                            v-model="form_model.talents"
                            :items="talents"
                            label="ความสามารถพิเศษ (ทำเครื่องได้มากกว่า 1 ข้อ)"
                            multiple
                            dense
                            ></v-combobox>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <div class="title">8.ความสามารถด้านกีฬา</div>
                    <v-row>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.sport_type"
                            label="ประเภท"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-combobox
                            v-model="form_model.sport_agent"
                            :items="sport_agents"
                            label="เคยเป็นตัวแทน"
                            multiple
                            ></v-combobox>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.sport_arena"
                            label="รายการที่แข่งขัน"
                            required
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider/>
                    <div class="title">9.รายชื่อผู้ที่สามารถติดต่อได้ (ญาติพี่น้อง หรือ ผู้ใหญ่-กำนัน)</div>
                    <v-row v-for="(k,l) in form_model.emergency_contacts" :key="l">
                        <v-col cols="12" md="9" >
                        <v-text-field
                            v-model="form_model.emergency_contacts[l].name"
                            :label="l+1+'.ยศ-ชื่อ-สกุล'"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.emergency_contacts[l].relation"
                            label="เกี่ยวข้องเป็น"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.emergency_contacts[l].address_number"
                            label="ที่อยู่ปัจจุบัน"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.emergency_contacts[l].address_catagory"
                            label="หมู่ที่"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.emergency_contacts[l].address_province"
                            label="จังหวัด"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.emergency_contacts[l].address_district"
                            label="อำเภอ/เขต"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-select
                            v-model="form_model.emergency_contacts[l].address_sub_district"
                            label="ตำบล/แขวง"
                            required
                        ></v-select>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.emergency_contacts[l].address_zipcode"
                            label="รหัสไปรษณี"
                            required
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" >
                        <v-text-field
                            v-model="form_model.emergency_contacts[l].address_tel"
                            label="เบอร์โทรศัพท์"
                            required
                        ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-tab-item>
        </v-tabs-items>
        
        <v-card-actions>
        <v-icon @click="tab = 1; $vuetify.goTo(0);" v-if="tab == 0">mdi-arrow-right-drop-circle</v-icon>
        <v-icon @click="tab = 0; $vuetify.goTo(0);" v-if="tab == 1">mdi-arrow-left-drop-circle</v-icon>
        <v-spacer/>
        <v-btn text @click="addPerson(form_model)">บันทึก</v-btn>
        <v-btn text @click="clearPerson(form_model.id)">ยกเลิก</v-btn>
        </v-card-actions>
    </v-card>
    <!-- <rawDisplayer class="col-3" :value="form_model" title="JSON CHECK" /> -->
    </v-container>
  </v-form>
</template>

<script>
import rawDisplayer from './../components/base/raw-displayer'
import Address from './../components/base/Address'
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters,
  } from 'vuex'
    export default {
        name: 'Add',
        props:['form_model'],
        components:{
            rawDisplayer,
            Address
        },
        data: () => ({
            valid: false,
            firstname: '',
            lastname: '',
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            tab:0,
            talents:[
                "ขับรถยนต์","มีใบขับขี่","ไม่มีใบขับขี่",
                "ช่างไม้","ช่างยนต์","ช่างเชื่อม",
                "ช่างไฟฟ้าอิเล็กทรอนิกส์","ช่างซ่อมรถจักรยานยนต์","ช่างประปา",
                "ช่างทำสีรถ","คอมพิวเตอร์","ใช้ได้ดี","พอใช้ได้",
                "ช่างศิลป์","ช่างปูน ก่อสร้าง","ช่างทาสี","ช่างเฟอร์นิเจอร์","ช่างซ่อมเครื่องปรับอากาศ",
                "ช่างเดินสายไฟภายในอาคาร","ช่างทำฝาเพดาน",
                "ช่างอลูมิเนียน","ช่างไฟฟ้าโรงงาน"
            ],
            sport_agents:["หมู่บ้าน","ตำบล/แขวง","อำเภอ/เขต","จังหวัด","ประเทศ"],
            life_status:["ยังมีชีวิตอยู่","ถึงแก่กรรม","แยกกันอยู่กับคู่สมรส"],
            my_life_status:["โสด","สมรส","หย่าร้าง","มีบุตร"],
            stay_withs:["บิดา","มารดา","บิดา-มารดา","ผู้ปกครอง","ภรรยา"],
            civil_services:["จับใบแดงยื่นวุฒิ","จับใบแดงไม่ยื่นวุฒิ","สมัครยื่นวุฒิ","สมัครไม่ยื่นวุฒิ"],
            civil_service_time:["6 เดือน","1 ปี","2 ปี"],
            educations:["ต่ำกว่าป.6","ป.6","ม.3","ม.6","ปวช.","ปวส.","ปริญญาตรี","สูงกว่าปริญญาตรี"],
            upload_rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            menu:null,
            image_input:null
        }),
        methods: {
            ...mapActions(['uploadfile','addPerson','clearPerson']),
            async onUpload(e){
                if(!e) return;
                var formDataToUpload = new FormData();
                formDataToUpload.append("file", e);
                this.form_model.image_profile = await this.uploadfile(formDataToUpload);
            }
        },
        mounted(){
        },
        computed: {
        }
    }
</script>
s