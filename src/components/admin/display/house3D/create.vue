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
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="*사용여부"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="조회수"
								:text="editItem ? String(editItem.hits) : ''"
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
								title="평형 (㎡)"
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
								title="*대표이미지"
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
								v-model="models.d3d_image_url"
								title="*3D집들이 URL"
								input
								:fill="true"
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
										text: 'Editor 편집',
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
								v-if="editItem"
								title="등록자"
								:text="editItem.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="editItem"
								title="등록일"
								:text="editItem.regi_date"
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
									:disabled="allowValue"
									elevation="0"
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
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminDisplayHouse3DCreate',
	mixins: [common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'N',

			spacious_code: null,
			familytype_code: null,
			style_code: null,
			tone_code: null,

			image_url: null,
			tags: [],

			title: null,
			description: null,
			d3d_image_url: null,

			part: null,
			type: null,
			brand: null,
			product: null,
		},
		origin: {},
		onEditDialog: false,
		loading: false,

		image_url: null,

		spaciousCodeItems: null,
		familyCodeItems: null,
		styleCodeItems: null,
		toneCodeItems: null,

		partModel: null,
		typeModel: null,
		brandModel: null,
		productModel: null,

		description: null,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS', 'ADMIN_GET_PRODUCT_TAG_ITEMS']),
		allowValue() {
			const checkText = ['title', 'description', 'd3d_image_url']
			let check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			const checkValue = [
				'use_yn',
				'spacious_code',
				'familytype_code',
				'style_code',
				'tone_code',
				'part',
				'type',
				'brand',
				'product',
			]
			check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkImage = ['image_url']
			for (let i of checkImage) {
				if (this[i] === null) return true
			}

			return false
		},
		editValue() {
			for (let i in this.models) {
				if (this.models[i] !== this.origin[i]) return true
			}
			return false
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
		},
	},
	async created() {
		await this.getTagItems()
		await this.getPublicCode()
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_TAG_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 3D 집들이 API
			'ADMIN_ACT_DISPLAY_HOUSE_3D',
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

			if (this.editItem && this.mode === 'edit') {
				// 상세 내용 가져오기
				await this.ADMIN_ACT_DISPLAY_HOUSE_3D({ method: 'detail', query: this.editItem.hw_id }).then(res => {
					this.description = res.description
					this.startDataMapping()
				})
			}

			this.loading = false

			console.log('editItem', this.editItem, this.models, this.origin)
		},
		startDataMapping() {
			this.models = {
				use_yn: this.editItem.use_yn,

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

				image_url: this.editItem.image_url,
				tags: [],
				d3d_image_url: this.editItem.d3d_image_url,

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

			if (this.editItem.image_url) {
				this.image_url = this.editItem.image_url
			} else {
				this.image_url = null
				this.models.image_url = null
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				use_yn: null,

				spacious_code: null,
				familytype_code: null,
				style_code: null,
				tone_code: null,

				image_url: null,
				tags: [],

				title: null,
				description: null,
				d3d_image_url: null,

				part: null,
				type: null,
				brand: null,
				product: null,
			}
			this.origin = {}
			this.onEditDialog = false
			this.loading = false
			this.image_url = null
			this.spaciousCodeItems = null
			this.familyCodeItems = null
			this.styleCodeItems = null
			this.toneCodeItems = null
			this.partModel = null
			this.typeModel = null
			this.brandModel = null
			this.productModel = null
			this.description = null
		},
		contentSave(content) {
			this.models.description = content
			console.log('contentSave', content)
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn, // 상태

				spacious_code: this.models.spacious_code.code, // 평형코드
				tone_code: this.models.tone_code.code, // 톤 코드
				familytype_code: this.models.familytype_code.code, // 가족형태 코드
				style_code: this.models.style_code.code, // 스타일 코드

				title: this.models.title, // 제목
				description: this.models.description, // 내용
				d3d_image_url: this.models.d3d_image_url, // 3d url

				goods_code: this.models.product.goods_code, // 제품 코드

				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // 등록자ID
			}

			// 수정일 경우 hw_id 추가
			if (this.mode === 'edit') {
				params.hw_id = this.editItem.hw_id
				if (this.description === this.models.description) {
					delete params['description']
				}
			}

			// image 수정 > 필수값이므로 수정만 제공
			if (this.image_url != null) {
				if (this.image_url !== this.models.image_url) params.image = this.image_url
				// 기존 이미지 삭제
				if (this.mode === 'edit' && this.models.image_url === null) params.image_url = this.editItem.image_url
			}

			// tags
			if (this.models.tags !== [] && this.models.tags.length) {
				this.models.tags.forEach((element, i) => {
					params[`tag${i + 1}`] = element.tag.value
				})
			}

			console.log('params', params)
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_DISPLAY_HOUSE_3D(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_DISPLAY_HOUSE_3D', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
