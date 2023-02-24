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
							md="2"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.status"
								title="상태"
								:select="admin_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="5"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.regi_date"
								title="등록일"
								date-picker
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="5"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="제목"
								input
								:fill="true"
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
			<AdminItemsTableTopbar
				:check-remove-model="checkRemoveModel"
				:desserts-length="desserts.length"
				:hide="'노출순서'"
				@callCreate="onCreateItem()"
				@callConfirmRemove="confirmRemove = true"
			/>
			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(500)"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>

		<AdminMainPopupCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminMainPopupRead
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
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminMainPopup',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		desserts: [],
		readItem: {},
		createModel: null,
		createDialog: false,
		confirmRemove: false,
		headers: [
			{ text: 'NO', value: 'popup_id', width: '30px' },
			{ text: '노출여부', value: 'use_yn', width: '70px' },
			{ text: '제목', value: 'title', width: '160px' },
			{ text: '노출기간', value: 'data-period', width: '120px' },
			{ text: '노출위치', value: 'location', width: '40px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		items: [],
		models: {
			status: null,
			title: null,
			regi_date: null,
		},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	watch: {
		model(val) {
			console.log('models', val)
		},
	},
	async created() {
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_MAIN_POPUP']),
		async getList(params = {}) {
			this.loading = true
			const items = {
				method: 'get',
				params,
			}
			const data = await this.ADMIN_ACT_MAIN_POPUP(items)
			console.log('data', data)
			this.desserts = data

			this.loading = false
		},
		searchItems() {
			let startDate
			let endDate

			if (this.models.regi_date !== null) {
				startDate = this.common_dateFilter(this.models.regi_date[0])
				endDate = this.models.regi_date[1] === undefined ? startDate : this.common_dateFilter(this.models.regi_date[1])
			} else {
				startDate = null
				endDate = null
			}

			const params = {
				use_yn: this.models.use_yn?.value ?? '',
				title: this.models.title ?? '',
				regi_date_s: startDate,
				regi_date_e: endDate,
			}
			console.log('search', params)

			this.getList(params)
		},
		onCreateItem() {
			this.mode = 'create'
			this.createDialog = true
		},
		async onReadItem(item) {
			if (item.popup_kind === 'EDITOR') {
				item.content = await this.getContent(item.popup_id)
			}
			this.readItem = item
			this.readMode = true
		},
		async getContent(id) {
			const items = {
				method: 'detail',
				query: id,
			}
			return await this.ADMIN_ACT_MAIN_POPUP(items)
		},
		async onEditItem(item) {
			this.model = [item]
			if (item.popup_kind === 'EDITOR') {
				item.content = await this.getContent(item.popup_id)
			}
			this.mode = 'edit'
			this.createDialog = true
		},
		async removeData() {
			// console.log('removeData', this.model)
			// api 추가 전
			// api 작업 후 진행예정
			this.loading = true
			const params = this.model.map(item => {
				return { popup_id: item.popup_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_MAIN_POPUP(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.searchItems()
				})
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
				this.loading = false
			}
		},
		closeDialog() {
			this.model = []
			this.readMode = false
			this.createDialog = false
			this.searchItems()
		},
	},
}
</script>
