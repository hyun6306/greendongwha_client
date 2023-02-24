<template>
	<v-col cols="12" align="center">
		<v-card class="feature_tit pt-5 pb-5">
			<p>제품구조</p>
		</v-card>
		<v-row class="ma-0 feature_table">
			<v-col
                v-if="mainImage"
                cols="12"
                class="pa-0 pb-10 item"
            >
				<v-col cols="10" sm="7" md="6" lg="4">
					<v-img
                        eager
						width="100%"
						height="100%"
						:src="mainImage"
					/>
				</v-col>
			</v-col>
			<v-col
				v-for="(item, i) in items"
				:key="i"
				cols="12"
				md="6"
				class="pa-0 pt-5 pb-5 pt-md-10 pb-md-10 item"
			>
				<v-row class="ma-0">
					<v-col cols="3" class="pa-0" v-if="item.title !== null">
						<p class="structure_num pa-1 pa-sm-2">{{ i+1 }}</p>
					</v-col>
					<v-col cols="9" class="pa-0" align="start">
						<p class="tit mb-3">{{ item.title }}</p>
						<span class="text">{{ item.text }}</span>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
export default {
    name: 'HomeProductDetailStructure',
	data: ()=>({
	}),
    props:[
        'mainImage',
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
.structure_num{
	width:60px !important;
	height:60px !important;
	font-size:26px !important;
	vertical-align:middle !important;
	color:#42883d !important;
	border:1px solid #42883d !important;
}

@media all and (max-width:380px){
	.structure_num{
		width:40px !important;
		height:40px !important;
		font-size:17px !important;
	}
}
</style>

