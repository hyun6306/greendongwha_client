<script>
import { Doughnut } from 'vue-chartjs'
import Chart from 'chart.js'

Chart.defaults.RoundedDoughnut    = Chart.helpers.clone(Chart.defaults.doughnut)
Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
    draw: function(ease) {
        var ctx           = this.chart.ctx
        var easingDecimal = ease || 1
        var arcs          = this.getMeta().data
        Chart.helpers.each(arcs, function(arc, i) {
            arc.transition(easingDecimal).draw()

            var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1]
            var pColor = pArc._view.backgroundColor

            var vm         = arc._view
            var radius     = (vm.outerRadius + vm.innerRadius) / 2
            var thickness  = (vm.outerRadius - vm.innerRadius) / 2.1
            var startAngle = Math.PI - vm.startAngle - Math.PI / 2
            var angle      = Math.PI - vm.endAngle - Math.PI / 2

            ctx.save();
            ctx.translate(vm.x, vm.y)

            ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor
            ctx.beginPath()
            ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI)
            ctx.fill()

            ctx.fillStyle = vm.backgroundColor;
            ctx.beginPath()
            ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI)
            ctx.fill()

            ctx.restore()
        });
    }
});

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
        },
        rotation: {
            type: Number,
            default: Math.PI * 0.5
        }
    },
    data () {
        return {
            options: {
                responsive: true,
                responsiveAnimationDuration: 1000,
                maintainAspectRatio: false,
                devicePixelRatio: 2.5,
                circumference: Math.PI,
                rotation : Math.PI * 0.5,
                cutoutPercentage : 80, // precent
                animation: {
                    easing: 'easeOutSine',
                    duration: 1500
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                layout: {
                    padding: 0,
                    margin: 0,
                    width: '50%'
                },
                reverse: false
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
            const { value, max} = this
            const labels = ['달성', '미달성']
            let maxValue

            if(value > max) maxValue = 0
            else maxValue = max - value

            const datasets = [
                {
                    type: 'RoundedDoughnut',
                    label: '게이지',
                    data: [value, maxValue],
                    backgroundColor: [
                        'rgba(3, 78, 162, 1)',
                        'rgba(3, 78, 162, 0)'
                    ],
                    borderWidth: 0
                }
            ]

            return {
                labels,
                datasets
            }
        },
        draw () {
            const { options, rotation } = this
            const data = this.makeData()

            options.rotation = rotation

            this.renderChart(data, options)
        },
    },
    mounted () {
        this.draw()
    }
}
</script>

<style scoped>

</style>
