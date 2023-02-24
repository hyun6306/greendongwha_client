<template>
	<v-dialog
		v-model="dialog"
		persistent
		max-width="760"
	>
		<v-col class="pa-0 py-5 px-3 py-md-10 px-md-7 interial_list_dialog">
			<v-col
				class="pa-0 popup_head"
				width="100%"
				elevation="0"
				tile
			>
				<v-row
					align="center"
					class="ma-0 pb-2"
				>
					<!-- 공통팝업 타이틀 -->
					<v-col
						class="pa-0 pop_title"
						cols="8"
						align="start"
					>
						인테리어 지점 리스트
					</v-col>

					<!-- 팝업닫기 버튼 -->
					<v-col
						class="pa-0"
						cols="4"
						align="end"
					>
						<v-btn
							icon
							large
							class="pa-0"
							@click="$emit('close')"
						>
							<v-icon
								large
								color="black"
								>clear</v-icon
							>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>

			<v-col
				class="pa-0 py-2 popup_cont"
				cols="12"
				align="center"
			>
				<div class="pa-7 notice tal">
					회사는 견적상담 의뢰 서비스 이용을 위해 필요한 최소한의 개인 정보에 대해 이용자가 별도로 동의한 경우에만
					개인정보를 제공하고 있습니다. 제공받는 업체는 제휴 계약에 따라 변경될 수 있으니 수시로 확인하시기 바랍니다.
				</div>
				<div class="title tal pa-4">지점리스트</div>
				<ul
					v-for="(item, i) in filterShowItems"
					:key="i"
					class="interior_list pa-0"
				>
					<li class="pa-5">{{ item.business_name }}</li>
				</ul>
			</v-col>

			<v-col
				class="pa-8"
				align="center"
			>
				<CommonButtonsButton02
					v-if="SITE_GET_USERINFO_INTERIOR_LIST.length > showItemsCount"
					:name="`더보기 (${showItemsCount}/${SITE_GET_USERINFO_INTERIOR_LIST.length})`"
					class-name="btn_more"
					color="#70b341"
					outlined
					@click="showItemsCount += 16"
				/>
			</v-col>
		</v-col>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'InteriorListPopup',
	mixins: [common],
	props: ['dialog'],
	data: () => ({
		showItemsCount: 16,
		models: {
			url: null,
			privateTermsCheck: false,
		},
	}),
	computed: {
		...mapGetters(['SITE_GET_USERINFO_INTERIOR_LIST']),
		filterShowItems() {
			return this.SITE_GET_USERINFO_INTERIOR_LIST.slice(0, this.showItemsCount)
		},
	},
	watch: {},
	created() {
		this.getData()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['SITE_ACT_USERINFO_INTERIOR_LIST']),
		async getData() {
			await this.SITE_ACT_USERINFO_INTERIOR_LIST().then(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.v-dialog) {
	background-color: #fff;
}
.interial_list_dialog {
	max-height: 1020px;
	overflow-y: auto;
}

.popup_head {
	border-bottom: 2px solid #262626;
	.pop_title {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 1.4rem;
	}
}

.popup_cont {
	.notice {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px;
		color: #262626;
	}
	.title {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 15px;
		color: #737373;
		background-color: #f8f8f8;
	}
	.interior_list {
		li {
			list-style: none;
			text-align: start;
			border-bottom: 1px solid #ccc;
		}
	}
}

@media all and (max-width: 600px) {
}
</style>
