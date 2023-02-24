<script>
import { Doughnut } from 'vue-chartjs'

export default {
    name: 'Doughnut',
    extends: Doughnut,
    props: {
        items: {
            type: Array,
            default: () => []
        },
        label: {
            type: Array,
            default: () => []
        },
        color: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            options:{
                responsive: true,
                // maintainAspectRatio: false,
                animation: {
                    animateRotate: false
                },
                events: [],
                legend: {
                    display: false,
                },
                cutoutPercentage: 85,
                rotation: .851 * Math.PI,
                circumference: 1.3 * Math.PI,
            }
        }
    },
    computed:{
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
            return {
                labels: this.label,
                datasets:[{
                    data: this.items,
                    backgroundColor: this.color,
                    borderColor: '#fff',
                    borderWidth: 10
                }]
            }
        },
        draw () {
            this.renderChart(this.makeData(), this.options)
        }
    },
    mounted () {
        this.draw()
    }
}
</script>

<style scoped>

</style>
