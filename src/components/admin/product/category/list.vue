<template>
	<div>
		<v-row class="ma-0 list_header">
			<v-col
				cols="12"
				align="center"
				class="list_header_title"
			>
				<v-row
					class="ma-0"
					align="start"
				>
					<v-col
						cols="12"
						align="start"
						class="list_count pa-0"
					>
						<v-row class="ma-0">
							<v-col
								cols="8"
								align="start"
								class="pa-0 pt-1"
							>
								<span class="list_title">{{ title }}</span> ({{ count }})
							</v-col>
							<!--                            <v-col cols="4" align="end" class=" pa-0">-->
							<!--                                <v-btn-->
							<!--                                    icon-->
							<!--                                    :disabled="!(listItemModel.length === 1)"-->
							<!--                                    @click="openOrder = true"-->
							<!--                                >-->
							<!--                                    <v-icon>mdi-swap-vertical-bold</v-icon>-->
							<!--                                </v-btn>-->
							<!--                            </v-col>-->
						</v-row>
					</v-col>
					<v-col
						cols="12"
						align="start"
						class="list_count pa-0 list_border_top"
					>
						<v-row class="ma-0">
							<v-col
								cols="7"
								align="start"
								class="pa-0"
							>
								<v-btn
									icon
									@click="onCreateItem"
								>
									<v-icon>add</v-icon>
								</v-btn>
								<v-btn
									icon
									:disabled="!checkRemoveModel"
									@click="confirmRemove = true"
								>
									<v-icon>delete</v-icon>
								</v-btn>
							</v-col>
							<v-col
								v-if="title === '제품'"
								class="pa-0"
							>
								<v-row
									class="ma-0"
									justify="end"
								>
									<v-btn
										icon
										:disabled="this.listItemModel.length !== 1"
										@click="onAddItem"
									>
										<v-icon>mdi-star</v-icon>
									</v-btn>
								</v-row>
							</v-col>
							<!--                            <v-col cols="4" align="end" class=" pa-0">
                                <v-btn
                                    v-if="title === '패턴'"
                                    icon
                                    :disabled="this.listItemModel.length !== 1"
                                    @click="addPatternImage"
                                >
                                    <v-icon>mdi-image-plus</v-icon>
                                </v-btn>
                            </v-col>-->
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-card
			class="list_bg"
			elevation="0"
		>
			<v-list class="pa-0">
				<v-row class="ma-0">
					<v-col
						cols="8"
						class="pa-0"
					>
						<v-list-item-group
							v-model="listItemModel"
							active-class="primary--text"
							multiple
						>
							<template v-for="(item, i) in items">
								<v-list-item
									:key="i"
									class="list_item"
									:class="item.use_yn === 'Y' ? '' : 'list_item_no_use'"
								>
									<template v-slot:default="{ active }">
										<v-col class="pa-0">
											<v-row
												class="ma-0"
												align="center"
											>
												<v-col
													cols="3"
													align="center"
													justify="center"
													class="pa-0"
												>
													<v-checkbox
														:input-value="active"
														hide-details
														color="primary"
														class="ma-0"
													/>
												</v-col>
												<v-col
													cols="9"
													align="start"
													class="list_value_title pa-0"
												>
													{{ item.text }}
												</v-col>
											</v-row>
										</v-col>
									</template>
								</v-list-item>
							</template>
						</v-list-item-group>
					</v-col>
					<v-col
						cols="4"
						class="pa-0"
					>
						<template v-for="(item, i) in items">
							<v-list-item
								:key="i"
								class="list_item pa-0"
								:class="item.use_yn === 'Y' ? '' : 'list_item_no_use'"
							>
								<v-row
									:key="i"
									class="ma-0"
								>
									<v-col
										cols="6"
										align="end"
										class="pa-0"
									>
										<v-btn
											icon
											@click="onReadItem(item)"
										>
											<v-icon>mdi-eye-settings</v-icon>
										</v-btn>
									</v-col>
									<v-col
										cols="6"
										align="center"
										class="pa-0"
									>
										<v-btn
											icon
											@click="onEditItem(item)"
										>
											<v-icon>mdi-pencil</v-icon>
										</v-btn>
									</v-col>
								</v-row>
							</v-list-item>
						</template>
					</v-col>
				</v-row>
			</v-list>
		</v-card>

		<!-- 품목 -->
		<div v-if="title === '품목'">
			<AdminProductCategoryPartCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="editItem"
				@close="closeDialog"
			/>
			<AdminProductCategoryPartRead
				v-if="readDialog"
				:title="title"
				:dialog="readDialog"
				:read-item="readItem"
				@close="closeDialog"
			/>
		</div>

		<!-- 종류 -->
		<div v-if="title === '종류'">
			<AdminProductCategoryTypeCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="editItem"
				@close="closeDialog"
			/>
			<AdminProductCategoryTypeRead
				v-if="readDialog"
				:title="title"
				:dialog="readDialog"
				:read-item="readItem"
				@close="closeDialog"
			/>
		</div>

		<!-- 브랜드 -->
		<div v-if="title === '브랜드'">
			<AdminProductCategoryBrandCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="editItem"
				@close="closeDialog"
			/>
			<AdminProductCategoryBrandRead
				v-if="readDialog"
				:title="title"
				:dialog="readDialog"
				:read-item="readItem"
				@close="closeDialog"
			/>
		</div>

		<!-- 제품 -->
		<div v-if="title === '제품'">
			<AdminProductCategoryProductCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="editItem"
				@close="closeDialog"
			/>
			<AdminProductCategoryProductRead
				v-if="readDialog"
				:title="title"
				:dialog="readDialog"
				:read-item="readItem"
				@close="closeDialog"
			/>

			<!-- 추가 정보 특장점 / 구조 / 인증 -->
			<AdminProductCategoryProductAddItem
				v-if="createItemDialog"
				v-model="createModel"
				:dialog="createItemDialog"
				:edit-item="addItem"
				@close="closeDialog"
			/>
		</div>

		<!-- 패턴 -->
		<div v-if="title === '패턴'">
			<AdminProductCategoryPatternCreate
				v-if="createDialog"
				v-model="createModel"
				:title="title"
				:dialog="createDialog"
				:mode="mode"
				:edit-item="editItem"
				@close="closeDialog"
				@onAddPatternImage="onAddPatternImage"
			/>
			<AdminProductCategoryPatternRead
				v-if="readDialog"
				:title="title"
				:dialog="readDialog"
				:read-item="readItem"
				@close="closeDialog"
				@onAddPatternImage="onAddPatternImage"
			/>

			<!-- 패턴 이미지 -->
			<AdminProductCategoryPatternAddImage
				v-if="createPatternDialog && title === '패턴'"
				v-model="createModel"
				title="패턴 이미지"
				:dialog="createPatternDialog"
				:edit-item="model"
				@close="closeDialog"
			/>
		</div>

		<CommonDataTableGridTypeDrag01
			v-if="openOrder"
			v-model="changeOrder"
			:title="`${title} 노출 순서`"
			:dialog="openOrder"
			:headers="orderHeader"
			:desserts="items"
			:show-all="true"
			@close="openOrder = false"
		/>

		<CommonConfirm
			:dialog="confirmRemove"
			:title="`${title} 삭제`"
			:text="`선택하신 목록이 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminProductCategoryList',
	components: {},
	mixins: [model, common, admin],
	props: ['title', 'items'],
	data: () => ({
		mode: 'read',
		listItemModel: [],
		listItemValue: null,
		editItem: {},
		readItem: {},
		readDialog: false,
		createModel: {},
		changeOrder: null,
		openOrder: false,
		confirmRemove: false,
		orderHeader: [
			{ name: '순서', value: 'priority', width: '60' },
			{ name: '제목', value: 'text', width: '200' },
			{ name: '', value: 'hendle-icon', width: '20' },
		],
		createDialog: false,
		createItemDialog: false,
		addItem: [],
		createPatternDialog: false,
	}),
	computed: {
		count() {
			return this.items.length
		},
		checkRemoveModel() {
			return this.listItemModel.length
		},
	},
	watch: {
		listItemModel(val) {
			if (val) {
				console.log('listItemModel', val)
				let select = []
				val.forEach(element => select.push(this.items[element]))

				console.log('select', select)
				if (select === []) this.listItemModel = []
				this.model = select
			}
			// console.log('select', select)

			// if(val.length === []) return
			// let filterItems = []
			// val.forEach(element => filterItems.push(this.items[element]))
			// this.model = filterItems
		},
		items() {
			this.listItemModel = []
		},
		mode(val) {
			// if(val === 'read') this.listItemModel = []
		},
		changeOrder(val) {
			this.$emit('change', val)
			if (val.length) {
				let keyName = Object.keys(val[0])
				console.log('keyName', keyName)
				let codeName
				if (keyName.includes('partCode')) codeName = 'partCode'
				if (keyName.includes('typeCode')) codeName = 'typeCode'
				if (keyName.includes('brandCode')) codeName = 'brandCode'
				if (keyName.includes('productCode')) codeName = 'productCode'
				if (keyName.includes('patternCode')) codeName = 'patternCode'

				switch (codeName) {
					case 'partCode':
						this.$emit('change', val)
						break
					case 'typeCode':
						this.$emit('change', val)
						break
					case 'brandCode':
						this.$emit('change', val)
						break
					case 'productCode':
						this.$emit('change', val)
						break
					case 'patternCode':
						this.$emit('change', val)
						break
				}
			}
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_CATEGORY_ITEMS']),
		onCreateItem() {
			this.mode = 'create'
			this.editItem = {}
			this.createDialog = true
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readDialog = true
		},
		onEditItem(item) {
			console.log('onEditItem', item)
			this.editItem = item
			this.mode = 'edit'
			this.createDialog = true
		},
		onConfirmRemove() {},
		onAddItem() {
			this.addItem = this.items[this.listItemModel]
			this.createItemDialog = true
		},
		async removeData() {
			let params
			let query
			let removeData = []
			this.listItemModel.forEach(element => removeData.push(this.items[element]))
			switch (removeData[0].category_id) {
				case 'subject':
					params = removeData.map(item => {
						return { subject_code_1: item.subject_code }
					})
					query = '1'
					break
				case 'kind':
					params = removeData.map(item => {
						return { kind_code_2: item.kind_code }
					})
					query = '2'
					break
				case 'brand':
					params = removeData.map(item => {
						return { brand_code_3: item.brand_code }
					})
					query = '3'
					break
				case 'goods':
					params = removeData.map(item => {
						return { goods_code_4: item.goods_code }
					})
					query = '4'
					break
				case 'pattern':
					params = removeData.map(item => {
						return { pattern_code_5: item.pattern_code }
					})
					query = '5'
					break
			}

			try {
				const items = { method: 'delete', params: params, query: query }
				await this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.searchItems()
				})
				console.log('removeData', removeData)
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
			}
		},
		addPatternImage() {
			console.log('addPatternImage', this.items[this.listItemModel])
			this.listItemModel = this.items[this.listItemModel]
			this.readDialog = false
			this.createDialog = false
			this.createPatternDialog = true
		},
		onAddPatternImage(val) {
			this.listItemModel = val
			this.readItem = val
			this.readDialog = false
			this.createDialog = false
			this.createPatternDialog = true
		},
		closeDialog() {
			this.editItem = {}
			this.readItem = {}
			this.readDialog = false
			this.createDialog = false
			this.createPatternDialog = false
			this.createItemDialog = false
			this.$emit('update')
		},
	},
}
</script>
<style scoped lang="scss">
.list {
	&_bg {
		overflow: hidden;
		overflow-y: auto;
		height: calc(100vh - 215px);
		border-radius: 0;
		border: 1px solid #ccc;
		border-top: 0;
	}
	&_title {
		font-size: 1.2rem;
		font-family: 'NotoSansKR-Bold';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
	&_text {
		font-size: 1rem;
		font-family: 'NotoSansKR-Regular';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
	&_item {
		border-bottom: 1px solid #ccc;
		&_no_use {
			background-color: #ccc;
		}
	}
	&_btn {
		&_area {
			min-height: 48px;
		}
	}
	&_value {
		&_title {
			font-family: 'NotoSansKR-Bold';
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 100%;
		}

		&_text {
			font-family: 'NotoSansKR-Regular';
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 100%;
		}
	}
}
.list_header {
	background-color: #f1f2f3;
	border: 1px solid #ccc;
}
.list_border_top {
	border-top: 1px solid #ccc;
}
::-webkit-scrollbar {
	z-index: 10000;
	-webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
	width: 10px;
}
::-webkit-scrollbar:horizontal {
	height: 10px;
}
::-webkit-scrollbar-track {
	background: #ededed;
	border-radius: 0;
}
::-webkit-scrollbar-thumb {
	background: #92a99b;
	border-radius: 5px;
}
</style>
