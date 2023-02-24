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
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.status"
								title="상태"
								:select="admin_interior_questionItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="등록일"
								date-picker-one
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="제목/내용"
								input
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
			<v-btn
				tile
				elevation="0"
				color="primary"
				:disabled="!checkRemoveModel"
				@click="confirmRemove = true"
			>
				<v-icon class="pr-2">delete</v-icon>
				<p>삭제</p>
			</v-btn>

			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(500)"
				:loading="loading"
				@open="onReadItem"
			/>
		</v-col>

		<AdminCustomInteriorQuestionRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
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
import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomInteriorQuestion',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		readItem: {},
		createModel: null,
		createDialog: false,
		linkDialog: false,
		confirmRemove: false,
		headers: [
			{ text: '상태', value: 'progress_state_name', width: '150px' },
			{ text: 'ID', value: 'regi_userid', width: '100px' },
			{ text: '제목', value: 'title', width: '150px' },
			{ text: '접수일', value: 'regi_date', width: '150px' },
			{ text: '처리자', value: 'conf_userid', width: '100px' },
			{ text: '처리일시', value: 'conf_date', width: '150px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
		],
		models: {
			status: null,
			title: null,
		},
		showDate: null,
		desserts: [],
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
		...mapActions(['ADMIN_ACT_CUSTOM_INTERIOR_QUESTION']),
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_CUSTOM_INTERIOR_QUESTION(items).then(res => {
				console.log('ADMIN_ACT_CUSTOM_INTERIOR_QUESTION', res)
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const params = {
				progress_state: this.models.status?.value || '',
				title: this.models.title || '',
				regi_date: this.showDate ? this.common_dateFilter(this.showDate) : '',
			}
			console.log('search', params)

			this.getList(params)
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
		},
		async removeData() {
			console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { service_id: item.service_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_CUSTOM_INTERIOR_QUESTION(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.searchItems()
				})
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
			}
		},
		closeDialog() {
			this.model = []
			this.addItem = []
			this.readMode = false
			this.searchItems()
		},
	},
}
</script>
