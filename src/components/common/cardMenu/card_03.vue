<template>
	<div>
		<v-card
			class="ma-3 pa-0 card_type"
			elevation="0"
			@click="onClick"
		>
			<v-row
				class="ma-0 card"
				align="center"
				justify="center"
			>
				<v-col class="pa-0">
					<v-img
						v-if="menu.image"
						:src="menu.image"
						width="100%"
						class="card_type1_img"
						eager
					/>
				</v-col>
				<v-col
					align="center"
					justify="center"
					class="fill-height card_content_text"
				>
					<p class="title">{{ menu.text }}</p>
					<p class="pb-0 sub_title">{{ menu.subText }}</p>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
export default {
	name: 'CardMenuCard03',
	props: ['menu'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {},
	methods: {
		onClick() {
			this.$emit('submit', this.menu)
		},
	},
}
</script>

<style scoped lang="scss">
.card_type {
	border-radius: 0;
	width: 185px;
	height: 250px;
	cursor: pointer;
	.card {
		border: 1px solid #ccc;
	}

	.card_content_text {
		color: #040000;
		letter-spacing: -1px;
		word-break: keep-all;
		.title {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 14px !important;
			// ...처리
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 80%;
		}
		.sub_title {
			font-family: 'NotoSansKR-Light' !important;
			font-size: 14px !important;
			// ...처리
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 80%;
		}
	}
}
.card_type1_img {
	height: 190px;
}
@media all and (max-width: 440px) {
	.card_type {
		width: 135px;
		height: 200px;
	}
	.card_type1_img {
		height: 130px;
	}
}
@media all and (max-width: 350px) {
	.card_type {
		width: 200px;
		height: 280px;
	}
	.card_type1_img {
		height: 200px;
	}
}
</style>
