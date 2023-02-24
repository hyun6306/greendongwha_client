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
					class="pa-0"
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
				<p class="tit tac">업체명</p>
			</v-col>
			<v-col
				class="pa-0 tal"
				cols="12"
			>
				<p class="mt-2 cont">
					<UserUserEstimateCheckConsult
						v-if="menu.business_name1.length"
						:item="menu.consult_state1"
					/>
					{{ menu.business_name1 }}
				</p>
				<p class="mt-1 cont">
					<UserUserEstimateCheckConsult
						v-if="menu.business_name2.length"
						:item="menu.consult_state2"
					/>
					{{ menu.business_name2 }}
				</p>
				<p class="mt-1 cont">
					<UserUserEstimateCheckConsult
						v-if="menu.business_name3.length"
						:item="menu.consult_state3"
					/>
					{{ menu.business_name3 }}
				</p>
			</v-col>

			<v-col
				class="pa-0 tal"
				cols="12"
			>
				<p class="tit tac">콘텐츠</p>
			</v-col>
			<v-col
				class="pa-0 tal"
				cols="12"
			>
				<p
					v-if="menu.product_kind"
					class="mt-2 cont_tit"
				>
					{{ menu.product_kind }}
				</p>
				<p
					v-if="cardTitle"
					class="mt-1 cont"
				>
					{{ cardTitle }}
				</p>
			</v-col>
		</v-col>
	</v-col>
</template>

<script>
import { mapMutations } from 'vuex'
import admin from '@/mixins/admin'

export default {
	name: 'UserUserEstimateCard',
	mixins: [admin],
	props: ['menu'],
	data: () => ({}),
	computed: {
		status() {
			return this.admin_estimate_consult_statusItems.find(item => item.value === this.menu.consult_state) || []
		},
		cardTitle() {
			return this.menu.card_list?.title ? this.menu.card_list.title : null
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['USER_MU_ESTIMATE_SELECT']),
		onClick() {
			// this.$emit('submit', this.menu)
			this.USER_MU_ESTIMATE_SELECT(this.menu)
			this.$router.push(`/user/listDetail/0`)
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
	height: 308px;
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
		.cont_tit {
			@include ellipsis;
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 14px !important;
			font-weight: bold;
			color: #262626;
			line-height: 1.2;
		}
		.cont {
			@include ellipsis_2;
			height: 35px;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 13px !important;
			color: #262626;
			line-height: 1.2;
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

@media all and (max-width: 600px) {
}
@media all and (max-width: 440px) {
}
@media all and (max-width: 350px) {
}
</style>
