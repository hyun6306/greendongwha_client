<template>
	<div class="mx-0 mx-lg-3 item">
		<v-col class="pa-0 bg_knowhow">
			<div class="category">
				<router-link
					tag="div"
					to="/community/knowhow"
					class="mb-3 tit d-flex clickCursor"
				>
					<p class="mr-1">노하우</p>
					<v-img
						:src="require('@/assets/img/community/arrow_white.svg')"
						max-width="22"
						height="100%"
					/>
				</router-link>

				<span>
					인테리어 Tip & 생활 Tip까지!<br />
					동화만의 다양한 노하우를 지금 확인하세요!
				</span>
			</div>
		</v-col>
		<v-col class="px-4 py-5 px-lg-5 py-lg-7 cont">
			<HomeCommunityHomeKnowhowTipItem
				title="인테리어 Tip"
				:items="filterInteriors"
			/>
			<HomeCommunityHomeKnowhowTipItem
				title="마루 Tip"
				:items="filterMarus"
			/>
			<HomeCommunityHomeKnowhowTipItem
				title="생활 Tip"
				:items="filterLifes"
			/>
		</v-col>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'CommunityHomeKnowhow',
	components: {},
	data: () => ({}),
	computed: {
		...mapGetters(['HOME_GET_COMMUNITY_KNOW_HOW']),
		filterInteriors() {
			return this.HOME_GET_COMMUNITY_KNOW_HOW.filter(item => item.code === 'CC_401_001').slice(0, 2)
		},
		filterMarus() {
			return this.HOME_GET_COMMUNITY_KNOW_HOW.filter(item => item.code === 'CC_401_003').slice(0, 2)
		},
		filterLifes() {
			return this.HOME_GET_COMMUNITY_KNOW_HOW.filter(item => item.code === 'CC_401_002').slice(0, 2)
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

.item {
	background-color: $color_white;
	border-radius: 16px;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	overflow: hidden;

	.category {
		color: $color_white;
		p {
			font-size: $font__sub_tit;
			font-weight: $fw_bold;
			line-height: 1 !important;
		}
		span {
			word-break: keep-all;
			font-size: $font_normal;
			font-weight: $fw_normal;
		}
	}

	.cont {
		position: relative;
		margin-top: -20px;
		border-radius: 16px !important;
		background-color: $color_white;
		h3 {
			color: $color_font;
			font-size: $font_xl;
			font-weight: $fw_bold;
		}
		.card {
			.v-image {
				border-radius: 4px !important;
			}
			.tit {
				@include ellipsis_2;
				color: $color_font;
				font-size: $font_normal;
				font-weight: $fw_normal;
				word-break: keep-all;
			}
		}
	}

	.bg_knowhow {
		position: relative;
		width: 100%;
		height: 312px;
		background: url('../../../../assets/img/community/bg_knowhow.jpg') no-repeat;
		background-size: cover;
		background-position: center;
		.category {
			position: absolute;
			bottom: 15%;
			left: 20px;
		}
	}
}

@media all and (max-width: 1264px) {
	.item {
		border-radius: 0 !important;
		.cont {
			border-radius: 0 !important;
		}
	}
}

@media all and (max-width: 380px) {
	.item {
		.category {
			p {
				font-size: $font_xl !important;
				line-height: 22px !important;
			}
			span {
				font-size: $font_sm !important;
			}
		}
		.cont {
			margin-top: 0px !important;
			h3 {
				font-size: $font_lg !important;
			}
		}
		.bg_knowhow {
			height: 143px !important;
			.category {
				bottom: 20% !important;
				left: 16px !important;
			}
		}
	}
}
</style>
