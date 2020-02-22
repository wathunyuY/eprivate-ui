import AccountProvider from '@/store/http_request/account_provider'
import FileProvider from '@/store/http_request/file_provider'
import AddressProvider from '@/store/http_request/address_provider'
const Cookie = process.client ? require('js-cookie') : undefined
const accountService = new AccountProvider()
const fileService = new FileProvider()
const addressService = new AddressProvider()
require('@/data/person.json')
export const strict = false
export const state = () => {
  return {
    auth:{
      time:null,
      payload:null
    },
    articles: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'ค้นหาข้อมูล',
        icon:'mdi-account-search-outline',
        to: '/'
      },
      {
        text: 'เพิ่มข้อมูล',
        icon:'mdi-account-plus-outline',
        to: '/add_data'
      },
      // {
      //   text: 'เกี่ยวกับ',
      //   href: '#about'
      // }
    ],
    persons:[],
    person_json:require('@/data/person.json'),
    person_json_endcode:JSON.stringify(require('@/data/person.json')),
    snackbar:{
      show:false,
      message:'',
      color:'',
      icon:''
    },
    form_model:require('@/data/person.json'),
    addresses:[],
    address_dialog:false
  }
}
export const mutations = {
  setAuth:(state,data)=>{
    state.auth.time = data ? (new Date()).getTime():null
    state.auth.payload = data
  },
  setDrawer: (state, payload) => (state.drawer = payload),
  toggleDrawer: state => (state.drawer = !state.drawer),
  doubleArc:state=> (state.articles = state.articles.concat(state.articles)),
  success(state,message){
    state.snackbar.show = true
    state.snackbar.message = message
    state.snackbar.color = 'success',
    state.snackbar.icon= 'mdi-emoticon'

  },
  fail(state,message){
    state.snackbar.show = true
    state.snackbar.message = `การทำงานผิดพลาด ${message}`
    state.snackbar.color = 'red',
    state.snackbar.icon= 'mdi-emoticon-sad'
  },
  setSnackbar(state,status){
    state.snackbar.show = status
  },
  SET_PERSONS (state, data) {
    state.persons = data
  },
  SET_PERSON_DETAIL (state,data) {
    state.form_model = data;
  },
  CLEAR_PERSON (state,id) {
    if(!id) state.form_model = JSON.parse(state.person_json_endcode);
    else state.form_model = null;
  },
  SET_ADDRESSES (state,data) {
    state.addresses = data;
  },
  toggleAddressDilog: state => (state.address_dialog = !state.address_dialog),
}
export const actions = {
  async login({commit,state},body){
    await accountService.login(body).then(res=>{
      if(res == 1){
        commit('fail', "ล็อกอินผิดพลาด : ชื่อผู้ใช้ไม่ถูกต้อง");
        return ;
      }else if(res == 2){
        commit('fail', "ล็อกอินผิดพลาด : พาสเวิร์ดไม่ถูกต้อง");
        return ;
      }
      commit('setAuth', res)
      Cookie.set('auth', JSON.stringify(state.auth)) // saving token in cookie for server rendering
      this.$router.push('/')
      return res;
    }).catch(err=>{
      commit('fail', `ล็อกอินผิดพลาด : ${err.message}` );
    })
  },
  async logout({commit}){
      commit('setAuth', null)
      Cookie.remove('auth')
      this.$router.push('/login')
  },
  async getPersons ({commit},params) {
    const data = await accountService.getPersons(params).then(res=>{
      commit('SET_PERSONS', res)
      return res;
    }).catch(err=>{
      commit('fail', "การดึงข้อมูลผิดพลาด");
    })
  },
  async getPerson ({commit},id) {
    const data = await accountService.getPerson(id).then(res=>{
      commit('SET_PERSON_DETAIL', res)
      return res;
    }).catch(err=>{
      commit('fail', "การค้นหาผิดพลาด/ไม่พบข้อมูล");
    })
  },
  async removePerson ({commit},id) {
    const data = await accountService.removePerson(id).then(res=>{
      commit('CLEAR_PERSON',id)
      commit('success', "เรียบร้อย");
      return res;
    }).catch(err=>{
      commit('fail', "ลบข้อมูลผิดพลาด/ไม่พบข้อมูล");
    })
  },

  async addPerson ({commit},body) {
    if(!body.firstname || !body.lastname){
      commit('fail', "กรุณากรอก ชื่อ-สกุลพลทหาร");
      return;
    }
    if(!body.id_card){
      commit('fail', "กรุณากรอก รหัสประจำตัวประชาชน");
      return;
    }
    const data = await accountService.addPerson(body).then(res=>{
      commit('CLEAR_PERSON',body.id)
      commit('success', "เรียบร้อย");
      return res;
    }).catch(err=>{
      commit('fail', err.message);
    })
  },
  async clearPerson ({commit},id) {
    commit('CLEAR_PERSON',id)
  },

  async uploadfile ({commit},form) {
    const data = await fileService.upload(form)
    return data;
  },
  async getAddresses ({commit},d) {
    const data = await addressService.getAddresses(d).then(res=>{
      commit('SET_ADDRESSES', res)
      return res;
    }).catch(err=>{
      commit('fail', "ดึงข้อมูลที่อยู่ผิดพลาด");
      return [];
    })
    return data;
  },
  getAddressById({state},id){
    return state.addresses.find(f=>f.id == id);
  }
}
export const getters = {
  categories: state => {
    const categories = []

    for (const article of state.articles) {
      if (
        !article.category ||
        categories.find(category => category.text === article.category)
      ) continue

      const text = article.category

      categories.push({
        text,
        to: `/category/${text}`
      })
    }

    return categories.sort().slice(0, 4)
  },
  links: (state, getters) => {
    return state.items
  },
  personsForSerach: state =>{
    return state.persons.map(m=>{
      return{
        name:`${m.id_card} - ${m.firstname} ${m.lastname}`,
        id:m.id
      }
    });
  },
  getAddressText: state =>{
    return state.addresses.map(m=>{
      return {
        text:`${m.province.trim()} >> ${m.district.trim()} >> ${m.sub_district.trim()} >> ${m.zipcode.trim()}`,
        id:m.id
      }
    });
  },
  
}