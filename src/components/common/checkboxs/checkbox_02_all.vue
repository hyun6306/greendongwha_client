<template>
	<v-btn
		block
		text
		tile
		class="justify-start pa-1"
		:class="className"
		@click="$emit('click')"
	>
		<v-icon size="22" color="primary" v-if="model">
			check_circle
		</v-icon>
		<v-icon size="22" color="grey" v-else>
			check_circle_outline
		</v-icon>
		<span v-if="text" class="checkbox_text pl-3 pb-1">{{ text }}</span>
	</v-btn>
</template>

<script>
import model from '@/mixins/model'

export default {
    name: 'Checkbox02',
    props: {
        text:{
            type: String,
            default: ''
        },
        className:{
            type: String,
            default: ''
        },
    },
	mixins:[
		model
	],
	data: ()=>({
	}),
    components: {
    },
	computed: {
	},
	watch: {
	},
    created(){
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style scoped lang="scss">
.checkbox_text{
	font-size: 0.85rem;
	color: #808080;
}
</style>

