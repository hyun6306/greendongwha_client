<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<!-- 단순 회사정보 -->
			<!-- 단순 회사정보 -->
			<HomeInteriorStoreSimpleInfo :items="storeItems" />

			<!-- 상세 회사정보 & 이미지 -->
			<!-- 상세 회사정보 & 이미지 -->
			<v-row class="ma-0 mt-0 mt-md-7">
				<v-col
					cols="12"
					md="7"
					class="pa-5 pa-md-0 pr-md-5"
				>
					<HomeInteriorStoreDetailInfo :items="storeItems" />
				</v-col>
				<v-col
					cols="12"
					md="5"
					align="start"
					class="pa-0 px-5 pb-5 pa-md-0 pl-md-5"
				>
					<v-img
						:src="storeItems.company_picurl"
						eager
						class="interior_img"
					>
						<v-row
							v-if="!isImage"
							class="ma-0 text_area"
							alig="center"
							justify="center"
						>
							<v-col
								align="center"
								justify="center"
							>
								<p
									v-if="storeItems.business_name"
									class="text_area_title"
								>
									{{ storeItems.business_name }}
								</p>
							</v-col>
						</v-row>
					</v-img>
				</v-col>
			</v-row>

			<div class="d-flex justify-center mb-16 mt-5">
				<CommonButtonsButton02
					v-if="AUTH_GET_USER_AUTH !== 'AGENCY'"
					name="스크랩하기"
					class-name="btn_large"
					color="#70b341"
					class="mr-1"
					@click="scrap_call"
				/>
				<CommonButtonsButton02
					v-if="this.getQuery !== '1378102333'"
					name="견적상담 의뢰"
					class-name="btn_large"
					color="#42883d"
					class="mr-1"
					@click="goToInquire"
				/>
			</div>

			<v-col
				v-if="filterProductItems.length"
				class="mt-10 pa-0"
			>
				<CommonTabsTab02
					v-model="tab"
					:tab-items="tabItems"
					:cols="6"
				/>
			</v-col>

			<v-col
				v-if="filterProductItems.length"
				cols="11"
				md="12"
				align="center"
				class="pa-0 mt-5 layout_align"
			>
				<div class="card_align">
					<CommonCardMenuGroup02
						:menu-type="'product'"
						:card-menu="filterProductItems"
						@submit="pushLink"
					/>
				</div>
			</v-col>

			<div
				v-if="filterProductItems.length > showItemsCount"
				class="btn_bar"
				align="center"
			>
				<CommonButtonsButton02
					:name="`더보기 (${showItemsCount}/${filterProductItems.length})`"
					class-name="btn_more"
					color="#70b341"
					outlined
					@click="showItemsCount += 16"
				/>
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import scrap from '@/mixins/scrap'
import ad_kakao from '@/mixins/ad/kakao'
import ad_naver from '@/mixins/ad/naver'
import ad_mobion from '@/mixins/ad/mobion'

export default {
	name: 'HomeInteriorStoreDetail',
	metaInfo() {
		return {
			title: `${this.storeItems.business_name} | 동화자연마루`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					content: `${this.storeItems.business_name} | 동화자연마루`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: '동화자연마루를 취급하는 전문 인테리어점의 상세정보입니다.',
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/interior/store/detail/${this.getQuery}`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: `${this.storeItems.company_picurl || 'https://www.greendongwha.com/main.png'}`,
				},
			],
		}
	},
	mixins: [common, scrap, ad_kakao, ad_naver, ad_mobion],
	data: () => ({
		showItemsCount: 16,
		tab: 0,
		tabItems: [],
		titleGroup: [],
		storeItems: [],
		expertItems: [],
		productItems: [],
		isImage: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
		getQuery() {
			return this.$route.params.id
		},
		filterProductItems() {
			return this.expertItems.filter(item => item.form === this.tabItems[this.tab].value) || []
		},
	},
	watch: {
		filterProductItems(val) {
			console.log('filterProductItems', val)
		},
	},
	async created() {
		// 인테리어점 상세 정보
		await this.HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_ITEM(this.getQuery).then(res => {
			this.parseData(res)
		})

		// 인테리어점 전문가 집들이
		const params = {
			corporate_no: this.getQuery,
			area_type: '',
		}
		await this.HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_EXPERT_ITEMS(params).then(res => {
			this.parseExpertData(res)
		})
	},
	mounted() {
		// ad_kakao page
		this.ad_kakao_pageScript('store_detail')
		// ad_naver
		this.ad_naver_changeScript(5, 1)
		// ad_mobion page
		this.ad_mobion_page_convertion('page_view_store_detail')
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_INTERIOR']),
		...mapActions(['HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_ITEM', 'HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_EXPERT_ITEMS']),
		parseData(data) {
			// console.log('HOME_ACT_GET_PRODUCT_DETAIL_ITEMS', data[0])
			if (!data) return
			let getData = data[0]
			console.log('getData', getData)
			getData.buildItems = getData.buildtype.map(x => x.code_name)
			this.isImage = getData.company_picurl?.length
			getData.company_picurl = getData.company_picurl?.length
				? getData.company_picurl
				: require('@/assets/img/home/interior/img_store_empty1.png')
			this.storeItems = getData
		},
		parseExpertData(data) {
			console.log('HOME_ACT_INTERIOR_GET_EXPERT_ITEMS', data)
			if (!data) return
			let dataForm = []
			this.expertItems = data

			data.forEach(element => {
				// 전문가 집들이 data parse
				element.image = element.image_url
				element.kind_name = `${element.addr_cut} | ${element.spacious_name}`

				// tab 추출
				if (dataForm.includes(element.form) === false) {
					dataForm.push(element.form)
					this.tabItems.push({
						title: element.form_name,
						value: element.form,
					})
				}

				// tag filter
				element.tags = element.tags.map(x => x.tag_value)
			})
		},
		goToInquire() {
			this.HOME_MU_INTERIOR_SELECT_INTERIOR(this.storeItems)
			this.$router.push('/interior/price/inquire').catch(() => {})
		},
		pushLink(data) {
			let link

			if (data?.hw_id) link = `/housewarming/3d/detail/${data.hw_id}`
			if (data?.exphw_id) link = `/housewarming/specialist/detail/${data.exphw_id}`

			this.$router.push(link).catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
.interior_img {
	max-height: 330px;
}
.interior_bg {
	background: #ededed;
	height: 330px;
	width: 100%;
	opacity: 0.1;
}
.text_area {
	width: 100%;
	height: 330px;
	background-color: rgba(1, 1, 1, 0.4);
	.text_area_title {
		margin-top: 130px;
		font-family: 'NotoSansKR-Bold';
		font-size: 22px;
		color: #fff;
	}
}
.card_align {
	margin: 0 -1% !important;
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.interior_img {
		max-height: 400px !important;
	}
	.text_area {
		height: 400px;
		background-color: rgba(1, 1, 1, 0.4);
		.text_area_title {
			margin-top: 180px;
			font-family: 'NotoSansKR-Bold';
			font-size: 20px;
			color: #fff;
		}
	}
}
@media all and (max-width: 380px) {
	.interior_img {
		max-height: 400px !important;
	}
	.text_area {
		height: 400px;
		background-color: rgba(1, 1, 1, 0.4);
		.text_area_title {
			margin-top: 180px;
			font-family: 'NotoSansKR-Bold';
			font-size: 18px;
			color: #fff;
		}
	}
}
</style>
