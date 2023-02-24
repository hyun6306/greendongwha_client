<template>
	<v-container fluid>
		<v-col class="pa-1 pb-0">
			<v-row
				class="ma-0"
				align="center"
			>
				<v-col cols="12">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.keyword"
								title="태그 그룹 / 태그"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="등록일"
								date-picker
							/>
						</v-col>
					</v-row>
				</v-col>
				<v-col
					align="end"
					class="pt-0"
				>
					<v-btn
						dark
						tile
						elevation="0"
						color="olive"
						@click="searchItems"
					>
						<v-icon class="pr-2">search</v-icon>
						<p>검색</p>
					</v-btn>
				</v-col>
			</v-row>
		</v-col>
		<v-col class="pa-4 px-md-4 pt-0">
			<v-row class="ma-0">
				<v-col
					class="pa-0 pr-2"
					cols="12"
					md="4"
				>
					<v-col class="pl-0">
						<h2>태그 그룹</h2>
					</v-col>
					<CommonDataTableGridType02
						v-model="tagGroupModel"
						:headers="tagGroupHeader"
						:desserts="ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS"
						:height="common_tableHeight(500)"
						:loading="loading"
						@open="onGroupReadItem"
					/>
				</v-col>
				<v-col
					class="pa-0"
					cols="12"
					md="8"
				>
					<v-col class="px-0">
						<v-row class="ma-0">
							<h2>태그</h2>
							<v-spacer />
							<v-row
								class="ma-0"
								justify="end"
							>
								<v-col
									cols="4"
									md="3"
									xl="2"
									class="pa-0 pr-2"
								>
									<v-btn
										color="primary"
										height="100%"
										block
										tile
										elevation="0"
										:disabled="!checkCreateModel"
										@click="onCreateItem()"
									>
										<v-icon>add</v-icon>
										<span class="hidden-md-and-down ml-2">등록</span>
									</v-btn>
								</v-col>
								<v-col
									cols="4"
									md="3"
									xl="2"
									class="pa-0"
								>
									<v-btn
										color="error"
										height="100%"
										block
										tile
										elevation="0"
										:disabled="!checkRemoveModel"
										@click="confirmRemove = true"
									>
										<v-icon>delete</v-icon>
										<span class="hidden-md-and-down ml-2">삭제</span>
									</v-btn>
								</v-col>
							</v-row>
						</v-row>
					</v-col>
					<CommonDataTableGridType02
						v-model="tagModel"
						:headers="tagHeader"
						:desserts="tagItems"
						:height="common_tableHeight(500)"
						:loading="loading"
						@open="onReadItem"
						@edit="onEditItem"
					/>
				</v-col>
			</v-row>
		</v-col>

		<!-- tag Group -->
		<AdminProductTagGroupRead
			v-if="groupReadMode"
			:title="common_title"
			:dialog="groupReadMode"
			:read-item="readItem"
			@close="closeDialog"
		/>

		<!-- tag -->
		<AdminProductTagCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="editItem"
			@close="closeDialog"
		/>
		<AdminProductTagRead
			v-if="readMode"
			:title="common_title"
			:dialog="readMode"
			:read-item="readItem"
			@close="closeDialog"
		/>

		<CommonConfirm
			:dialog="confirmRemove"
			:title="`${common_title} 삭제`"
			:text="`선택하신 목록이 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminProductTag',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		groupReadMode: false,

		desserts: [],
		readItem: {},
		editItem: {},
		createModel: null,
		createDialog: false,
		confirmRemove: false,
		tagGroupModel: [],
		tagGroupHeader: [
			{ text: '태그 그룹', value: 'code_name', width: '100px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
		],
		tagModel: [],
		tagHeader: [
			{ text: '태그', value: 'tag_value', width: '100px' },
			{ text: '등록자', value: 'modify_userid', width: '80px' },
			{ text: '등록일', value: 'modify_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			keyword: null,
		},
		showDate: null,
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS', 'ADMIN_GET_PRODUCT_TAG_ITEMS']),
		checkRemoveModel() {
			return this.tagModel !== null ? this.tagModel.length > 0 : false
		},
		checkCreateModel() {
			return this.tagGroupModel.length === 1
		},
		tagItems() {
			let tagData = []
			this.tagGroupModel.forEach(element => {
				this.ADMIN_GET_PRODUCT_TAG_ITEMS.forEach(item => {
					if (element.code === item.tag_group) tagData.push(item)
				})
			})
			return tagData
		},
	},
	watch: {
		// tagGroupModel(val){
		//     if(val.length > 0) this.getTagList(val)
		// },
	},
	async created() {
		await this.actApiCall()
		await this.actApiCall({ method: 'getItems' })
	},
	mounted() {
		console.log('ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS', this.ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS)
	},
	destroyed() {},
	methods: {
		...mapMutations(['ADMIN_MU_PRODUCT_TAG_ITEMS']),
		...mapActions(['ADMIN_ACT_PRODUCT_TAG_ITEMS']),
		async actApiCall(params = { method: 'getGroupItems', params: {} }) {
			this.loading = true
			await this.ADMIN_ACT_PRODUCT_TAG_ITEMS(params).then(res => {
				// 검색시 필터작업
				// 검색으로 리턴된 값만 추출하여 선택
				if (params.method === 'search') {
					// console.log('searchData', res, this.ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS)
					let filterData = []
					res.forEach(element => {
						filterData.push(this.ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS.find(item => item.code === element.code))
					})
					this.tagGroupModel = filterData
				}

				this.loading = false
			})
		},
		searchItems() {
			let startDate
			let endDate

			if (this.showDate !== null) {
				startDate = this.common_dateFilter(this.showDate[0])
				endDate = this.showDate[1] === undefined ? startDate : this.common_dateFilter(this.showDate[1])
			} else {
				startDate = null
				endDate = null
			}

			const params = {
				search_keyword: this.models.keyword,
				modify_date_s: startDate,
				modify_date_e: endDate,
			}

			console.log('search', params)

			const item = {
				method: 'search',
				params: params,
			}

			this.actApiCall(item)
		},
		onGroupReadItem(item) {
			console.log('onGroupReadItem', item)
			this.readItem = item
			this.groupReadMode = true
		},
		onCreateItem() {
			this.mode = 'create'
			this.editItem = {
				tag_group: this.tagGroupModel[0].code,
				tag_group_name: this.tagGroupModel[0].code_name,
				tag_group_bigo: this.tagGroupModel[0].bigo,
				modify_userid: this.tagGroupModel[0].modify_userid,
				modify_date: this.tagGroupModel[0].modify_date,
			}
			this.createDialog = true
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
		},
		onEditItem(item) {
			this.editItem = item
			this.mode = 'edit'
			this.createDialog = true
		},
		async removeData() {
			// console.log('removeData', this.model)
			const params = this.tagModel.map(item => {
				return { tag_id: item.tag_id }
			})

			console.log(params)
			try {
				await this.actApiCall({ method: 'delete', params: params })
				this.updateData()
				this.confirmRemove = false
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
			}
		},
		closeDialog() {
			this.tagModel = []
			this.readMode = false
			this.groupReadMode = false
			this.createDialog = false
			this.updateData()
		},
		updateData() {
			this.ADMIN_MU_PRODUCT_TAG_ITEMS([])
			this.actApiCall({ method: 'getItems' })
		},
	},
}
</script>
