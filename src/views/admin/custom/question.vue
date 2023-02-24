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
								v-model="models.questionType"
								title="*문의유형"
								:select="admin_question_typeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.partModel"
								title="*품목"
								:select="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
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
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="*제목/내용"
								input
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
								:select="admin_question_statusItems"
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
			/>
		</v-col>

		<AdminCustomQuestionRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
			:read-item="readItem"
			@close="closeDialog"
		/>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomQuestion',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		readItem: {},
		confirmRemove: false,
		headers: [
			{ text: '유형', value: 'service_kind_name', width: '150px' },
			{ text: 'ID', value: 'regi_userid', width: '100px' },
			{ text: '제목', value: 'title', width: '150px' },
			{ text: '첨부파일', value: 'link', width: '80px' },
			{ text: '접수일', value: 'regi_date', width: '150px' },
			{ text: '상태', value: 'progress_state_name', width: '100px' },
			{ text: '처리자', value: 'conf_userid', width: '100px' },
			{ text: '처리일시', value: 'conf_date', width: '150px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
		],
		models: {
			questionType: null,
			partModel: null,
			id: null,
			email: null,
			title: null,
			status: null,
		},
		showDate: null,
		desserts: [],
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS']),
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
		...mapActions(['ADMIN_ACT_CUSTOM_AS']),
		async getList(params = { category: '2' }) {
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
				category: '2', // 1: A/S문의 ,  2: 1:1문의
				service_kind: this.models.questionType?.value || '',
				subject_code: this.models.partModel?.subject_code || '',
				title: this.models.title || '',
				login_id: this.models.id || '',
				progress_state: this.models.status?.value || '',
				regi_date_s: startDate,
				regi_date_e: endDate,
			}
			console.log('search', params)

			this.getList(params)
		},
		makeExcelFile() {
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.headers), '1대1문의')
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
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
