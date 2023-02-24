<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<v-col
				class="pa-0"
				cols="12"
				align="center"
			>
				<v-col
					cols="12"
					class="pa-0"
					align="center"
				>
					<h2 class="content_title">인증서/시험성적서</h2>
				</v-col>

				<!-- 탭 -->
				<v-col
					class="pa-0 mb-10"
					cols="12"
					sm="6"
					md="3"
				>
					<CommonCardMenuTypeBtn02
						v-model="toggleCertificate"
						:type-items="toggleCertificateTabItems"
						:cols="6"
					/>
				</v-col>

				<!-- 검색 -->
				<v-row class="ma-0 d-flex justify-space-between">
					<v-col
						cols="12"
						sm="5"
						md="4"
						lg="3"
						class="pa-0 px-4"
					>
						<CommonInputsInput03
							v-model="searchModel"
							label="검색어를 입력해주세요."
							:height="25"
						/>
					</v-col>
					<v-col
						cols="12"
						sm="3"
						lg="2"
						class="pa-0 px-4 mt-2 mt-sm-0"
					>
						<CommonSelectsSelect01
							v-model="selectModel"
							:items="filterItems"
							:height="25"
						/>
					</v-col>
				</v-row>

				<!-- 내역 -->
				<v-col
					cols="12"
					class="pa-0"
				>
					<v-row class="d-flex ma-0">
						<v-col
							v-for="(item, i) in listItems"
							:key="i"
							cols="12"
							sm="6"
							lg="4"
						>
							<SiteCertificateItem :items="item" />
						</v-col>
					</v-row>
				</v-col>
			</v-col>
			<CommonLoading v-if="loading" />
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'SiteCertificate',
	metaInfo: {
		title: '인증서/시험성적서ㅣ동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '인증서/시험성적서ㅣ동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '인증서/시험성적서, 인증서, 시험성적서',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 인증서/시험성적서입니다.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/site/certificate`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	data: () => ({
		toggleCertificate: 0,
		toggleCertificateTabItems: [{ title: '인증서' }, { title: '시험성적서' }],
		searchModel: '',
		selectModel: { text: '전체', subject_code: null },
		certificateItems: [],
		loading: false,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS', 'SITE_GET_REFERENCE_CERTIFICATION']),
		listItems() {
			const items = this.toggleCertificate === 0 ? this.certificateFilterItems : this.examFilterItems
			return items.filter(item => {
				if (this.selectModel !== null && this.selectModel.subject_code !== null)
					return item.subject_code === this.selectModel.subject_code
				if (this.searchModel.length) return item.docu_name.toLowerCase().includes(this.searchModel.toLowerCase())
				return item
			})
		},
		certificateFilterItems() {
			return this.SITE_GET_REFERENCE_CERTIFICATION.filter(item => item.docu_kind === '1') || []
		},
		examFilterItems() {
			return this.SITE_GET_REFERENCE_CERTIFICATION.filter(item => item.docu_kind === '2') || []
		},
		filterItems() {
			const items = this.toggleCertificate === 0 ? this.certificateFilterItems : this.examFilterItems
			const subjectList = items.map(x => x.subject_code)
			const set = new Set(subjectList)
			const setArr = [...set]
			const filterItems =
				this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.filter(item => setArr.includes(item.subject_code)) || []
			filterItems.unshift({ text: '전체', subject_code: null })
			return filterItems
		},
	},
	watch: {},
	created() {
		if (this.SITE_GET_REFERENCE_CERTIFICATION.length === 0) this.getList()
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.length === 0) this.getPartList()
	},
	mounted() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', 'SITE_ACT_REFERENCE_CERTIFICATION']),
		async getPartList() {
			this.loading = true
			await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('1')
				.then(() => {
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		async getList(params = { exposure_yn: 'Y' }) {
			this.loading = true
			const items = { method: 'get', params: params }
			await this.SITE_ACT_REFERENCE_CERTIFICATION(items)
				.then(res => {
					console.log('SITE_ACT_REFERENCE_CERTIFICATION', res)
					this.certificateItems = res
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
	},
}
</script>

<style scoped lang="scss"></style>
