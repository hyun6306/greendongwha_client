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
								v-model="models.typeModel"
								title="*분류"
								:select="ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.status"
								title="*상태"
								:select="admin_as_statusItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="*등록일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.id"
								title="*ID"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="8"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="*제목/내용"
								input
								:fill="true"
							/>
						</v-col>
					</v-row>
				</v-col>
				<v-row class="ma-0">
					<v-col
						align="start"
						class="pt-0 md-pl-4"
					>
						<v-btn
							dark
							tile
							elevation="0"
							color="primary"
							@click="makeExcelFile"
						>
							<v-icon class="md-pr-2">mdi-download</v-icon>
							<p class="hidden-md-and-down">excel download</p>
						</v-btn>
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
			</v-row>
		</v-col>
		<v-col class="pa-4 px-md-4 pt-0">
			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(500)"
				:loading="loading"
				readonly
				@open="onReadItem"
				@status="onEditStatusItem"
			/>
		</v-col>

		<AdminCustomAsRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
			:read-item="readItem"
			@close="closeDialog"
			@save="onEditStatusItem"
		/>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomAs',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		readItem: {},
		confirmRemove: false,
		headers: [
			{ text: '상태', value: 'data_status_as', width: '80px', sortable: false },
			{ text: '로그인ID', value: 'regi_userid', width: '120px' },
			{ text: '분류', value: 'kind_name', width: '100px' },
			{ text: '제목', value: 'title', width: '100px' },
			{ text: '첨부파일', value: 'link', width: '100px' },
			{ text: '접수일', value: 'regi_date', width: '120px' },
			{ text: '처리자', value: 'conf_userid', width: '100px' },
			{ text: '처리일', value: 'conf_date', width: '150px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
		],
		models: {
			typeModel: null,
			status: null,
			id: null,
			title: null,
		},
		showDate: null,
		desserts: [],
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS']),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	watch: {
		model(val) {
			console.log('model', val)
		},
	},
	created() {
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_CUSTOM_AS']),
		async getList(params = { category: '1' }) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_CUSTOM_AS(items).then(res => {
				console.log('ADMIN_ACT_CUSTOM_AS', res)
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
				category: '1', // 1: A/S문의 ,  2: 1:1문의
				progress_state: this.models.status?.value || '',
				kind_code: this.models.typeModel?.kind_code || '',
				title: this.models.title || '',
				login_id: this.models.id || '',
				regi_date_s: startDate,
				regi_date_e: endDate,
			}
			console.log('search', params)

			this.getList(params)
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
		},
		makeExcelFile() {
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.headers), 'AS 신청')
		},
		async onEditStatusItem(item) {
			console.log('status api put push', item)
			this.loading = true
			const params = {
				service_id: item.service_id,
				category: item.category,
				conf_userid: this.AUTH_GET_ADMIN_USER.login_id,
				progress_state: item.data_status_as?.value,
				hand: item.hand,
				sms_yn: item.sms_yn,
			}
			const items = { method: 'edit', params: params }

			await this.ADMIN_ACT_CUSTOM_AS(items).then(() => {
				console.log('ADMIN_ACT_CUSTOM_AS')
				this.searchItems()
				this.loading = false
			})
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
