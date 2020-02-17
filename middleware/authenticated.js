const Cookie = process.client ? require('js-cookie') : undefined
export default function ({ store, redirect }) {
    // If the user is not authenticated
    var cookie_auth = Cookie.get('auth');
    if(!cookie_auth){
      return redirect('/login')
    }
    var c = JSON.parse(cookie_auth)
    if((new Date()).getTime() - c.time > 1*1000*60*60*24*2){
      store.commit('setAuth', null)
      Cookie.remove('auth')
      return redirect('/login')
    }
    store.commit('setAuth', c.payload);
  }
  