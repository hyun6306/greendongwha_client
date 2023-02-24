<template>
	<v-col cols="12" align="center">
		<v-card class="feature_tit pt-5 pb-5">
			<p>제품 인증 및 수상정보</p>
		</v-card>
		<v-row class="ma-0 pt-5" align="center">
			<v-col
				v-for="(item, i) in items"
				:key="i"
				cols="6"
				sm="4"
				md="3"
                class="py-5"
			>
				<v-col cols="10" sm="8" md="6" class="pa-6 icon_wrapper">
					<v-img
						width="100%"
						:src="item.image"
                        contain
                        aspect-ratio="1"
                        eager
					/>
				</v-col>
				<p class="award_tit mt-sm-3 mt-1">{{item.text}}</p>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
export default {
    name: 'HomeProductDetailCert',
	data: ()=>({
	}),
    props:[
        'items',
    ],
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
.award_tit{
	font-family: 'NotoSansKR-Bold' !important;
	font-size:15px !important;
}
.icon_wrapper{
	width: 100px;
	border: 1px solid #ccc;
	border-radius:50%;
}
@media all and (max-width:380px){
	.award_tit{
		font-size:12px !important;
	}
}
</style>

