<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1200"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="`${title} 정보`"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-row
					class="ma-0"
					justify="center"
				>
					<v-col
						class="px-0"
						cols="12"
						align="center"
						justify="center"
					>
						<CommonTabsTab02
							v-model="tab"
							:tab-items="tabItems"
							fill
						/>
					</v-col>
				</v-row>
				<v-row
					class="ma-0"
					align="center"
				>
					<v-col class="pa-0">
						<AdminItemsTableTopbar
							:check-remove-model="checkRemoveModel"
							:desserts-length="items.length"
							:hide="'노출순서'"
							@callCreate="onCreateItem()"
							@callConfirmRemove="confirmRemove = true"
						/>
					</v-col>
					<v-col
						v-if="title === '구조'"
						cols="2"
						class="pa-0"
						align="end"
					>
						<v-btn
							color="olive"
							dark
							width="130"
							@click="createImage"
						>
							<v-icon>mdi-image</v-icon>
							<span class="hidden-md-and-down ml-2">구조도 등록</span>
						</v-btn>
					</v-col>
				</v-row>
				<CommonDataTableGridType02
					v-model="model"
					:headers="headers"
					:desserts="items"
					:height="'280px'"
					:loading="loading"
					@open="onReadItem"
					@edit="onEditItem"
				/>
			</v-col>
		</v-card>

		<!-- 특장점 -->
		<div v-if="title === '특장점'">
			<AdminProductCategoryProductAdvantageCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="model[0]"
				@close="closeDialog"
				@update="updateDialog"
			/>
			<AdminProductCategoryProductAdvantageRead
				v-if="readMode"
				:title="title"
				:dialog="readMode"
				:read-item="readItem"
				@close="closeDialog"
			/>
		</div>

		<!-- 구조 -->
		<div v-else-if="title === '구조'">
			<AdminProductCategoryProductStructureCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="model[0]"
				@close="closeDialog"
				@update="updateDialog"
			/>
			<AdminProductCategoryProductStructureRead
				v-if="readMode"
				:title="title"
				:dialog="readMode"
				:read-item="readItem"
				@close="closeDialog"
			/>
			<AdminProductCategoryProductStructureImage
				v-if="createImageDialog"
				v-model="createModel"
				:title="title"
				:dialog="createImageDialog"
				:mode="mode"
				:edit-item="model[0]"
				@close="closeDialog"
				@update="updateDialog"
			/>
		</div>

		<!-- 특장점 이외 -->
		<div v-else>
			<AdminProductCategoryProductCertCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="model[0]"
				@close="closeDialog"
				@update="updateDialog"
			/>
			<AdminProductCategoryProductCertRead
				v-if="readMode"
				:title="title"
				:dialog="readMode"
				:read-item="readItem"
				@close="closeDialog"
			/>
		</div>

		<CommonConfirm
			:dialog="confirmRemove"
			:title="`${title} 삭제`"
			:text="`선택하신 목록이 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>

		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
