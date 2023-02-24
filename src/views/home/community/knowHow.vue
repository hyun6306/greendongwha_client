<template>
	<div class="wrapper">
		<v-container
			fluid
			class="pa-0"
		>
			<v-col
				cols="12"
				class="pa-0 px-4"
				align="center"
			>
				<div class="content_title">
					{{ common_title }}
					<p class="sub_title">인테리어부터 생활팁까지 다양한 노하우를 만나보세요</p>
				</div>
			</v-col>

			<CommonTabsTab04
				id="knowhowList"
				v-model="themeModel"
				class="mb-0 mb-sm-7"
				:class-name="'green'"
				:tab-items="themeCodeItems"
			/>

			<v-col
				cols="12"
				class="pa-4 pa-md-0 layout_align"
			>
				<v-row class="ma-0 mb-5">
					<v-col
						cols="6"
						class="pa-0"
						align-self="center"
					>
						<!-- <div class="select_box">
							<CommonSelectsSelect01
								v-model="themeModel"
								:items="themeCodeItems"
								label="테마"
							/>
						</div> -->
						<div class="counter">
							전체
							<strong>{{ knowhowItems.length }}</strong>
							개
						</div>
					</v-col>
					<v-col
						cols="6"
						class="pa-0 tawr"
						align-self="center"
					>
						<v-select
							v-model="selectModel"
							:items="searchItems"
							dense
							prepend-inner-icon="list"
							solo
							class="sm_select"
						></v-select>
					</v-col>
				</v-row>

				<v-col
					cols="12"
					align="center"
					class="pa-0"
				>
					<div class="card_align">
						<CommonCardMenuGroup02
							:menu-type="'product'"
							:card-menu="filterShowItems"
							class="knowhow"
							@submit="onClickKnowHow"
						/>
					</div>
				</v-col>
			</v-col>

			<v-col
				class="pa-0"
				align="center"
			>
				<CommonButtonsButton02
					v-if="knowhowItems.length > showItemsCount"
					:name="`더보기 (${showItemsCount}/${knowhowItems.length})`"
					class-name="btn_more"
					color="#70b341"
					outlined
					@click="showItemsCount += 16"
				/>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCommunityKnowHow',
	metaInfo: {
		title: '노하우 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '노하우 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '인테리어 팁, 생활 팁, 마루 팁, 인테리어 노하우, 마루 노하우',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루를 취급하는 전문 인테리어점의 상세정보입니다.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/community/knowHow`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common],
	data: () => ({
		showItemsCount: 16,
		selectModel: '최신순',
		searchItems: ['최신순', '인기순', '스크랩'],
		themeModel: 0,
	}),
	computed: {
		...mapGetters([
			'APP_GET_SCROLL_BOTTOM', // 스크롤 이벤트
			'HOME_GET_COMMUNITY_KNOW_HOW',
			'HOME_GET_COMMUNITY_KNOW_HOW_CODE',
			'HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS',
		]),
		knowhowItems() {
			return this.HOME_GET_COMMUNITY_KNOW_HOW || null
		},
		themeCodeItems() {
			return this.HOME_GET_COMMUNITY_KNOW_HOW_CODE || null
		},
		filterShowItems() {
			return this.common_product_filter_items(
				this.themeModel
					? this.knowhowItems.filter(x => x.code === this.themeCodeItems[this.themeModel].value)
					: this.knowhowItems,
				this.selectModel,
			)
		},
	},
	watch: {
		APP_GET_SCROLL_BOTTOM() {
			if (this.showItemsCount < this.knowhowItems.length) this.showItemsCount += 16
		},
	},
	async created() {
		if (this.HOME_GET_COMMUNITY_KNOW_HOW_CODE.length === 0) await this.getPublicCode()
		if (this.HOME_GET_COMMUNITY_KNOW_HOW.length === 0) await this.HOME_ACT_COMMUNITY_KNOW_HOW({ method: 'getList' })
		if (this.HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS.length === 0)
			await this.HOME_ACT_COMMUNITY_KNOW_HOW({ method: 'knowhow-pop' })
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_COMMUNITY_KNOW_HOW_CODE']),
		...mapActions([
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 노하우 API
			'HOME_ACT_COMMUNITY_KNOW_HOW',
		]),
		async getPublicCode() {
			// 테마 코드 가져오기
			let themeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '401' })
			themeCodeItems.unshift({ code_name: '전체', code: null })

			this.HOME_MU_COMMUNITY_KNOW_HOW_CODE(themeCodeItems)
		},
		onClickKnowHow(val) {
			// console.log('onClickProduct',val)
			this.$router.push(`/community/knowHow/detail/${val.id}`).catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
.select_box {
	width: 153px;
}
.counter {
	color: $color_font;
}
.sm_select {
	max-width: 80px !important;
	border: 1px solid #d8d8d8;
	:deep(.v-label) {
		color: $color_font;
		font-size: $font_mid !important;
	}
	:deep(.v-text-field__details) {
		display: none !important;
	}
	:deep(.v-input__control) {
		min-height: 30px !important;
	}
	:deep(.v-input__append-inner) {
		display: none !important;
	}
	:deep(.v-input__slot) {
		padding: 0 5px !important;
		margin-bottom: 0 !important;
		box-shadow: none !important;
	}
	:deep(.v-select__selection) {
		font-size: $font_mid !important;
		text-align: center;
	}
	:deep(.v-select__selections) input {
		display: none !important;
	}
	:deep(.v-icon) {
		color: $color_gray6 !important;
	}
}
</style>
