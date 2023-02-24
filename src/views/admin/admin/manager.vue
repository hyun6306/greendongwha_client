<template>
	<v-container fluid>
		<v-col class="pa-1 pb-0">
			<v-row
				class="ma-0"
				align="center"
			>
				<v-col
					cols="12"
					md="8"
				>
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.user"
								title="이름/ID"
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
				:height="common_tableHeight(450)"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>

		<AdminAdminManagerCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminAdminManagerRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
			:read-item="readItem"
			@close="closeDialog"
		/>

		<CommonConfirm
			:dialog="confirmRemove"
			:title="`${common_title} 삭제`"
			:text="`선택하신 사용자가 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</v-container>
</template>

<script>
import common from '@/mixins/common'
import admin from '@/mixins/admin'
import { mapActions } from 'vuex'

export default {
	name: 'AdminAdminManager',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		readItem: {},
		createModel: null,
		createDialog: false,
		confirmRemove: false,
		headers: [
			{ text: '이름', value: 'name', width: '150px' },
			{ text: 'ID', value: 'login_id', width: '100px' },
			{ text: '이메일', value: 'emailaddr', width: '150px' },
			{ text: '등록일', value: 'regi_date', width: '100px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			user: null,
		},
		showDate: null,
		desserts: [],
		loading: false,
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	created() {
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_ADMIN_USER']),
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_ADMIN_USER(items).then(res => {
				console.log('ADMIN_ACT_ADMIN_USER', res)
				this.desserts = res
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
				keyword: this.models.user || '',
				modify_date_s: startDate,
				modify_date_e: endDate,
			}
			console.log('search', params)

			this.getList(params)
		},
		onCreateItem() {
			this.mode = 'create'
			this.createDialog = true
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
		async removeData() {
			console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { login_id: item.login_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_ADMIN_USER(items).then(() => {
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
			this.addItem = []
			this.readMode = false
			this.createDialog = false
			this.searchItems()
		},
	},
}
</script>
