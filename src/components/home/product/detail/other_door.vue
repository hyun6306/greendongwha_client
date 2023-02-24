<template>
	<v-col cols="12" align="center" class="">
		<v-card class="feature_tit pt-5 pb-5">
			<p>{{ title }}</p>
<!--			<span>다양한 재질을 비교해보고 취향에 맞는 선택하세요.</span>-->
		</v-card>
        <v-row class="ma-0 py-5" align="center">
            <v-col
                v-for="(item, i) in items"
                :key="i"
                class="pa-0 door-item"
            >
                <div class="ma-1">
                    <v-col cols="12" class="pa-0">
                        <v-img
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
    name: 'HomeProductDetailOtherDoor',
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
.door-item{
    width: 12.5%;
    max-width: 12.5%;
}
.pattern_name{
    font-family: 'NotoSansKR-Bold' !important;
    font-size:15px !important;
}
.v-image {
	height:168px;
}
@media screen and (max-width: 960px) {
	.v-image {
		height:133px !important;
	}
    .door-item{
        width: 25%;
        max-width: 25%;
    }
}
@media screen and (max-width: 380px) {
    .pattern_name{
        font-size:12px !important;
    }
}
</style>

