<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? `${title} 등록` : `${title} 수정`"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-container class="admin_table">
					<div v-if="mode === 'edit'">
						<h3 class="py-3 pl-2">< 작성자 정보 ></h3>
						<v-row class="ma-0 admin_table_area">
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="인테리어점"
									:text="editItem.business_name"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="대표"
									:text="editItem.boss_name"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="사업자 번호"
									:text="editItem.corporate_no"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="회사 전화"
									:text="editItem.company_tel"
								/>
							</v-col>
							<v-col
								cols="12"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="회사 ID"
									:text="editItem.login_id"
									:fill="true"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="이름"
									:text="editItem.manager_name"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="휴대폰"
									:text="editItem.manager_hand"
								/>
							</v-col>
						</v-row>
					</div>
					<h3 class="py-3 pl-2">< 콘텐츠 정보 ></h3>
					<v-row class="ma-0 admin_table_area">
						<v-col
							v-if="mode === 'edit'"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.status"
								title="*상태"
								:select="admin_quality_statusItems"
							/>
						</v-col>
						<v-col
							v-if="mode === 'edit'"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="조회수"
								:text="String(editItem.hits)"
							/>
						</v-col>
						<v-col
							v-if="mode === 'edit'"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.app_desc"
								title="수정 의견"
								:textarea-button="{
									text: models.app_desc,
									button: {
										text: '수정로그 확인',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="logDialog = true"
							/>
						</v-col>
						<v-col
							v-else
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*시공 업체"
								:text-button="{
									text: corporateSelectInfo,
									button: {
										text: '업체 찾기',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="corporateDialog = true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="spaciousCodeItems"
								v-model="models.spacious_code"
								title="*평형 (㎡)"
								:select="spaciousCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="familyCodeItems"
								v-model="models.familytype_code"
								title="*가족형태"
								:select="familyCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="toneCodeItems"
								v-model="models.tone_code"
								title="*톤"
								:select="toneCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="styleCodeItems"
								v-model="models.style_code"
								title="*스타일"
								:select="styleCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="featureCodeItems"
								v-model="models.feature_code"
								title="제품특성"
								:select="featureCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="formCodeItems"
								v-model="models.form_code"
								title="*형태"
								:select="formCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.image_url === null"
								v-model="image_url"
								title="*대표이미지"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="대표이미지"
								:text-button="{
									text: image_url,
									button: {
										text: '대표이미지 삭제',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="
									models.image_url = null
									image_url = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.tags"
								title="태그"
								tag-input
								:tag-input-group="ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS"
								:tag-input-items="ADMIN_GET_PRODUCT_TAG_ITEMS"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*시공주소"
								:text-button="{
									text: models.zipcode ? `${models.zipcode} ) ${models.address1}` : '',
									button: {
										text: '주소 찾기',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="postApi"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*위도"
								:text="models.latitude"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*경도"
								:text="models.longitude"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="*제목"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*내용"
								:text-button="{
									text: models.description,
									button: {
										text: 'Editor 열기',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="onEditDialog = true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="partModel"
								title="*품목"
								:select="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="typeModel"
								title="*종류"
								:select="admin_typeFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="brandModel"
								title="*브랜드"
								:select="admin_brandFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="productModel"
								title="*제품"
								:select="admin_productFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="patternModel"
								title="*패턴"
								:select="admin_patternFilter"
							/>
						</v-col>
						<v-col
							v-if="mode === 'edit'"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="editItem.regi_date"
							/>
						</v-col>
						<v-col
							v-if="mode === 'edit'"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리자"
								:text="editItem.modify_userid"
							/>
						</v-col>
						<v-col
							v-if="mode === 'edit'"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리일"
								:text="editItem.app_modify_date"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						md="6"
						class="pl-0"
					>
						<v-row class="ma-0">
							<v-col cols="6">
								<v-btn
									color="error"
									block
									tile
									elevation="0"
									@click="$emit('close')"
								>
									<v-icon>clear</v-icon>
									<span class="ml-2">취소</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'create'"
								cols="6"
							>
								<v-btn
									color="primary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>add</v-icon>
									<span class="ml-2">등록</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'edit'"
								cols="6"
							>
								<v-btn
									color="secondary"
									block
									tile
									elevation="0"
									:disabled="editValue"
									@click="onApiCallItem"
								>
									<v-icon>edit</v-icon>
									<span class="ml-2">수정</span>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-card>

		<!-- 수정이력 Dialog -->
		<CommonDialogTableDialog
			v-if="logDialog"
			:title="'수정이력 확인'"
			:dialog="logDialog"
			:items="logData"
			@close="logDialog = false"
		/>

		<!-- 업체찾기 Dialog -->
		<AdminDisplayHouseSpecialCorporateDialog
			v-if="corporateDialog"
			:title="'업체 찾기'"
			:dialog="corporateDialog"
			@submit="selectCorporate"
			@close="corporateDialog = false"
		/>

		<!-- editor -->
		<CommonEditorQuillEditorDialog
			v-if="onEditDialog"
			:dialog="onEditDialog"
			:edit-contents="models.description"
			@save="contentSave"
			@close="onEditDialog = false"
		/>

		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'
import kakao_post from '@/mixins/kakao_post'
import kakao_map from '@/mixins/kakao_map'

export default {
	name: 'AdminDisplayHouseSpecialCreate',
	mixins: [model, common, admin, kakao_post, kakao_map],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			corporate_name: null,
			corporate_no: null,

			status: null,
			app_desc: null,

			spacious_code: null,
			familytype_code: null,
			style_code: null,
			tone_code: null,
			feature_code: null,
			form_code: null,

			image_url: null,
			tags: [],

			zipcode: null,
			address1: null,
			latitude: null,
			longitude: null,

			title: null,
			description: null,

			part: null,
			type: null,
			brand: null,
			product: null,
			pattern: null,
		},
		origin: {},
		logDialog: false,
		corporateDialog: false,
		onEditDialog: false,
		loading: false,

		image_url: null,

		spaciousCodeItems: null,
		familyCodeItems: null,
		styleCodeItems: null,
		toneCodeItems: null,
		featureCodeItems: null,
		formCodeItems: null,

		partModel: null,
		typeModel: null,
		brandModel: null,
		productModel: null,
		patternModel: null,

		description: null,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS', 'ADMIN_GET_PRODUCT_TAG_ITEMS']),
		logData() {
			if (this.editItem === undefined) return []
			let data = []
			this.editItem.expapproval_list.forEach(element => {
				let item = {}
				let state = this.admin_quality_statusItems.find(x => x.value === element.app_state).text
				item.title = `${state} - ${element.modify_date} `
				item.contents = `${element.app_desc}`
				data.push(item)
			})
			return data
		},
		allowValue() {
			const checkValue = [
				'spacious_code',
				'familytype_code',
				'style_code',
				'tone_code',
				'form_code',
				'part',
				'type',
				'brand',
				'product',
				'pattern',
			]
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['corporate_no', 'zipcode', 'title', 'description']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			return this.image_url === null
		},
		editValue() {
			const checkValue = [
				'spacious_code',
				'familytype_code',
				'style_code',
				'tone_code',
				'form_code',
				'part',
				'type',
				'brand',
				'product',
				'pattern',
			]
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['zipcode', 'title', 'description']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			return this.image_url === null
		},
		corporateSelectInfo() {
			let corporate = ''
			if (this.models.corporate_no)
				corporate = `${this.models.corporate_name} | ${this.common_number_filter(this.models.corporate_no, 'business')}`
			return corporate
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		partModel(val) {
			this.models.part = val
			if (this.models.part !== val) this.typeModel = null
		},
		typeModel(val) {
			this.models.type = val
			if (this.models.type !== val) this.brandModel = null
		},
		brandModel(val) {
			this.models.brand = val
			if (this.models.brand !== val) this.productModel = null
		},
		productModel(val) {
			this.models.product = val
			if (this.models.product !== val) this.patternModel = null
		},
		patternModel(val) {
			this.models.pattern = val
		},
	},
	async created() {
		await this.getTagItems()
		await this.getPublicCode()
	},
	async mounted() {
		this.kakao_map_start()
	},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_TAG_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 전문가 집들이 API
			'ADMIN_ACT_DISPLAY_HOUSE_SPECIAL',
		]),
		async getTagItems() {
			await this.ADMIN_ACT_PRODUCT_TAG_ITEMS({ method: 'getGroupItems', params: {} })
			await this.ADMIN_ACT_PRODUCT_TAG_ITEMS({ method: 'getItems' })
		},
		async getPublicCode() {
			this.loading = true

			// 평형코드 가져오기
			this.spaciousCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '902' })
			// 가족형태코드 가져오기
			this.familyCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '903' })
			// 스타일코드 가져오기
			this.styleCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '904' })
			// 톤코드 가져오기
			this.toneCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '905' })
			// 제품특성코드 가져오기
			this.featureCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '907' })
			// 형태코드 가져오기
			this.formCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '908' })

			if (this.editItem && this.mode === 'edit') {
				// 상세 내용 가져오기
				this.ADMIN_ACT_DISPLAY_HOUSE_SPECIAL({ method: 'detail', query: this.editItem.exphw_id }).then(res => {
					this.description = res.description
					this.startDataMapping()
				})
			}

			this.loading = false
			console.log('editItem', this.editItem, this.models)
		},
		startDataMapping() {
			this.models = {
				status: this.admin_quality_statusItems.find(x => x.text === this.editItem.status),
				app_desc: this.editItem.app_desc,

				spacious_code: this.editItem.spacious_code
					? this.common_findItem(this.editItem.spacious_code, this.spaciousCodeItems, 'code')
					: null,
				familytype_code: this.editItem.familytype_code
					? this.common_findItem(this.editItem.familytype_code, this.familyCodeItems, 'code')
					: null,
				style_code: this.editItem.style_code
					? this.common_findItem(this.editItem.style_code, this.styleCodeItems, 'code')
					: null,
				tone_code: this.editItem.tone_code
					? this.common_findItem(this.editItem.tone_code, this.toneCodeItems, 'code')
					: null,
				feature_code: this.editItem.feature_code
					? this.common_findItem(this.editItem.feature_code, this.featureCodeItems, 'code')
					: null,
				form_code: this.editItem.form_code
					? this.common_findItem(this.editItem.form_code, this.formCodeItems, 'code')
					: null,

				tags: [],
				image_url: this.editItem.image_url,

				zipcode: this.editItem.zipcode,
				address1: this.editItem.address1,
				latitude: this.editItem.latitude,
				longitude: this.editItem.longitude,

				title: this.editItem.title,
				description: this.description,

				part: this.editItem.subject_code
					? this.common_findItem(this.editItem.subject_code, this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS, 'subject_code')
					: null,
				type: this.editItem.kind_code
					? this.common_findItem(this.editItem.kind_code, this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, 'kind_code')
					: null,
				brand: this.editItem.brand_code
					? this.common_findItem(this.editItem.brand_code, this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, 'brand_code')
					: null,
				product: this.editItem.goods_code
					? this.common_findItem(this.editItem.goods_code, this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS, 'goods_code')
					: null,
				pattern: this.editItem.pattern_code
					? this.common_findItem(
							this.editItem.pattern_code,
							this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS,
							'pattern_code',
					  )
					: null,
			}

			// 등록된 태그 추가
			if (this.editItem.tags.length) {
				this.editItem.tags.forEach(element => {
					let item = {
						group: {
							text: null,
						},
						tag: {
							text: null,
							value: null,
						},
					}
					item.group.text = element.tag_value.split('_')[0]
					item.tag.text = element.tag_value.split('_')[1]
					item.tag.value = element.tag_id
					this.models.tags.push(item)
				})
			}

			this.partModel = this.models.part
			this.typeModel = this.models.type
			this.brandModel = this.models.brand
			this.productModel = this.models.product
			this.patternModel = this.models.pattern

			if (this.editItem.image_url) {
				this.image_url = this.editItem.image_url
			} else {
				this.image_url = null
				this.models.image_url = null
			}

			console.log('end', this.models)

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				corporate_name: null,
				corporate_no: null,

				status: null,
				app_desc: null,

				spacious_code: null,
				familytype_code: null,
				style_code: null,
				tone_code: null,
				feature_code: null,
				form_code: null,

				image_url: null,
				tags: [],

				zipcode: null,
				address1: null,
				latitude: null,
				longitude: null,

				title: null,
				description: null,

				part: null,
				type: null,
				brand: null,
				product: null,
				pattern: null,
			}
			this.origin = {}
			this.logDialog = false
			this.onEditDialog = false
			this.loading = false

			this.image_url = null

			this.spaciousCodeItems = null
			this.familyCodeItems = null
			this.styleCodeItems = null
			this.toneCodeItems = null
			this.featureCodeItems = null
			this.formCodeItems = null

			this.partModel = null
			this.typeModel = null
			this.brandModel = null
			this.productModel = null
			this.patternModel = null
		},
		async postApi() {
			await this.kakao_post_api_call(res => {
				this.models.address1 = res.address
				this.models.zipcode = res.post
				this.getLanLng(res)
			})
		},
		async getLanLng(res) {
			this.kakao_map_search_address_model = res.address.split('(')[0]
			await this.kakao_map_search_places_lanlng('search', res => {
				// console.log('getLanLng', res)
				this.models.latitude = res[0].y
				this.models.longitude = res[0].x
			})
		},
		contentSave(content) {
			this.models.description = content
			console.log('contentSave', content)
		},
		selectCorporate(item) {
			this.models.corporate_name = item.name
			this.models.corporate_no = item.no
			this.corporateDialog = false
		},
		async onApiCallItem() {
			this.loading = true

			console.log('status', this.models.status)

			let params = {
				corporate_no: this.models.corporate_no, // 사업자 등록번호

				spacious_code: this.models.spacious_code?.code || null, // 평형코드
				tone_code: this.models.tone_code?.code || null, // 톤 코드
				familytype_code: this.models.familytype_code?.code || null, // 가족형태 코드
				style_code: this.models.style_code?.code || null, // 스타일 코드
				feature_code: this.models.feature_code?.code || null, // 제품특성 코드
				form_code: this.models.form_code?.code || null, // 형태 코드

				zipcode: this.models.zipcode, // 우편번호
				address1: this.models.address1, // 주소
				latitude: this.models.latitude, // 위도
				longitude: this.models.longitude, // 경도

				title: this.models.title, // 제목
				description: this.models.description, // 내용

				pattern_code: this.models.pattern.pattern_code, // 패턴 코드

				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // 등록자ID
			}

			if (this.mode === 'edit') {
				params.exphw_id = this.editItem.exphw_id // 전문가 집들이 ID
				params.corporate_no = this.editItem.corporate_no // 사업자 등록번호

				params.app_desc = this.models.app_desc // 상태변경 코멘트
				params.app_state = this.models.status.value // 승인상태

				// description 변경이 없을시 삭제
				if (this.description === this.models.description) {
					delete params['description']
				}

				// image 수정 > 필수값이므로 수정만 제공
				if (this.image_url != null && this.image_url !== this.editItem.image_url) {
					params.image = this.image_url
					// 기존 이미지 삭제시
					if (this.editItem.image_url !== null) params.image_url = this.editItem.image_url
				}
			} else {
				params.image = this.image_url
				// params.app_state = this.models.status.value
			}

			// tags
			if (this.models.tags !== [] && this.models.tags.length > 0) {
				this.models.tags.forEach((element, i) => {
					params[`tag${i + 1}`] = element.tag.value
				})
			}

			console.log('params', params)
			let items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_DISPLAY_HOUSE_SPECIAL(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_DISPLAY_HOUSE_SPECIAL', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
