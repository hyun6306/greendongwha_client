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
								v-model="models.type"
								title="스크랩 종류"
								:select="admin_user_scrapType_statusItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.regi_date"
								title="등록일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.name"
								title="콘텐츠 명"
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
			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(500)"
				:loading="loading"
				@open="onReadItem"
			/>
		</v-col>

		<AdminUserManagerCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminUserManagerRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
			:read-item="readItem"
			@close="closeDialog"
		/>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminUserScrap',
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
			{ text: '스크랩 종류', value: 'scrap_kind', width: '120px' },
			{ text: '콘텐츠 이름', value: 'scrap_title', width: '150px' },
			{ text: '로그인 ID', value: 'login_id', width: '100px' },
			{ text: '등록일', value: 'regi_date', width: '100px' },
		],
		models: {
			type: null,
			name: null,
			regi_date: null,
		},
		desserts: [],
		loading: false,
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	created() {},
	mounted() {
		this.getList()
	},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_USER_SCRAP']),
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_USER_SCRAP(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.models.regi_date)

			const params = {
				scrap_kind: this.models.type?.value || '',
				title: this.models.name || '',
				regi_date_s: filterDate.startDate,
				regi_date_e: filterDate.endDate,
			}
			console.log('search', params)

			this.getList(params)
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
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
