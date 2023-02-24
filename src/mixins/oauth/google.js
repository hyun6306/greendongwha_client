export default {
    data: () => ({
        isInit: false,
        isSignIn: false
    }),
    watch: {
    },
    computed: {
    },
    mounted(){
        let that = this
        let checkGauthLoad = setInterval(function(){
            that.isInit = that.$gAuth.isInit
            that.isSignIn = that.$gAuth.isAuthorized
            if(that.isInit) clearInterval(checkGauthLoad)
        }, 1000)
    },
    methods:{
        // 토큰만 받아오기
        async oauth_google_handleClickGetAuth() {
            try {
                const authCode = await this.$gAuth.getAuthCode()
                // const response = await this.$http.post('http://your-backend-server.com/auth/google', { code: authCode, redirect_uri: 'postmessage' })
                console.log(authCode)
                return authCode
            } catch (error) {
              // On fail do something
            }
        },
        // 회원정보 가져오기
        async oauth_google_handleClickSignIn(){
            try {
                const googleUser = await this.$gAuth.signIn()
                console.log('user', googleUser)
                this.isSignIn = this.$gAuth.isAuthorized
                return googleUser
            } catch (error) {
                // On fail do something
                console.error(error);
                return null;
            }
        },
        // 로그아웃하기
        async oauth_google_handleClickSignOut(){
            try {
                const res = await this.$gAuth.signOut()
                this.isSignIn = this.$gAuth.isAuthorized
                console.log('GoogleSignOut', res)
            } catch (error) {
              // On fail do something
            }
        }
    }
}
