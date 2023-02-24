<template>
	<div class="wrapper">
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import oauth_kakao from "@/mixins/oauth/kakao";

export default {
    name: 'LoginMainOauth',
    mixins:[ oauth_kakao ],
	data: () => ({
        kakao_token: null
	}),
    computed:{
        kakao_code(){
            return this.$route.query.code || null
        },
	    naver_code(){
			return this.$route.hash.replace('#','').split('&') || null
	    }
    },
	watch:{
	},
    async created() {
    },
    mounted() {
        // console.log('kakao_code', this.kakao_code)
        // this.getKakaoToken().then((res)=>{
        //     console.log('this.getKakaoToken', res)
        //     console.log('카카오 토큰', this.kakao_token)
        // })

	    console.log('this.$route.query',this.$route.hash.replace('#','').split('&'))
	    // console.log('this.$route.query',this.naver_code[0].split('=')[1])
	    if(this.naver_code){
			console.log('this.naver_code',this.naver_code[0].split('=')[1])
	    }
    },
    methods: {
		...mapMutations([
			'AUTH_MU_NAVER_TOKEN'
		]),
	    // kakao test
        async getKakaoToken(){
            const kakaoHeader = {
                'Authorization': '9cd9ff6a3ecd623cfbed6051d4982ce7',
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            }

            try{
                const data = {
                    grant_type: 'authorization_code',
                    client_id: process.env.VUE_APP_KAKAO_KEY,
                    redirect_uri: 'http://localhost:8080/login/oauth',
                    code: this.kakao_code,
                }

                const queryString = Object.keys(data)
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                    .join('&');

                const result = await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader });
                console.log('카카오 토큰', result);
                this.kakao_token = result
                return result;
            } catch (e) {
                return e;
            }
        },
        async getKakaoUserInfo(){
            let data = '';
            await window.Kakao.API.request({
                url: "/v2/user/me",
                success: function (response) {
                    data = response;
                },
                fail: function (error) {
                    console.log(error);
                },
            });
            console.log('카카오 계정 정보', data);
            return data;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
