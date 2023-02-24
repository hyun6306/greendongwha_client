<template>
	<v-card class="custom_banner" elevation="0">
		<v-img
			width="70"
			height="80"
			eager
			:src="bannerItems.image"
		/>
		<p class="mb-2" v-html="bannerItems.title"/>
		<p class="text" v-html="bannerItems.text"/>
		<p class="text" v-html="bannerItems.text2"/>
	</v-card>
</template>

<script>
export default {
    name: 'CustomBanner',
	props:[
		'bannerItems'
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
.custom_banner{
	min-height:150px;
	padding:70px 30px 30px;
	margin:90px 0;
	position:relative;
	background-color:#f8f8f8;
    border-radius:0;
	word-break:keep-all;
	.v-image{
		position:absolute !important;
		top:-35px !important;
		left:50% !important;
		transform: translateX(-50%) !important;
	}
	p{
		font-family:'NotoSansKR-Bold' !important;
		font-size:24px !important;
	}
	.text{
		font-family:'NotoSansKR-Regular' !important;
		font-size:14px !important;
		color:#5f6062 !important;
	}
}

@media all and (max-width:767px){
	.custom_banner{
		padding:60px 30px 30px !important;
		margin:60px 0 30px !important;
		.v-image{
			position:absolute !important;
			width:50px !important;
			height:60px !important;
			top:-25px !important;
			left:50% !important;
			transform: translateX(-50%) !important;
		}
		p{font-size:18px !important;}
		span{font-size:12px !important;}
	}
}
</style>

