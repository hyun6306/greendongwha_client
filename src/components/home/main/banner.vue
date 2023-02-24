<template>
	<v-row class="ma-0 d-flex justify-center banner" align="center">
		<v-col cols="4" align="center">
			<v-img
				:src="items.src"
				width="70"
				eager
			/>
		</v-col>
		<v-col justify="center" align="start">
			<div class="text">
				<p>{{items.title}}</p>
				<span>{{items.text}}</span>
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
    name: 'HomeMainBanner',
	props: ['items'],
	data: ()=>({
	}),
    components: {
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



<style lang="scss" scoped>
.banner{
	.text{color:#040000 !important;}
	.text p{
		font-family:'NotoSansKR-Bold' !important;
		font-size:1.28rem !important;
	}
	.text span{
		font-family:'NotoSansKR-Regular' !important;
		font-size:0.86rem !important;
		letter-spacing:-0.0714rem !important;
	}
}
</style>
