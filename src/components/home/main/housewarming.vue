<template>
	<v-col class="pa-0 housewarming">
		<div class="wrapper px-5">
			<v-row class="ma-0">
				<!-- 컨트롤 (3D집들이 or 전문가집들이) -->
				<v-col
					class="pa-0 pt-0 pt-md-15"
					cols="12"
					md="3"
				>
					<div class="pr-9">
						<div v-if="tab">
							<p class="tit mb-3">3D 집들이</p>
							<span class="desc">동화자연마루 3D쇼룸에서<br />우리집에 어울리는 제품을 손쉽게 골라보세요!</span>
						</div>
						<div v-else>
							<p class="tit mb-3">전문가 집들이</p>
							<span class="desc">전문가 시공 사례를 통해<br />우리집에 꼭 맞는 인테리어 컨셉을 찾아보세요!</span>
						</div>

						<div class="btn_group mt-5 mt-md-10">
							<v-col class="pa-0 mb-2">
								<v-btn
									:class="tab ? 'on_click' : ''"
									@click="tab = true"
								>
									<v-row class="ma-0 px-2">
										<v-col
											class="pa-0 text"
											cols="10"
											align="start"
										>
											<span class="pr-2 num">01.</span> 3D집들이
										</v-col>
										<v-col
											class="pa-0 arrow"
											cols="2"
											align="end"
										>
											<v-icon>east</v-icon>
										</v-col>
									</v-row>
								</v-btn>
							</v-col>
							<v-col class="pa-0">
								<v-btn
									:class="!tab ? 'on_click' : ''"
									@click="tab = false"
								>
									<v-row class="ma-0 px-2">
										<v-col
											class="pa-0 text"
											cols="10"
											align="start"
										>
											<span class="pr-2 num">02.</span> 전문가집들이
										</v-col>
										<v-col
											class="pa-0 arrow"
											cols="2"
											align="end"
										>
											<v-icon>east</v-icon>
										</v-col>
									</v-row>
								</v-btn>
							</v-col>
						</div>
					</div>
				</v-col>

				<!-- 집들이 컨텐츠 슬라이드 -->
				<v-col
					class="pa-0 mt-5 mt-md-0"
					cols="12"
					md="9"
				>
					<div class="tar">
						<v-btn
							class="pa-0"
							text
							@click="pushLink"
						>
							더보기 >
						</v-btn>
					</div>
					<div class="card_align">
						<CommonCardMenuGroup01
							:menu-type="'housewarming'"
							:hide-arrow="true"
							:card-menu="housewarmingItems"
							@submit="onClickProduct"
						/>
					</div>
				</v-col>
			</v-row>
		</div>
	</v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeMainHousewarming',
	mixins: [common],
	data: () => ({
		tab: true,
	}),
	computed: {
		...mapGetters(['HOME_GET_MAIN_HOUSEWARMING_3D', 'HOME_GET_MAIN_HOUSEWARMING_SPECIAL']),
		housewarmingItems() {
			const items = this.tab ? this.HOME_GET_MAIN_HOUSEWARMING_3D : this.HOME_GET_MAIN_HOUSEWARMING_SPECIAL
			return items.sort(() => Math.random() - 0.5)
		},
	},
	created() {},
	mounted() {},
	methods: {
		onClickProduct(val) {
			console.log(val)
			this.common_link_pusher(val)
		},
		pushLink() {
			if (this.tab) {
				this.$router.push('/housewarming/3d')
			} else {
				this.$router.push('/housewarming/specialist')
			}
		},
	},
}
</script>

<style lang="scss" scoped>
// 집들이
.housewarming {
	padding: 60px 0 !important;
	.tit {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 28px !important;
		color: #262626;
	}
	.desc {
		font-family: 'NotoSansKR-Light' !important;
		font-size: 1.05em !important;
		color: #262626;
	}
	.btn_group {
		.v-btn {
			width: 100%;
			max-width: 350px;
			height: 56px;
			box-shadow: none;
			border-radius: 13px;
			border-bottom-right-radius: 0;
			border: 1px solid #333;
			background-color: #fff;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 16px !important;
			color: #333;
			.text {
				float: left;
			}
			.arrow {
				float: right;
				color: #fff;
			}
			.num {
				font-family: 'Roboto-Bold' !important;
				font-size: 15px !important;
				color: #a0a1a5;
			}
			&.on_click {
				background-color: #333;
				.num {
					color: #fff;
				}
				.text {
					color: #fff;
				}
				.arrow {
					color: #7be82f;
				}
			}
		}
	}
}
</style>
