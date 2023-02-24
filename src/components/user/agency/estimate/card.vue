<template>
	<v-col
		class="pa-0 card_type"
		elevation="0"
		@click="onClick"
	>
		<v-col class="pa-0 pt-4 px-3 content">
			<v-row class="ma-0">
				<v-col
					class="pa-0 tal"
					cols="6"
				>
					<p class="tit tac">접수일</p>
				</v-col>
				<v-col
					class="pa-0 tar"
					cols="6"
				>
					<span class="date">{{ menu.regi_date.split(' ')[0] }}</span>
				</v-col>
			</v-row>
			<v-divider class="mt-3 mb-4" />

			<v-col
				class="pa-0 tal"
				cols="12"
			>
				<p class="tit tac">고객명</p>
			</v-col>
			<v-col
				class="pa-0 tal"
				cols="12"
			>
				<p class="mt-1 mb-3 cont">{{ menu.login_name }}</p>
			</v-col>

			<v-col
				class="pa-0 tal"
				cols="12"
			>
				<p class="tit tac">제품</p>
			</v-col>
			<v-col
				class="pa-0 tal"
				cols="12"
			>
				<div class="cont pt-2">
					<p class="cont_tit">
						{{ topTitle }}
					</p>
					<p class="cont_sub">
						{{ title }}
					</p>
				</div>
			</v-col>
		</v-col>

		<v-col
			v-if="status.value === '3'"
			class="pa-0 state clear"
		>
			{{ status.text }}
		</v-col>
		<v-col
			v-else
			class="pa-0 state wait"
		>
			{{ status.text }}
		</v-col>
	</v-col>
</template>

<script>
import { mapMutations } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'UserAgencyEstimateCard',
	mixins: [admin, common],
	props: ['menu'],
	data: () => ({}),
	computed: {
		status() {
			const stateItem = this.common_forValueFind(this.menu, 'consult_state', 3)
			return this.admin_estimate_consult_statusItems.find(item => item.value === stateItem) || []
		},
		topTitle() {
			return this.menu.card_list?.top_title || ''
		},
		title() {
			return this.menu.card_list?.title || ''
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['AGENCY_MU_ESTIMATE_SELECT']),
		onClick() {
			// this.$emit('submit', this.menu)
			this.AGENCY_MU_ESTIMATE_SELECT(this.menu)
			this.$router.push(`/user/listDetail/5`)
		},
	},
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

.card_type {
	width: 190px;
	border-radius: 10px;
	box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 5%), 0px 2px 2px 0px rgb(0 0 0 / 5%), 0px 1px 5px 0px rgb(0 0 0 / 10%) !important;
	.content {
		.tit {
			width: 40px !important;
			height: 20px !important;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 13px !important;
			color: #262626;
			background-color: #f1f2f3;
			border-radius: 4px;
		}
		.date {
			font-family: 'NotoSansKR-Medium';
			font-size: 14px !important;
			color: #262626;
		}
		.cont {
			&_tit {
				@include ellipsis;
				min-height: 20px;
				font-family: 'NotoSansKR-Bold' !important;
				font-size: 14px !important;
				color: #262626;
				line-height: 1.2;
			}
			&_sub {
				@include ellipsis_2;
				min-height: 40px;
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 14px !important;
				color: #262626;
				line-height: 1.2;
			}
		}
	}
	.state {
		height: 44px;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		line-height: 44px;
		border-end-start-radius: 10px;
		border-end-end-radius: 10px;
		&.clear {
			color: #fff;
			background-color: #42883d;
		}
		&.wait {
			color: #7f7f7f;
			background-color: #e7e7e7;
		}
	}
}
</style>
