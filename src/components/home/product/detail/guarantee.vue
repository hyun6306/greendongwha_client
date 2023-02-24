<template>
	<v-col cols="12" align="center" class="mt-0 mt-sm-10">
		<v-col cols="12">
			<v-img
				eager
				width="100%"
				min-width="100"
				max-width="100"
				min-height="100"
				:src="require('@/assets/img/product/icon_ten.png')"
			/>
		</v-col>
		<v-card class="feature_tit bc_tr mb-8">
			<p>10년 보증 혜택!<br class="mo_only"> 동화만의 특별한 품질 보증 서비스!</p>
			<span>시공후 1개월 이내에 품질보증 등록하면 10년까지 보증 혜택을 드립니다.</span>
		</v-card>
	</v-col>
</template>

<script>
export default {
    name: 'HomeProductDetailGuarantee',
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
.mo_only{display:none !important;}
@media all and (max-width:380px) {
	.mo_only {
		display: block !important;
	}
}
</style>

