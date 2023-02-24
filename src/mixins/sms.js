import { mapActions } from "vuex";
import timer from "@/mixins/timer";

export default {
    data:()=>({
        sms_id: null,
    }),
    mixins:[ timer ],
    computed:{
        sms_check_timer(){
            return this.timer_wait_time || null
        }
    },
    watch:{
        sms_check_timer(val){
            if(val === '00:00') this.sms_id = null
        },
    },
    methods: {
        ...mapActions([
            'AUTH_ACT_SIGN_UP_CHECK'
        ]),
        async sms_call( tel ){
            let state = false

            const params = {
                hand: tel
            }

            const items = { method: 'sns_post', params: params }
            await this.AUTH_ACT_SIGN_UP_CHECK(items).then((res)=>{
                if(res) {
                    this.sms_id = res.smsauth_id
                    this.timer_stop()
                    this.timer_start()
                    state = true
                }
            })

            return state
        },
        async sms_call_check( tel, number){
            let state = false


            if(!this.sms_id) return

            const params = {
                smsauth_id: this.sms_id,
                hand: tel,
                auth: number
            }

            const items = { method: 'sns_check', params: params }
            await this.AUTH_ACT_SIGN_UP_CHECK(items).then((res)=>{
                if(res){
                    this.timer_stop()
                    state = true
                }
            })

            return state
        },
    },
}
