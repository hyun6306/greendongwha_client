import moment from 'moment'

export default {
    computed: {
        moment_today(date){
            return moment(date).format('YYYY-MM-DD')
        },
        moment_now_year(date){
            return moment(date).format('YYYY')
        },
        moment_now_month(date){
            return moment(date).format('MM')
        },
    },
    methods:{
        moment_between_cal(item1, item2){
            // const start = moment(item1).isAfter(this.moment_today)  // 이전 날짜 확인
            // const end = moment(item2).isBefore(this.moment_today)   // 이후 날짜 확인
            // console.log(start, end)

            // start, end date 사이에 있는지 확인
            // console.log(this.moment_today, item1, item2)
            return moment(this.moment_today).isBetween(item1, item2, undefined, '[]')
        },
        moment_date_sort(date){
            // 날짜 순서대로 정렬
            return date.sort((left, right) => moment.utc(left).diff(moment.utc(right)))
        },
        moment_filter(date){
            return moment(date).format('YYYY-MM-DD')
        },
    }
}