// import model from '@/mixins/model'
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'AdminProductMasterAddImage',
	mixins: [
		// model,
		common,
	],
	props: ['dialog', 'editItem'],
	data: () => ({
		mode: 'read',
		title: '특장점',
		readMode: false,
		model: [],
		readItem: {},
		loading: false,
		headers: [],
		items: [],
		tab: 0,
		confirmRemove: false,
		openOrder: false,
		createModel: [],
		createDialog: false,
		createImageDialog: false,
		changeOrder: null,
		orderHeader: [
			{ name: '순서', value: 'priority', width: '60' },
			{ name: '제목', value: 'title', width: '200' },
			{ name: '', value: 'hendle-icon', width: '20' },
		],
		tabItems: [],
		publicCodeItems: [],
		brand: null,
		type: null,
		codeItem: null,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS', 'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS']),
		checkRemoveModel() {
			return this.model !== null ? this.model.length : false
		},
	},
	watch: {
		// model(val){
		// 	console.log('model',val)
		// },
		tab(val) {
			// console.log('this.tabItems[val].title',this.tabItems[val].title)
			this.title = this.tabItems[val].title
			this.filterItems(this.tabItems[val])
		},
	},
	created() {
		console.log('editItem', this.editItem)
		this.startPublicCodeMapping()
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			'ADMIN_ACT_PRODUCT_CATEGORY_PRODUCT_GOODS_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_CATEGORY_PRODUCT_GOODS_ITEMS',
		]),
		async startPublicCodeMapping() {
			// 고정값(101) 공통코드 가져오기
			this.publicCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '101' })
			this.brand = this.common_findItem(this.editItem.brand_code, this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, 'brand_code')
			this.type = this.common_findItem(this.brand.kind_code, this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, 'kind_code')

			// 작성되어야할 공통코드 목록 가져오기
			this.common_codes = this.type.common_codes
			this.common_codes.forEach(element => {
				let res = this.common_findItem(element, this.publicCodeItems, 'code')
				res.title = res.code_name // tab title추가
				this.tabItems.push(res)
			})

			this.filterItems(this.tabItems[0])
		},
		async filterItems(item) {
			this.items = []
			let params = {}

			switch (item.title) {
				case '특장점':
					this.headers = [
						{ text: '제목', value: 'title', width: '100px' },
						{ text: '설명', value: 'description', width: '150px' },
						{ text: '썸네일', value: 'thumbnail', width: '70px', sortable: false },
						{ text: '이미지', value: 'image', width: '70px', sortable: false },
						{ text: '등록자', value: 'regi_userid', width: '80px' },
						{ text: '등록일', value: 'regi_date', width: '80px' },
						{ text: '보기', value: 'data-read', width: '30px', sortable: false },
						{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
					]
					break
				case '구조':
					this.headers = [
						{ text: '제목', value: 'title', width: '100px' },
						{ text: '설명', value: 'description', width: '150px' },
						{ text: '구조도', value: 'image', width: '70px', sortable: false },
						{ text: '등록자', value: 'regi_userid', width: '80px' },
						{ text: '등록일', value: 'regi_date', width: '80px' },
						{ text: '보기', value: 'data-read', width: '30px', sortable: false },
						{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
					]
					break
				case '인증':
					this.headers = [
						{ text: '인증 및 수상정보', value: 'description', width: '300px' },
						{ text: '썸네일', value: 'thumbnail', width: '70px', sortable: false },
						{ text: '등록자', value: 'regi_userid', width: '80px' },
						{ text: '등록일', value: 'regi_date', width: '80px' },
						{ text: '보기', value: 'data-read', width: '30px', sortable: false },
						{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
					]
					break
				default:
					this.headers = [
						{ text: '설명', value: 'description', width: '300px' },
						{ text: '썸네일', value: 'thumbnail', width: '70px', sortable: false },
						{ text: '등록자', value: 'regi_userid', width: '80px' },
						{ text: '등록일', value: 'regi_date', width: '80px' },
						{ text: '보기', value: 'data-read', width: '30px', sortable: false },
						{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
					]
					break
			}

			this.codeItem = item

			params.goods_code = this.editItem.goods_code
			params.type_code = this.codeItem.code

			if (params.goods_code === undefined || params.type_code === undefined) return

			this.items = await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_PRODUCT_GOODS_ITEMS(params)
			console.log('ADMIN_ACT_PRODUCT_GET_CATEGORY_PRODUCT_GOODS_ITEMS', this.items)
		},
		onCreateItem() {
			this.mode = 'create'
			this.model = [{ goods_code: this.editItem.goods_code, type_code: this.codeItem.code }]
			this.createDialog = true
		},
		createImage() {
			this.mode = 'create'
			this.model = [{ goods_code: this.editItem.goods_code, type_code: this.codeItem.code }]
			this.createImageDialog = true
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
		},
		onEditItem(item) {
			this.model = [item]
			this.mode = 'edit'
			this.createDialog = true
		},
		resetData() {},
		async removeData() {
			console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { detail_id: item.detail_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_PRODUCT_CATEGORY_PRODUCT_GOODS_ITEMS(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.filterItems(this.tabItems[this.tab])
				})
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
			}
		},
		closeDialog() {
			this.model = []
			this.readMode = false
			this.createDialog = false
			this.createImageDialog = false
		},
		updateDialog(title) {
			this.filterItems(this.tabItems.find(item => item.title === title))
			this.closeDialog()
		},
	},
}
</script>

<style scoped lang="scss">
.add_item_active {
	background-color: $color-olive;
	color: #fff;
	font-weight: bold;
}
</style>
