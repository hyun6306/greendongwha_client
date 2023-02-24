export default {
    data:() => ({
        kakao_user:{}
    }),
    watch:    {},
    computed: {
        oauth_kakao_query() {
            console.log('oauth_kakao_query', this.$route.query)
            return this.$route.query.code
        }
    },
    created() {
        this.oauth_kakao_start()
    },
    mounted() {
    },
    methods: {
        oauth_kakao_init_redirect() {
            window.Kakao.Auth.authorize({ redirectUri: 'http://localhost:8080/login/oauth' })
        },
        oauth_kakao_start(){
            const scriptElem = document.createElement('script')

            // script download
            scriptElem.onload = () => this.oauth_kakao_init()
            scriptElem.src = `https://developers.kakao.com/sdk/js/kakao.js`

            document.head.appendChild(scriptElem)
        },
        oauth_kakao_init() {
            const kakaoKey = process.env.VUE_APP_KAKAO_KEY

            window.Kakao.init(kakaoKey)
            window.Kakao.isInitialized()
            console.log('window.Kakao', window.Kakao)
        },
        async oauth_kakao_login(result) {
            await window.Kakao.Auth.login({
                success: (response) => {
                    console.log('카카오 로그인', response);
                    result( response )
                },
                fail: (error) => {
                    console.log( error )
                },
            });
        },
        async oauth_kakao_userInfo(result) {
            await window.Kakao.API.request({
                url:"/v2/user/me",
                success: (response) => {
                    console.log('카카오 계정 정보', response)
                    this.kakao_user = response.kakao_account
                    result (response)
                },
                fail: (error) => {
                    console.log(error);
                },
            });
        },
        async oauth_kakao_logout() {
            await window.Kakao.Auth.logout(() => {
                console.log(window.Kakao.Auth.getAccessToken());
            })
        },
        async oauth_kakao_out(result) {
            await window.Kakao.API.request({
                url:"/v1/user/unlink",
                success: (response) => {
                    result( response )
                },
                fail: (error) => {
                    console.log(error);
                },
            });

            console.log('카카오 연결끊기', data);
        }
    }
}
