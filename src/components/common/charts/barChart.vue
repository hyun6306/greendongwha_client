<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'BarChart',
    extends: Bar,
    props: {
        value: {
            type: Array,
            default: () => []
        },
	    height: {
			type: String,
		    default: '100%'
	    }
    },
    data () {
        return {
            options: {
                responsive: true,
                responsiveAnimationDuration: 1000,
                maintainAspectRatio: false,
                devicePixelRatio: 1,
                elements: {
                    line: {
                        tension: 0.1
                    }
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            ticks:{
                                maxRotation :0,
                                minRotation :0,
                            },
                            barPercentage: 0.3,
                            borderRadius: 0.2,
                            gridLines: {
                                display: false,
                                offsetGridLines: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks:{
                                beginAtZero: true,
                            },
                            display: true,
                            scaleLabel: {
                                display: false
                            },
                            gridLines: {
                                drawBorder: false,
                                display: true,
                            }
                        }
                    ]
                },
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                layout: {
                }
            }
        }
    },
    methods: {
        makeData () {
            const { value } = this
            const labels = value.map(item => item.date)
            const items = value.map(item => item.value)

            const datasets = [
                {
                    label: '데이터',
                    data: [...items],
                    backgroundColor: 'rgba(68, 136, 62, 1)'
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

<style scoped>

</style>
