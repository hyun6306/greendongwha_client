import Vue from 'vue'
import Vuex from 'vuex'

import admin from './admin'
import home from './home'
import user from './user'
import site from './site'
import common from './common'
import modules from './modules'

// var i18n = require('./i18n').default

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        ...admin,
        ...home,
        ...user,
        ...site,
        ...common,
        ...modules
    }
})
