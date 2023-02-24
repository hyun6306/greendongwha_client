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
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상품 ID"
								:text="models.id"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="조회수"
								:text="editItem.hits"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="품목"
								:text="editItem.subject_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="종류"
								:text="editItem.kind_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="브랜드"
								:text="editItem.brand_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제품"
								:text="editItem.goods_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="패턴"
								:text="editItem.pattern_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상품타이틀"
								:text="`${editItem.brand_name} ${editItem.goods_name} ${editItem.pattern_name}`"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.sapCode"
								title="SAP 코드"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="releaseDate"
								title="*출시일"
								date-picker-one
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="widthCodeItems"
								v-model="models.width_code"
								title="폭유형코드"
								:select="widthCodeItems"
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
								title="톤 코드"
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
								title="스타일코드"
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
								title="제품특성코드"
								:select="featureCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.image === null"
								v-model="image"
								title="*대표이미지"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="*대표이미지"
								:text-button="imageDeleteButton"
								:fill="true"
								@click="
									models.image = null
									image = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.productImages.length === 0"
								v-model="productImages"
								title="상품이미지 (5개)"
								file-multi
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								v-model="models.productImages"
								title="상품이미지"
								file-multi
								:fill="true"
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
								title="3D집들이"
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
								title="등록자"
								:text="models.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="models.regi_date"
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
import moment from '@/mixins/moment'

