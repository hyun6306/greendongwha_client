export default {
    data() {
        return {
            timer: 180,
            timer_model: false
        }
    },
    computed:{
        timer_wait_time(){
            return this.timer_string(this.timer)
        }
    },
    watch:{
        timer(value){
            if(value === 0) this.timer_stop()
        }
    },
    methods: {
        timer_start(){
            this.timer = 180
            this.timer_model = true
            this.interval_timer = setInterval(() => {
                this.timer -= 1
            }, 1000)
        },
        timer_stop(){
            this.timer_model = false
            clearInterval(this.interval_timer)
        },
        timer_string(time_secode){
            const minute = parseInt(time_secode / 60)
            const secode = time_secode % 60

            let minute_string = (minute < 10)? '0'+minute : minute
            let second_string = (secode < 10)? '0'+secode : secode
            let time_string = minute_string + ':' + second_string

            return time_string
        },
    },
    destroyed(){
        this.timer_stop()
    }
}
