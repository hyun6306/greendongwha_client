<template>
	<v-card
		class="ma-4 pa-0 card_type"
		height="370"
		width="300"
		@click="onClick"
	>
		<v-row
			class="ma-0 card"
			align="center"
			justify="center"
		>
			<v-col cols="12" class="pa-0">
				<v-img
					v-if="menu.image"
					:src="menu.image"
					width="100%"
					height="300"
					class="card_type1_img"
				/>
			</v-col>
			<v-col
                cols="12"
                align="center"
                justify="center"
                class="fill-height card_content_text"
                :class="menu.tags? 'pb-0' : ''"
            >
				<p class="title">{{menu.title}}</p>
				<p class="pb-0 sub_title">{{menu.text}}</p>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'CardMenuCard02',
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
			console.log('gogo menu')
		},
	}
}
</script>

<style scoped lang="scss">
.card_type{
    box-shadow: none !important;
    border-radius:0;
    cursor: pointer;
	.card{
		border:1px solid #ccc;
	}

	.card_content_text{
		min-height:60px;
		padding:20px 14px 10px;
		color:#040000;
		letter-spacing:-1px;
		word-break:keep-all;
		.title{font-family:'NotoSansKR-Bold' !important; font-size:18px;}
		.sub_title{font-family:'NotoSansKR-Light'; font-size:13px; }
	}

	.card_type1_img{
		.menu_type{
			width:80px;
			height:30px;
			line-height:30px;
			background-color:#00592d;
			color:#fff;
			text-align:center;
		}
		.mark{
			width:30px !important;
			height:30px !important;
		}
	}
}
</style>
