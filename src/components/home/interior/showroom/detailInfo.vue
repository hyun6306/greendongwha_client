<template>
	<div class="product_info mb-0 mb-md-9">
		<v-col
			cols="12"
			class="table_type01 pa-0"
		>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					주소
				</v-col>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					{{ items.address }}
					<v-icon medium>place</v-icon>
				</v-col>
			</v-row>

			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					영업시간
				</v-col>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					{{ items.time }}
				</v-col>
			</v-row>

			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					전화번호
				</v-col>
				<v-col
					cols="9"
					sm="10"
					class="td clickCursor"
					align="start"
					@click="common_phoneCall(items.call)"
				>
					{{ items.call }}
					<v-icon size="20">mdi-cellphone</v-icon>
				</v-col>
			</v-row>

			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					홈페이지
				</v-col>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
					@click="common_onLink(items.homepage)"
				>
					<span class="homepage clickCursor">
						{{ items.homepage }}
					</span>
				</v-col>
			</v-row>

			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					SNS
				</v-col>
				<v-col
					cols="9"
					sm="10"
					class="td sns"
					align="start"
				>
					<CommonButtonsButtonIcon
						v-for="(icon, i) in items.snsItems"
						:key="i"
						:src="icon.src"
						target="_blank"
						class="mr-2"
						@click="common_onLink(icon.link)"
					/>
				</v-col>
			</v-row>

			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					서비스
				</v-col>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					{{ items.service }}
				</v-col>
			</v-row>

			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					취급품
				</v-col>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					<div
						v-for="(item, i) in items.buildType"
						:key="i"
						class="deal_group"
					>
						<v-col
							class="pa-0 mr-2 mr-md-6 deal"
							align="center"
							cols="auto"
						>
							<v-img
								:src="item.src"
								width="50"
							/>
							<p>{{ item.name }}</p>
						</v-col>
					</div>
				</v-col>
			</v-row>
		</v-col>
	</div>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HomeInteriorDetailInfo',
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {
		console.log('detail', this.items)
	},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.sns {
	.v-btn--icon.v-size--default {
		width: 26px !important;
	}
	.v-btn {
		:deep(.v-btn__content) {
			width: 26px !important;
		}
	}
}
.homepage {
	border-bottom: 1px solid #000;
	word-break: break-all;
}
.deal_group {
	.deal {
		float: left;
	}
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.deal {
		:deep(.v-image) {
			width: 36px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.deal {
		:deep(.v-image) {
			width: 36px !important;
		}
	}
}
</style>
