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
				class="pa-0"
			>
				<div class="ma-2">
					<v-col class="pa-0 my-5 hand_img_area">
						<v-img
                            class="hand_img"
							:src="item.image"
                            contain
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
    name: 'HomeProductDetailOtherHand',
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
.hand_img_area{
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 180px;
    height: 180px;
}
.hand_img{
    width:120px;
    margin-top: 4.5rem;
}
.pattern_name{
	font-family: 'NotoSansKR-Bold' !important;
	font-size:15px !important;
}
@media screen and (max-width: 380px) {
    .hand_img_area{
        border: 1px solid #ccc;
        border-radius: 50%;
        width: 150px;
        height: 150px;
    }
    .hand_img{
        width:100px;
        margin-top: 3.5rem;
    }
    .pattern_name{
        font-size:12px !important;
    }
}
</style>

