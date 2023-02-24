export default {
    data: () => ({
        oauth_naver: null,
        naver_user: null
    }),
    watch: {
    },
    computed: {
        naver_query(){
            console.log('naver_query',this.oauth_naver_getUrlParams(this.$route.hash))
            return this.$route.hash || null
        },
        naver_key(){
            return process.env.VUE_APP_NAVER_KEY
        },
        naver_redirect(){
            return window.location.href
        }
    },
    created(){
    },
    mounted(){
        const scriptElem = document.createElement('script')

        // script download
        scriptElem.onload = () => this.oauth_naver_init()
        scriptElem.src  = `https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js`

        document.head.appendChild(scriptElem)
    },
    methods:{
        oauth_naver_getUrlParams(search = ``){
            const hashes = search
                .slice(search.indexOf("?") + 1)
                .slice(search.indexOf("#") + 1)
                .split("&")
            const items = hashes.reduce((params, hash) => {
                const split = hash.indexOf("=")
                const key = hash.slice(0, split)
                const val = hash.slice(split + 1)
                return Object.assign(params, { [key]: decodeURIComponent(val) });
            }, {})
            return search === `` ? null : items
        },
        oauth_naver_init(){
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: this.naver_key,
                callbackUrl: this.naver_redirect,
                isPopup: false /* 팝업을 통한 연동처리 여부 */,
                loginButton: {color: "green", type: 3, height: 60}
            });

            this.oauth_naver = naverLogin
            naverLogin.init()

            const naverBtn = document.getElementById('naverIdLogin')

            naverBtn.addEventListener('click', ()=>{
                const btnNaver = document.getElementById('naverIdLogin').firstChild;
                btnNaver.click()
            })

            window.addEventListener('load', () => {
                naverLogin.getLoginStatus((status) => {
                    // console.log('naver',status);
                    if (status) {
                        console.log('this.oauth_naver.user', naverLogin.user)
                        this.naver_user = naverLogin.user
                    } else {
                        console.log('AccessToken이 올바르지 않습니다.')
                    }
                })
            })
        },
    }
}
