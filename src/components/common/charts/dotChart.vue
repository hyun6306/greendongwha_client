<script>
import { Line } from 'vue-chartjs'

const CHART_PX = 0
const CHART_PY = 16

export default {
    name: 'DotChart',
    extends: Line,
    props: {
        items: {
            type: Array,
            default: () => []
        },
        thresholds: {
            type: Array,
            default: () => []
        },
        label: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 120
        },
        width: {
            type: Number,
            default: 80
        }
    },
    data () {
        return {
            options: {
                animation: {
                    duration: 1,
                    onComplete () {
                        if (this.initialized === true) {
                            return
                        }

                        const chartInstance = this.chart
                        const ctx = chartInstance.ctx
                        ctx.textAlign = 'center'
                        ctx.textBaseline = 'bottom'
                        ctx.fillStyle = '#fff'
                        ctx.font = '12px Arial'
                        ctx.width = '100px'

                        this.data.datasets.forEach(function (dataset, i) {
                            const meta = chartInstance.controller.getDatasetMeta(i)
                            meta.data.forEach(function (target, index) {
                                const data = dataset.data[index]
                                ctx.fillText(data, target._model.x, target._model.y + 7)
                            })
                        })

                        this.initialized = true
                    }
                },
                pointLabels: {
                    display: true
                },
                events: [],
                maintainAspectRatio: false,
                responsiveAnimationDuration: 1000,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            offset:true,
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false,
                                color: 'rgba(0, 0, 0, 0)',
                                position: 'center'
                            },
                            scaleLabel: {
                                display: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                drawBorder: false,
                                display: false,
                            },
                            display: false,
                            ticks: {
                                display: false,
                                color: 'rgba(0, 0, 0, 0)',
                                position: 'center'
                            },
                            scaleLabel: {
                                display: false
                            }
                        }
                    ]
                },
                layout: {
                    padding: {
                        left: CHART_PX,
                        right: CHART_PX,
                        top: CHART_PY,
                        bottom: CHART_PY
                    }
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end'
                    },
                }
            }
        }
    },
    watch: {
        items: {
            handler () {
                this.draw()
            },
            deep: true
        }
    },
    methods: {
        makeData () {
            const { items, label, thresholds } = this

            const labels = items.map(item => item.date)
            const data = items.map(item => item.value)
            const colors = items.map(item => {
                const { value } = item
                const targetThreshold = thresholds
                    .sort((a, b) => a.value > b.value ? 1 : -1)
                    .reduce((target, threshold) => {
                        if (value >= threshold.value) {
                            return threshold
                        }
                        return target
                    },{
                        value: 0,
                        text: 'default value',
                        color: 'rgb(3, 78, 162)'
                    })
                const { color } = targetThreshold
                return color
            })

            const datasets = [
                {
                    label: label,
                    data: data,
                    backgroundColor: colors,
                    // borderColor: 'rgb(75, 192, 192)',
                    strokeColor: "rgba(245, 15, 15, 0.5)",
                    fill: false,
                    showLine: true,
                    pointRadius: 16,
                    pointStyle: 'rectRounded'
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
