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
						v-if="menu.image_url"
						eager
						:src="menu.image_url"
						width="100%"
						class="card_type1_img"
					/>
				</v-col>
				<v-col
					align="center"
					justify="center"
					class="fill-height card_content_text"
				>
					<p
						v-if="menu.title"
						class="title"
					>
						{{ menu.title }}
					</p>
					<p
						v-if="appState"
						class="name"
					>
						{{ appState.text }}
					</p>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import admin from '@/mixins/admin'

export default {
	name: 'UserAgencyHousewarmingCard',
	mixins: [admin],
	props: ['menu'],
	data: () => ({}),
	computed: {
		appState() {
			return this.admin_quality_statusItems.find(item => item.value === this.menu.app_state) || ''
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['AGENCY_MU_HOUSEWARMING_SELECT']),
		onClick() {
			// this.$emit('submit', this.menu)
			this.AGENCY_MU_HOUSEWARMING_SELECT(this.menu)
			this.$router.push(`/user/listDetail/4`)
		},
	},
}
</script>

<style scoped lang="scss">
// 두줄이상 (...)처리
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}
.card_type {
	border-radius: 0;
	width: 190px;
	height: 270px;

	.card_content_text {
		color: #040000;
		letter-spacing: -1px;
		word-break: keep-all;
		.title {
			@include ellipsis_2;
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 14px !important;
			max-width: 95%;
		}
	}
}
.card_type1_img {
	height: 200px;
}

@media all and (max-width: 440px) {
	.card_type {
		.card_type1_img {
			height: 130px;
		}
		width: 135px;
		height: 200px;
	}
}
@media all and (max-width: 350px) {
	.card_type {
		.card_type1_img {
			height: 200px;
		}
		width: 200px;
		height: 280px;
	}
}
</style>
