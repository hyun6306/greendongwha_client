<template>
	<v-card
		class="ma-4 pa-0 card_type"
		elevation="0"
		@click="onClick"
	>
		<v-row
			class="ma-0 card"
			align="center"
			justify="center"
		>
			<v-col cols="12" class="pa-0">
				<div class="history_card pa-7 pa-md-10">
					<v-img
						v-if="menu.image"
						:src="menu.image"
						class="mb-4 card_type4_img"
					>
					</v-img>
					<div class="text">
						<p>{{menu.title}}</p>
						<span class="pb-0">{{menu.date}}</span>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'CardMenuCard04',
	props:['menu'],
	data: () => ({
	}),
	computed: {
	},
	created(){
	},
	mounted(){
	},
	methods:{
		onClick(){
			this.$emit('submit', this.menu)
		},
	}
}
</script>

<style scoped lang="scss">
.card_type {
	border-radius: 0;
	width: 180px;
	height: 180px;
    cursor: pointer;
}
.card_type4_img{
	width: 50px;
}
// 내역카드
.history_card{
	width:180px !important;
	height:180px !important;
	background-color:#f3f4f5 !important;
	.text{
		font-size:14px !important;
		p{font-family: 'NotoSansKR-Bold' !important;}
		span{font-family: 'NotoSansKR-Regular' !important;}
	}
}
@media all and (max-width:600px){
	.card_type{
		width: 180px;
		height: 180px;
	}
	.history_card {
		width: 180px !important;
		height: 180px !important;
	}
	.card_type4_img{
		width: 30px;
	}
}
@media all and (max-width:440px){
	.card_type{
		width: 150px;
		height: 150px;
	}
	.history_card {
		width: 150px !important;
		height: 150px !important;
	}
	.card_type4_img{
		width: 20px;
	}
}
@media all and (max-width:350px){
	.card_type{
		width: 180px;
		height: 180px;
	}
	.history_card {
		width: 180px !important;
		height: 180px !important;
	}
	.card_type4_img{
		width: 50px;
	}
}

</style>
