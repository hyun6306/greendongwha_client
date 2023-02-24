<template>
	<div class="mb-5 mx-0 mx-lg-3 item">
		<v-col class="pa-0 bg_event">
			<div class="category">
				<div class="tit">
					<router-link
						tag="div"
						to="/community/event"
						class="mb-3 d-flex clickCursor"
					>
						<v-img
							:src="require('@/assets/img/community/icon_event.svg')"
							max-width="27"
							height="100%"
						/>
						<p class="mr-1">이벤트</p>
						<v-img
							:src="require('@/assets/img/community/arrow_white.svg')"
							max-width="22"
							height="100%"
						/>
					</router-link>

					<span> 동화자연마루의 다양한 이벤트를 만나보세요 </span>
				</div>
			</div>
		</v-col>
		<v-col class="px-4 py-5 px-lg-5 cont">
			<v-carousel
				hide-delimiters
				height="auto"
			>
				<template #prev="{ on }">
					<v-btn
						icon
						color="#F8F8F8"
						v-on="on"
						><v-icon size="36">mdi-chevron-left</v-icon></v-btn
					>
				</template>
				<template #next="{ on }">
					<v-btn
						icon
						color="#F8F8F8"
						v-on="on"
						><v-icon size="36">mdi-chevron-right</v-icon></v-btn
					>
				</template>
				<v-carousel-item
					v-for="(item, i) in HOME_GET_COMMUNITY_EVENT"
					:key="i"
					eager
					width="100%"
				>
					<div
						class="event_list clickCursor"
						@click="goEventDetail(item.event_id)"
					>
						<v-img
							:src="item.image_url"
							width="100%"
							aspect-ratio="1"
						/>
						<p class="my-4 tit">{{ item.event_title }}</p>
						<p class="text">기간 : {{ item.start_date }} ~ {{ item.end_date }}</p>
						<p class="text">당첨자 발표 : {{ item.result_date }}</p>
					</div>
					<!-- <CommonCardMenuCard06
						:menu="item"
						:is-home="true"
					/> -->
				</v-carousel-item>
			</v-carousel>
		</v-col>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'CommunityHomeEvent',
	components: {},
	data: () => ({}),
	computed: {
		...mapGetters(['HOME_GET_COMMUNITY_EVENT']),
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		goEventDetail(id) {
			this.$router.push({
				name: 'Community_Event_Detail',
				params: {
					id,
				},
			})
		},
	},
}
</script>

<style scoped lang="scss">
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
	}

	.bg_event {
		padding: 30px 20px 40px !important;
		background-color: #78c046;
	}

	.event_list {
		.v-image {
			border-radius: 4px;
		}
		.tit {
			color: $color_font;
			font-size: $font_lg;
			font-weight: $fw_normal;
		}
		.text {
			color: #9e9e9e;
			font-size: $font_normal;
			font-weight: $fw_normal;
		}
	}
}
:deep(.v-window__prev) {
	position: absolute;
	top: 40%;
	left: -30px;
	background: rgba(0, 0, 0, 0.3);
	z-index: 99;
}
:deep(.v-window__next) {
	position: absolute;
	top: 40%;
	right: -30px;
	background: rgba(0, 0, 0, 0.3);
}
.v-carousel {
	overflow: inherit;
}

@media all and (max-width: 1264px) {
	.item {
		border-radius: 0 !important;
		.cont {
			margin-top: 0 !important;
			border-radius: 0 !important;
		}
		.bg_event {
			padding: 20px 16px !important;
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
		.event_list {
			.tit {
				font-size: $font_normal !important;
			}
		}
	}
}
</style>
