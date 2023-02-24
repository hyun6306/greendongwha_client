<template>
	<v-col
		class="ma-0 pa-0 card_type"
		elevation="0"
		@click="onClick"
	>
		<v-col class="pa-0">
			<v-img
				v-if="menu.image"
				:src="menu.image"
				width="100%"
				class="card_type1_img"
			/>
		</v-col>
		<v-col
			align="center"
			justify="center"
			class="pa-0 py-3 card_content_text fill-height"
		>
			<p class="title" v-if="menu.title">{{menu.title}}</p>
			<p class="sub_title" v-if="menu.subText">{{menu.subText}}</p>
		</v-col>
	</v-col>
</template>

<script>
export default {
	name: 'UserUserScrapCard',
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
// 한줄이상 (...)처리
@mixin ellipsis {
    display:block;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
}

// 두줄이상 (...)처리
@mixin ellipsis_2 {
	display: -webkit-box !important;
    word-wrap:break-word !important;
    -webkit-line-clamp:2 !important;
    -webkit-box-orient:vertical !important;
    overflow:hidden !important;
    text-overflow:ellipsis !important;
}

.card_type{
	width:190px;
	min-height:260px;
	border-radius:0;

	.card_type1_img{height:200px;}
	.card_content_text{
		color:#262626;
		word-break:keep-all;

		.title{
			@include ellipsis_2;
			max-width: 95%;
			font-family:'NotoSansKR-Bold' !important;
			font-size:14px !important;
			line-height:1.2;
		}
		.sub_title{
			@include ellipsis;
			max-width: 95%;
			font-family:'NotoSansKR-Light' !important;
			font-size:14px !important;
		}
	}
}



@media all and (max-width:440px){
	.card_type{
		.card_type1_img{
			height: 130px;
		}
		width: 135px;
		height: 200px;
	}

}
@media all and (max-width:350px){
	.card_type{
		.card_type1_img{
			height: 200px;
		}
		width: 200px;
		height: 280px;
	}

}
</style>
