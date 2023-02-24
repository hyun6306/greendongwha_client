<template>
	<v-row class="ma-0" justify="center" align="center">
		<v-col cols="6">
			<v-img
				width="100%"
				height="100%"
				:src="require('@/assets/img/home/main/img_my_product.jpg')"
				eager
			/>
		</v-col>
		<v-col cols="12" class="pl-0" align="center">
			<h1>Comming Soon</h1>
			<h3 class="pt-5">페이지 준비중입니다.</h3>
			<h4>2차 오픈일에 서비스가 제공될 예정입니다.</h4>
		</v-col>
	</v-row>
</template>

<script>
export default {
    name: 'Empty',
	props:{
	},
	data: ()=>({
	}),
    components: {
    },
	computed:{
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

