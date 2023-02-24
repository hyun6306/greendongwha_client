<template>
	<div class="inner_wrapper">
		<h3 class="mb-4">전문가 집들이 상세</h3>

		<v-col
			v-if="AGENCY_GET_HOUSEWARMING_SELECT.app_desc"
			class="pa-0"
			align="start"
		>
			<v-card
				elevation="0"
				color="#dfece3"
				class="pa-5 px-8"
			>
				<v-col class="px-0 title">
					<h4>반려 내용</h4>
				</v-col>
				<p>{{ AGENCY_GET_HOUSEWARMING_SELECT.app_desc }}</p>
			</v-card>
		</v-col>

		<v-row class="ma-0">
			<v-col
				cols="12"
				class="header"
			>
				<v-row class="ma-0 mb-0 mb-md-3">
					<v-col
						cols="6"
						class="pa-0 title"
						align="start"
						align-self="center"
					>
						<h4 v-if="AGENCY_GET_HOUSEWARMING_SELECT.title">{{ AGENCY_GET_HOUSEWARMING_SELECT.title }}</h4>
					</v-col>
					<v-col
						cols="6"
						class="pa-0 title"
						align="end"
						align-self="center"
					>
						<span v-if="appState">{{ appState.text }}</span>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-col
			class="body pa-0 pt-7 pt-md-11"
			cols="12"
			align="center"
		>
			<v-col class="pa-0 editor_content">
				<!-- 비주얼영역 -->
				<v-img
					v-if="AGENCY_GET_HOUSEWARMING_SELECT.image_url"
					eager
					width="100%"
					:src="AGENCY_GET_HOUSEWARMING_SELECT.image_url"
				/>

				<!-- 키워드 태그영역 -->
				<HomeProductDetailTags
					v-if="AGENCY_GET_HOUSEWARMING_SELECT.tags.length"
					:items="AGENCY_GET_HOUSEWARMING_SELECT.tags"
				/>

				<v-row class="ma-0 pt-3">
					<v-col
						class="pa-0"
						cols="12"
					>
						<!-- 사례 정보 -->
						<HomeHousewarmingInfoBox
							class="mr-1"
							:items="AGENCY_GET_HOUSEWARMING_SELECT"
						/>
					</v-col>
				</v-row>

				<!-- 에디터 영역 입니다 -->
				<v-card
					v-if="housewarmingItems.description"
					width="100%"
					min-height="500"
					elevation="0"
					color="#f8f8f8"
					class="ma-0 pa-0 mb-5"
				>
					<CommonEditorQuillViewerTile
						class="py-10"
						:html="housewarmingItems.description"
					/>
				</v-card>
				<!-- e : [확인사항] 에디터 편집영역 입니다 -->
			</v-col>
		</v-col>

		<v-col cols="12">
			<v-row class="d-flex justify-center">
				<v-col
					cols="4"
					sm="2"
				>
					<CommonButtonsButton01
						name="수정"
						color="#00582c"
						class-name="edge_8"
						height="50"
						@click="pushModify"
					/>
				</v-col>
				<v-col
					cols="4"
					sm="2"
				>
					<CommonButtonsButton01
						name="삭제"
						color="#9fa1a4"
						class-name="edge_8"
						height="50"
						@click="confirmRemove = true"
					/>
				</v-col>
				<v-col
					cols="4"
					sm="2"
				>
					<CommonButtonsButton01
						outlined
						name="목록"
						color="#9fa1a4"
						class-name="edge_8"
						height="50"
						@click="$router.go(-1)"
					/>
				</v-col>
			</v-row>
		</v-col>
		<CommonConfirm
			:dialog="confirmRemove"
			:title="`전문가 집들이 내용 삭제`"
			:text="`작성하신 전문가 집들이 내용이 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import admin from '@/mixins/admin'

export default {
	name: 'UserAgencyHousewarmingDetail',
	mixins: [admin],
	data: () => ({
		housewarmingItems: {},
		confirmRemove: false,
	}),
	computed: {
		...mapGetters(['AGENCY_GET_HOUSEWARMING', 'AGENCY_GET_HOUSEWARMING_SELECT']),
		getListData() {
			return this.AGENCY_GET_HOUSEWARMING.find(item => item.exphw_id === this.AGENCY_GET_HOUSEWARMING_SELECT.exphw_id)
		},
		appState() {
			return this.admin_quality_statusItems.find(item => item.value === this.getListData.app_state) || ''
		},
	},
	created() {
		if (Object.keys(this.AGENCY_GET_HOUSEWARMING_SELECT).length === 0) this.$router.go(-1)
		this.getDetailItems()
	},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['AGENCY_ACT_HOUSEWARMING']),
		// 전문가 집들이 상세정보 가져오기
		async getDetailItems() {
			const items = {
				method: 'detail',
				query: this.AGENCY_GET_HOUSEWARMING_SELECT.exphw_id,
			}
			await this.AGENCY_ACT_HOUSEWARMING(items).then(res => {
				console.log('house', res)
				this.housewarmingItems = res[0]
			})
		},
		pushModify() {
			this.$router.push('/user/create/4?type=modify')
		},
		async removeData() {
			await this.AGENCY_ACT_HOUSEWARMING({
				method: 'del',
				params: [{ exphw_id: this.AGENCY_GET_HOUSEWARMING_SELECT.exphw_id }],
			}).then(() => {
				this.APP_MU_DIALOG({
					dialog: true,
					title: '전문가 집들이 삭제',
					text: '해당 내용을 삭제하였습니다.',
				})
				this.$router.go(-1)
			})
		},
	},
}
</script>

<style scoped lang="scss">
h3 {
	font-family: 'NotoSansKR-Bold' !important;
	font-size: 20px !important;
}

@media all and (max-width: 767px) {
	h3 {
		font-size: 16px !important;
	}
}
</style>
