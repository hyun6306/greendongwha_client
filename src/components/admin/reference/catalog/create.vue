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
								v-model="models.title"
								title="*자료명"
								input
							/>
						</v-col>
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
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.description"
								title="내용"
								input
								:fill="true"
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
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="brandGoods"
								title="*브랜드 / 제품"
								input-multi
								:input-multi-group="admin_brandFilter"
								:input-multi-item="admin_productFilter"
								:fill="true"
								@groupSelect="selectGroup"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.thumbnail === null"
								v-model="thumbnail"
								title="*썸네일"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="*썸네일"
								:text-button="thumbnailDeleteButton"
								:fill="true"
								@click="
									models.thumbnail = null
									thumbnail = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.image === null"
								v-model="image"
								title="*파일첨부"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="*파일첨부"
								:text-button="imageDeleteButton"
								:fill="true"
								@click="
									models.image = null
									image = null
								"
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
									:disabled="allowValue"
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
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminReferenceCatalogCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'Y',
			title: null,
			description: null,
			part: null,
			type: null,
			brand: null,
			thumbnail: null,
			image: null,
			brandGoods: [],
		},
		brandGoods: [],
		partModel: null,
		typeModel: null,
		brandModel: null,
		thumbnail: null,
		image: null,
		thumbnailDeleteButton: null,
		imageDeleteButton: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_ADMIN_USER',
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
		]),
		allowValue() {
			const checkValue = ['part', 'type']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['title']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			if (!this.models.brandGoods.length) return true

			const checkImage = ['thumbnail', 'image']
			for (let i of checkImage) {
				if (this[i] === null) return true
			}

			return false
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		brandGoods(val) {
			this.models.brandGoods = val
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
			if (this.models.brand !== val) this.models.product = null
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') {
			this.models = {
				use_yn: this.editItem.use_yn,
				title: this.editItem.catalogue_name,
				description: this.editItem.description,
				thumbnail: this.editItem.catalogue_thumb_url,
				image: this.editItem.catalogue_url,
				brandGoods: [],
			}

			// catalogue_mapping
			if (this.editItem.catalogue_mapping?.length) {
				// brandGoods parsing
				this.editItem.catalogue_mapping.forEach(element => {
					if (element.brand_code.length) {
						const item = {
							brand: this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.find(
								item => item.brand_code === element.brand_code,
							),
							product: null,
						}
						if (element.goods_code) {
							item.product = this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.find(
								item => item.goods_code === element.goods_code,
							)
						}
						this.models.brandGoods.push(item)
						this.brandGoods.push(item)
					}
				})

				// subject_code추출
				this.partModel =
					this.admin_dataFindItems_code(
						this.editItem.catalogue_mapping[0]?.subject_code,
						'subject_code',
						this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS,
					)[0] || null

				// kind_code추출
				this.typeModel =
					this.admin_dataFindItems_code(
						this.editItem.catalogue_mapping[0]?.kind_code,
						'kind_code',
						this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS,
					)[0] || null
			}
			console.log('this.models', this.models)

			// 썸네일
			if (this.editItem.catalogue_thumb_url) {
				this.thumbnail = this.editItem.catalogue_thumb_url
				this.thumbnailDeleteButton = {
					text: this.editItem.catalogue_thumb_url,
					button: {
						text: '썸네일 삭제',
						color: 'primary',
					},
				}
			} else {
				this.thumbnail = null
				this.models.thumbnail = null
			}

			// 자료
			if (this.editItem.catalogue_url) {
				this.image = this.editItem.catalogue_url
				this.imageDeleteButton = {
					text: this.editItem.catalogue_url,
					button: {
						text: '파일 삭제',
						color: 'primary',
					},
				}
			} else {
				this.image = null
				this.models.image = null
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		}

		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_REFERENCE_CATALOG']),
		resetData() {
			this.models = {
				use_yn: 'Y',
				title: null,
				thumbnail: null,
				part: null,
				type: null,
				brand: null,
				image: null,
				brandGoods: [],
			}

			this.brandGoods = []
			this.partModel = null
			this.typeModel = null
			this.brandModel = null
			this.thumbnail = null
			this.image = null
			this.thumbnailDeleteButton = null
			this.imageDeleteButton = null
			this.origin = {}
			this.loading = false
		},
		selectGroup(val) {
			console.log('selectGroup', val)
			this.brandModel = val
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn, // 사용여부
				catalogue_name: this.models.title, // 자료명
				description: this.models.description, // 자료 설명
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // user id
			}

			if (this.mode === 'create') {
				// 등록
				// 이미지가 있는 경우 image param을 추가 없는 경우 param명을 넣지 않음
				if (this.image != null) params.catalogueurl = this.image
				if (this.thumbnail != null) params.cataloguethumburl = this.thumbnail
			} else {
				params.catalogue_id = this.editItem.catalogue_id
				// 수정
				// 필수값이므로 수정만 제공
				if (this.image != null && this.image !== this.editItem.catalogue_url) {
					params.catalogueurl = this.image
					params.catalogue_url = this.editItem.catalogue_url
				}

				// 필수값이므로 수정만 제공
				if (this.thumbnail != null && this.thumbnail !== this.editItem.catalogue_thumb_url) {
					params.cataloguethumburl = this.thumbnail
					params.catalogue_thumb_url = this.editItem.catalogue_thumb_url
				}
			}

			console.log('params', params)
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_REFERENCE_CATALOG(items).then(res => {
					console.log('ADMIN_ACT_REFERENCE_CATALOG', res)
					const id = this.mode === 'edit' ? this.editItem.catalogue_id : res.catalogue_id
					if (id === null) this.$toastr.error('등록에 실패하였습니다.', '카탈로그 등록 오류', { timeOut: 2500 })
					this.apiMapping(id)
				})
			} catch (e) {
				console.log('ADMIN_ACT_REFERENCE_CATALOG_error', e)
				this.loading = false
			}
		},
		async apiMapping(id) {
			const params = []

			if (this.models.brandGoods.length === 0) {
				this.loading = false
				return this.$toastr.error('제품을 선택해 주세요.', '카탈로그 등록 오류', { timeOut: 2500 })
			}

			// catalogue_mapping 등록
			this.models.brandGoods.forEach(element => {
				const item = {
					regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
					subject_code: this.partModel.subject_code || null,
					kind_code: this.typeModel.kind_code || null,
					brand_code: element.brand?.brand_code || null,
					goods_code: element.product?.goods_code || null,
					catalogue_id: id,
				}
				params.push(item)
			})

			const items = { method: 'mapping', params: params }

			console.log('items', items)
			try {
				await this.ADMIN_ACT_REFERENCE_CATALOG(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_REFERENCE_CATALOG', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
