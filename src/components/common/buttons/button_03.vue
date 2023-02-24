<template>
	<v-btn
		class="btn_detail"
		:to="to"
		@click="$emit('click')"
	>
		<v-img
			v-if="addIcon !== undefined"
			class="mr-1 hidden-md-and-down"
			width="14"
			height="14"
			:src="require('@/assets/img/icon/icon_plus.png')"
			eager
		/>
		{{ title }}
	</v-btn>
</template>

<script>
export default {
    name: 'Button03',
	props:[
        'to',
		'title',
		'addIcon'
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
.v-btn.btn_detail{
	width:90px !important;
	height:34px !important;
	font-family:'NotoSansKR-Regular' !important;
	font-size:13px !important;
	color:#262626;
	background-color:#fff !important;
	border:1px solid #ccc !important;
	box-shadow:none;
}
@media all and (min-width:960px) and (max-width:1263px){}
@media all and (min-width:601px) and (max-width:959px){}
@media all and (max-width:600px){
	.v-btn.btn_detail{
		width:60px !important;
		height:30px !important;
	}
}
</style>

