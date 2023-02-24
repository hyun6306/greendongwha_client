import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)
// color
import colors from 'vuetify/lib/util/colors'

// icon
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'font-awesome/css/font-awesome.min.css'

export default new Vuetify({
    breakpoint: {
        thresholds: {
            xs: 380,
            sm: 768,
            md: 1280,
            lg: 1960,
        },
    },
    theme: {
        // css > background: var(--v-samsung-base);
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary     : '#00582c',
                secondary   : colors.grey,
                accent      : colors.shades.black,
                error       : colors.red.accent3,
                selected    : colors.grey.lighten3,
                timerBg     : colors.grey.lighten3,
                olive       : '#42883d',
                main_grey   : '#9fa1a4',
            },
            dark: {
                primary     : '#00582c',
                secondary   : colors.grey.darken3,
                accent      : colors.shades.black,
                error       : colors.red.accent3,
                selected    : colors.grey.darken2,
                timerBg     : colors.grey.darken4,
                olive       : '#42883d',
                main_grey   : '#9fa1a4',
            },
        },
    },
    iconfont: 'md' || 'mdi' || 'fa' || 'fa4',
});
