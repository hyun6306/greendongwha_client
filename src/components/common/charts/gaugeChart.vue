<script>
import { Doughnut } from 'vue-chartjs'

export default {
    name: 'GaugeChart',
    extends: Doughnut,
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        }
    },
    data () {
        return {
            options: {
                responsive: true,
                responsiveAnimationDuration: 1000,
                maintainAspectRatio: false,
                devicePixelRatio: 1,
                circumference: Math.PI * 1.5,
                rotation : Math.PI * 0.75,
                cutoutPercentage : 75, // precent
                plugins: {
                    datalabels: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderColor: '#ffffff',
                        color (context) {
                            return context.dataset.backgroundColor
                        },
                        font (context) {
                            const w = context.chart.width
                            return {
                                size: w < 512 ? 18 : 20
                            }
                        },
                        align: 'start',
                        anchor: 'start',
                        offset: 10,
                        borderRadius: 4,
                        borderWidth: 1,
                        formatter (value, context) {
                            const index = context.dataIndex
                            const len = context.dataset.data.length - 1
                            if(index === len){
                                return null;
                            }
                            return value + ''
                        }
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            }
        }
    },
    watch: {
        value () {
            this.draw()
        },
        max () {
            this.draw()
        }
    },
    methods: {
        makeData () {
            const { value, max } = this
            const labels = ['달성', '미달성']
            const datasets = [
                {
                    label: '게이지',
                    data: [value, max],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 205, 86)'
                    ]
                }
            ]

            return {
                labels,
                datasets
            }
        },
        draw () {
            const { options } = this
            const data = this.makeData()

            this.renderChart(data, options)
        }
    },
    mounted () {
        this.draw()
    }
}
</script>

<style scoped lang="scss">

</style>
