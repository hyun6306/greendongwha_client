<template>
    <v-progress-linear
        indeterminate
        size="64"
        :color="color"
    ></v-progress-linear>
</template>

<script>
export default {
    name: 'line_loader_01',
	props:{
		time:{
			type: Number,
			default: 0
		},
		color:{
			type: String,
			default: 'primary'
		}
	},
	data: ()=>({
	}),
    components: {
    },
	watch: {
	},
    computed:{
    },
    created(){
    },
    mounted(){
    },
    methods:{
    }
}
</script>
