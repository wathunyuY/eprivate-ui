import AccountProvider from '@/store/http_request/account_provider'
import FileProvider from '@/store/http_request/file_provider'
const accountService = new AccountProvider()
const fileService = new FileProvider()
require('@/data/person.json')
export const state = () => {
  return {
    articles: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'หน้าแรก',
        to: '/'
      },
      {
        text: 'เพิ่มข้อมูล',
        to: '/add_data'
      },
      // {
      //   text: 'เกี่ยวกับ',
      //   href: '#about'
      // }
    ],
    persons:[],
    person_detail:null,
    person_json:require('@/data/person.json'),
    person_json_endcode:JSON.stringify(require('@/data/person.json')),
    snackbar:{
      show:false,
      message:'',
      color:'',
      icon:''
    },
  }
}
export const mutations = {
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
    state.person_detail = data;
  },
  CLEAR_PERSON (state,id) {
    if(!id) state.person_json = JSON.parse(state.person_json_endcode);
    else state.person_detail = null;
  }
}
export const actions = {
  async getPersons ({commit},params) {
    const data = await accountService.getPersons(params).then(res=>{
      commit('SET_PERSONS', res)
      return res;
    }).catch(err=>{
      commit('fail', err.message);
    })
  },
  async getPerson ({commit},id) {
    const data = await accountService.getPerson(id).then(res=>{
      commit('SET_PERSON_DETAIL', res)
      return res;
    }).catch(err=>{
      commit('fail', err.message);
    })
  },

  async addPerson ({commit},body) {
    const data = await accountService.addPerson(body ? body:person_json).then(res=>{
      commit('CLEAR_PERSON',body.id)
      commit('success', "เรียบร้อย");
      return res;
    }).catch(err=>{
      commit('fail', err.message);
    })
  },
  async clearPerson ({commit},id) {
    commit('CLEAR_PERSON',id)
    commit('success', "เรียบร้อย");
  },

  async uploadfile ({commit},form) {
    const data = await fileService.upload(form)
    return data;
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
  personsFullname: state =>{
    return state.persons.map(m=>`${m.firstname} ${m.lastname}`);
  }
}