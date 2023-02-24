<template>
	<v-col cols="12" align="center">
		<v-card class="feature_tit pt-5 pb-5">
			<p>{{ title }}</p>
<!--			<span>다양한 재질을 비교해보고 취향에 맞는 선택하세요.</span>-->
		</v-card>
		<v-row class="ma-0 py-3">
			<v-col
				v-for="(item, i) in items"
				:key="i"
				cols="6"
				sm="4"
				md="3"
				class="pa-0 px-4 py-3"
			>
				<div class="ma-1">
					<v-col cols="12" class="pa-0">
						<v-img
							width="100%"
							:src="item.image"
                            eager
						/>
					</v-col>
					<p class="pattern_name mt-sm-3 mt-1">{{item.text}}</p>
				</div>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
export default {
    name: 'HomeProductDetailOther',
	data: ()=>({
	}),
    props:[
        'title',
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
.pattern_name{
	font-family: 'NotoSansKR-Bold' !important;
	font-size:15px !important;
}
.v-image {
	height:168px;
}
@media all and (min-width:981px) and (max-width:1280px){}
@media all and (min-width:769px) and (max-width:980px){
	.v-image {
		height:133px !important;
	}
}
@media all and (min-width:380px) and (max-width:768px){
	.v-image {
		height:133px !important;
	}
}
@media all and (max-width:380px){
	.v-image {
		height:133px !important;
	}
	.pattern_name{
		font-size:12px !important;
	}
}
</style>

