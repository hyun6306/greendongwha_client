// import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// style
import './assets/styles/_main.scss'

// component
import './components'

// meta
// https://vue-meta.nuxtjs.org/
import Meta from 'vue-meta'
Vue.use(Meta)

// toastr2
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
window.toastr = require('toastr')
Vue.use(VueToastr2)

// VueQuillEditor
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'
import VideoResize from 'quill-video-resize-module2'
import ImageCompress from 'quill-image-compress'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/VideoResize', VideoResize)
Quill.register('modules/imageCompress', ImageCompress)

Vue.use(VueQuillEditor /* { default global options } */)

// vue-cookies
import vueCookies from 'vue-cookies'

Vue.use(vueCookies)

// 필요할 경우 쿠키 만료기간 세팅
Vue.$cookies.config('7d')

// vue google auth2
import GAuth from 'vue-google-oauth2'
const gauthOption = {
	clientId: `${process.env.VUE_APP_GOOGLE_CLIENT_ID}`,
	scope: 'profile email',
	prompt: 'select_account',
}
Vue.use(GAuth, gauthOption)

// 인테리어점 선택 store event
window.interiorListOne = val => store.commit('HOME_MU_INTERIOR_SELECT_INTERIOR', val)
// 인테리어점 링크 선택 event
window.interiorPushLink = val => store.dispatch('HOME_ACT_INTERIOR_PUSH_LINK', val)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app')