export default {
	name: 'AdminProductMasterCreate',
	mixins: [model, common, admin, moment],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			id: null,

			sapCode: null,
			releaseDate: null,
			use_yn: 'N',

			width_code: null,
			tone_code: null,
			feature_code: null,
			color_code: null,

			image: null,
			productImages: [],
			tags: [],

			d3d_image_url: null,

			regi_userid: null,
			regi_date: null,
		},

		widthCodeItems: null,
		styleCodeItems: null,
		toneCodeItems: null,
		featureCodeItems: null,

		image: null,
		productImages: [],
		releaseDate: null,
		imageDeleteButton: null,
		productImagesDeleteButton: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_ADMIN_USER',
			'ADMIN_GET_PRODUCT_PUBLIC_CODE_ITEMS',
			'ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS',
			'ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS',
			'ADMIN_GET_PRODUCT_TAG_ITEMS',
		]),
		allowValue() {
			const checkValue = ['releaseDate', 'use_yn']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}

			const checkFile = ['image']
			for (let i of checkFile) {
				if (this[i] === null) return true
			}

			return false
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		releaseDate(val) {
			console.log('releaseDate', val)
			this.models.releaseDate = val
		},
		productImages(val) {
			if (val.length > 5) {
				this.productImages = val.slice(undefined, 5)
				return this.$toastr.error('파일은 최대 5개까지만 허용 가능합니다.', '파일첨부 오류', { timeOut: 2500 })
			}
			console.log('productImages', val)
		},
		tags(val) {
			console.log('tags', val)
		},
	},
	async created() {
		console.log('editItem', this.editItem)
		await this.getTagItem()
		await this.getPublicCode()
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	updated() {},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_PUT_MASTER_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_GROUP_ITEMS',
			'ADMIN_ACT_PRODUCT_TAG_ITEMS',
		]),
		async getTagItem() {
			await this.ADMIN_ACT_PRODUCT_TAG_ITEMS({ method: 'getGroupItems', params: {} })
			await this.ADMIN_ACT_PRODUCT_TAG_ITEMS({ method: 'getItems' })
		},
		async getPublicCode() {
			this.loading = true
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_GROUP_ITEMS()
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({})

			// 폭유형코드
			this.widthCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '901' })
			// 톤 코드
			this.toneCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '905' })
			// 컬러코드
			this.styleCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '904' })
			// 제품특성코드
			this.featureCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '907' })

			this.startDataMapping()
			console.log('models', this.models)

			this.loading = false
		},
		startDataMapping() {
			console.log('editItem', this.editItem)
			this.models = {
				id: this.editItem.id,
				hits: this.editItem.hits,
				sapCode: this.editItem.sapcode,
				releaseDate: this.editItem.release_date,
				use_yn: this.editItem.use_yn,

				width_code: this.editItem.width_code
					? this.common_findItem(this.editItem.width_code, this.widthCodeItems, 'code')
					: null,
				tone_code: this.editItem.tone_code
					? this.common_findItem(this.editItem.tone_code, this.toneCodeItems, 'code')
					: null,
				feature_code: this.editItem.feature_code
					? this.common_findItem(this.editItem.feature_code, this.featureCodeItems, 'code')
					: null,
				style_code: this.editItem.style_code
					? this.common_findItem(this.editItem.style_code, this.styleCodeItems, 'code')
					: null,

				image: this.editItem.rep_image_url,
				productImages: this.editItem.images_url,
				image_url1: this.editItem.image_url1,
				image_url2: this.editItem.image_url2,
				image_url3: this.editItem.image_url3,
				image_url4: this.editItem.image_url4,
				image_url5: this.editItem.image_url5,
				tags: [],

				d3d_image_url: this.editItem.d3d_image_url,

				user: this.editItem.user,
				regi_userid: this.editItem.regi_userid,
				regi_date: this.editItem.regi_date,
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

			if (this.editItem.rep_image_url) {
				this.image = this.editItem.rep_image_url
				this.imageDeleteButton = {
					text: this.editItem.rep_image_url,
					button: {
						text: '대표이미지 삭제',
						color: 'primary',
					},
				}
			} else {
				this.image = null
				this.models.image = null
			}

			if (this.editItem.images_url) {
				this.productImages = this.editItem.images_url
				this.productImagesDeleteButton = {
					text: this.editItem.images_url,
					button: {
						text: '상품이미지 삭제',
						color: 'primary',
					},
				}
			} else {
				this.productImages = null
				this.models.productImages = null
			}

			this.releaseDate = this.editItem.release_date

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				id: null,
				hits: null,
				part: null,
				type: null,
				brand: null,
				product: null,
				pattern: null,
				sapCode: null,
				releaseDate: null,
				use_yn: false,
				widthCode: null,
				divisionCode: null,
				toneCode: null,
				featureCode: null,
				colorCode: null,
				styleCode: null,
				image: null,
				productImages: [],
				tags: [],
				user: null,
				regi_userid: null,
				regi_date: null,
			}
			this.image = null
			this.productImages = []
			this.releaseDate = null
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const releaseDate = this.common_dateFilter(this.models.releaseDate)

			const params = {
				product_id: this.editItem.product_id,
				subject_code: this.editItem.subject_code,
				kind_code: this.editItem.kind_code,
				brand_code: this.editItem.brand_code,
				goods_code: this.editItem.goods_code,
				pattern_code: this.editItem.pattern_code,

				release_date: releaseDate,
				sapcode: this.models.sapCode,
				use_yn: this.models.use_yn,

				width_code: this.models.width_code ? this.models.width_code.code : null,
				tone_code: this.models.tone_code ? this.models.tone_code.code : null,
				feature_code: this.models.feature_code ? this.models.feature_code.code : null,
				style_code: this.models.style_code ? this.models.style_code.code : null,

				d3d_image_url: this.models.d3d_image_url,

				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			// 수정
			// image 수정 > 필수값이므로 수정만 제공
			if (this.image != null && this.image !== this.editItem.rep_image_url) {
				params.rep_image = this.image
				if (this.editItem.rep_image_url !== null) params.rep_image_url = this.editItem.rep_image_url
			}

			// 상품이미지
			// 수정
			if (this.productImages !== null && this.productImages.length) {
				// 삭제 url
				if (this.origin.productImages != null) {
					// save할 이미지 추출
					let imageSave = []
					this.productImages.forEach(element => {
						// file인 경우 return
						if (typeof element === 'object') return

						// origin key 검색
						// image_url 값 비교
						Object.keys(this.origin).forEach(item => {
							// save할 url이름 imageSave로 push
							if (element === this.origin[item]) imageSave.push(item)
						})
					})

					// 전체image_url값 가져오기
					let imageArray = Object.keys(this.origin).filter(item => item.includes('image_url'))
					imageArray.forEach(element => {
						// save image_url에 해당하지 않고 값이 없거나 null이 아닌 image_url값을 find
						if (!imageSave.includes(element) && this.origin[element] !== '' && this.origin[element] !== null) {
							// 삭제될 image_url params에 추가
							params[element] = this.origin[element]
						}
					})
				}
				// 추가 image
				this.productImages.forEach(element => {
					// file인 경우에만 image 추가
					if (typeof element === 'object') {
						// image_url = null값 찾기 ( 빈 경로 찾기 )
						const findItem = Object.keys(this.origin).find(
							item =>
								(item.includes('image_url') && this.origin[item] == null) ||
								(item.includes('image_url') && this.origin[item] === ''),
						)
						// image_url빈 number등록
						params[`image${findItem.substr(findItem.length - 1)}`] = element
						this.origin[findItem] = '이미지 등록'
					}
				})
			} else {
				// image 전체 삭제
				if (this.origin.productImages.length) {
					// images_url
					// images_url 삭제 > image_url 보내기
					this.origin.productImages.forEach(element => {
						Object.keys(this.editItem).forEach(item => {
							if (element === this.editItem[item]) params[item] = element
						})
					})
				}
			}

			// tags
			// tags
			if (this.models.tags !== [] && this.models.tags.length > 0) {
				this.models.tags.forEach((element, i) => {
					params[`tag${i + 1}`] = element.tag.value
				})
			}

			console.log('params', params, this.origin)

			try {
				await this.ADMIN_ACT_PRODUCT_PUT_MASTER_ITEMS(params)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_PRODUCT_PUT_MASTER_ITEMS', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
