<template>
	<div
		class="showroom_card"
		@click="$emit('click', items.showroom_id)"
	>
		<div class="card_img">
			<v-img
				:src="items.rep_image_url1"
				width="100%"
				max-height="300"
			>
				<div
					v-if="items.new_yn === 'Y'"
					class="flag"
				>
					신규
				</div>
			</v-img>
		</div>
		<div class="card_txt">
			<v-col
				class="pa-0 px-md-3 py-md-4"
				align="start"
			>
				<p class="tit">{{ items.showroom_name }}</p>
				<v-row class="ma-0 mb-2">
					<v-col
						class="pa-0 item"
						cols="auto"
					>
						지역
					</v-col>
					<v-col
						class="pa-0 txt"
						cols="auto"
					>
						{{ items.showroom_addr1 }}
					</v-col>
				</v-row>

				<v-row class="ma-0 mb-2">
					<v-col
						class="pa-0 item"
						cols="auto"
					>
						연락처
					</v-col>
					<v-col
						class="pa-0 txt"
						cols="auto"
					>
						{{ items.security_tel }}
					</v-col>
				</v-row>

				<v-row class="ma-0">
					<v-col
						class="pa-0 item"
						cols="auto"
					>
						취급품목
					</v-col>
					<v-col
						class="pa-0 txt"
						cols="auto"
					>
						{{
							items.buildtype
								.map(x => {
									return x.code_name
								})
								.join(', ')
						}}
					</v-col>
				</v-row>
			</v-col>
		</div>
	</div>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'CardShowRoom',
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
// 한줄이상 (...)처리
@mixin ellipsis {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

// 두줄이상 (...)처리
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

// 카드타입 기본형
.showroom_card {
	width: 23% !important;
	margin: 0 1% 30px;
	float: left;
	background-color: #fff;
	cursor: pointer;
}

.card_img {
	position: relative;
	.v-image {
		height: 300px;
	}
	.flag {
		float: left;
		padding: 7px 10px;
		margin-right: 2px;
		font-family: 'Lucida-Bright' !important;
		font-size: 14px !important;
		font-weight: bold;
		line-height: 1;
		color: #fff !important;
		background-color: #f15283;
	}
}

.card_txt {
	height: 130px;
	color: #262626;
	line-height: 1.2;
	word-break: keep-all;

	.tit {
		@include ellipsis_2;
		margin-bottom: 6px !important;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 18px !important;
	}
	.item {
		position: relative;
		margin-right: 10px;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 14px;
		color: #7f7f7f;
		&:after {
			display: block;
			content: '';
			position: absolute;
			right: -5px;
			top: 2px;
			width: 1px;
			height: 12px;
			background-color: #7f7f7f;
		}
	}
	.txt {
		font-size: 14px;
		font-family: 'NotoSansKR-Regular' !important;
		color: #7f7f7f;
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
	.showroom_card {
		width: 31.3% !important;
	}
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.showroom_card {
		width: 31.3% !important;
	}
	.card_img {
		.v-image {
			height: 225px !important;
		}
		.flag {
			font-size: 13px !important;
		}
	}
	.card_txt {
		.tit {
			font-size: 15px !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.showroom_card {
		width: 48% !important;
	}
	.card_img {
		.v-image {
			height: 163px !important;
		}
		.flag {
			padding: 6px !important;
			font-size: 12px !important;
		}
	}
	.card_txt {
		padding: 8px;
		.tit {
			font-size: 14px !important;
		}
		.item {
			font-size: 12px !important;
		}
		.txt {
			font-size: 12px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.showroom_card {
		width: 48% !important;
	}
	.card_img {
		.v-image {
			height: 163px !important;
		}
		.flag {
			padding: 6px !important;
		}
	}
	.card_txt {
		padding: 4px;
		.tit {
			font-size: 14px !important;
		}
		.item {
			font-size: 12px !important;
		}
		.txt {
			font-size: 12px !important;
		}
	}
}
</style>
