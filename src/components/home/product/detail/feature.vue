<template>
	<v-col cols="12" align="center">
		<v-card class="feature_tit pt-5 pb-5">
			<p>특장점</p>
		</v-card>
		<v-row class="ma-0 feature_table">
			<v-col
				v-for="(item, i) in items"
				:key="i"
				cols="12"
				md="6"
				class="pa-0 py-10 item"
			>
				<v-row class="ma-0 fill-height">
					<v-col cols="3" class="pa-0">
						<v-img
							width="80"
							height="80"
							class="icon"
							:src="item.mainImage"
                            eager
						/>
					</v-col>
					<v-col cols="9" class="pa-0" align="start">
						<p class="tit mb-3">{{ item.title }}</p>
						<span class="text">{{ item.text }}</span>
					</v-col>
					<v-row class="ma-0" justify="center" align="center">
						<v-col
							cols="12"
							class="pa-0 fill-height"
							align="center"
							v-if="item.subImage"
						>
							<v-img
								class="mt-5"
								width="200"
								:src="item.subImage"
                                eager
							/>
						</v-col>
					</v-row>
				</v-row>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
export default {
    name: 'HomeProductDetailFeature',
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
</style>

