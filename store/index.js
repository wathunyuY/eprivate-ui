// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     articles: require('@/data/articles.json'),
//     drawer: false,
//     items: [
//       {
//         text: 'Home',
//         to: '/'
//       },
//       {
//         text: 'About',
//         href: '#about'
//       }
//     ]
//   },
//   getters: {
//     categories: state => {
//       const categories = []

//       for (const article of state.articles) {
//         if (
//           !article.category ||
//           categories.find(category => category.text === article.category)
//         ) continue

//         const text = article.category

//         categories.push({
//           text,
//           to: `/category/${text}`
//         })
//       }

//       return categories.sort().slice(0, 4)
//     },
//     links: (state, getters) => {
//       return state.items.concat(getters.categories)
//     }
//   },
//   mutations: {
//     setDrawer: (state, payload) => (state.drawer = payload),
//     toggleDrawer: state => (state.drawer = !state.drawer)
//   },
//   actions: {

//   }
// })

export const state = () => {
  return {
    articles: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'Home',
        to: '/'
      },
      {
        text: 'About',
        href: '#about'
      }
    ]
  }
}
export const mutations = {
  setDrawer: (state, payload) => (state.drawer = payload),
  toggleDrawer: state => (state.drawer = !state.drawer)
}
export const actions = {
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
    return state.items.concat(getters.categories)
  }
}