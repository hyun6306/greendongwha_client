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
								v-model="models.regi_userid"
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
								v-model="models.conf_state"
								title="*상태"
								:select="admin_quality_statusItems"
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
			<v-col
				align="start"
				class="pa-0"
			>
				<v-btn
					dark
					tile
					elevation="0"
					color="olive"
					@click="excelDownload"
				>
					<p>이전DB 다운로드</p>
				</v-btn>
			</v-col>
			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(620)"
				:loading="loading"
				readonly
				@open="onReadItem"
				@status="onEditStatusItem"
			/>
		</v-col>

		<AdminCustomQualityRead
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
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomQuality',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		readItem: {},
		confirmRemove: false,
		headers: [
			{ text: '상태', value: 'data_status_quality', width: '100px', sortable: false },
			{ text: 'ID', value: 'regi_userid', width: '120px' },
			{ text: '이름', value: 'regi_username', width: '100px' },
			{ text: '품질보증번호', value: 'guarantee_no', width: '100px' },
			{ text: '구입월', value: 'purchase_date', width: '100px' },
			{ text: '우편번호', value: 'zipcode', width: '120px' },
			{ text: '주소', value: 'address1', width: '150px' },
			{ text: '상세주소', value: 'address2', width: '150px' },
			{ text: '비고', value: 'bigo', width: '100px' },
			{ text: '처리자', value: 'conf_username', width: '100px' },
			{ text: '처리일', value: 'conf_ddate', width: '150px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
		],
		models: {
			regi_userid: null,
			conf_state: null,
			showDate: null,
		},
		desserts: [],
		showDate: null,
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
			console.log('model', val)
		},
	},
	created() {
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_CUSTOM_QUALITY']),
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_CUSTOM_QUALITY(items).then(res => {
				console.log('ADMIN_ACT_CUSTOM_QUALITY', res)
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.showDate)

			const params = {
				regi_userid: this.models.regi_userid || '',
				regi_date_s: filterDate.startDate,
				regi_date_e: filterDate.endDate,
				conf_state: this.models.conf_state?.value || '',
			}
			console.log('search', params)

			this.getList(params)
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
		},
		async onEditStatusItem(item) {
			console.log('status api put push', item)
			this.loading = true
			const params = {
				guarantee_id: item.guarantee_id,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
				conf_state: item.data_status_quality.value,
			}
			const items = { method: 'edit', params: params }

			await this.ADMIN_ACT_CUSTOM_QUALITY(items).then(res => {
				console.log('ADMIN_ACT_CUSTOM_QUALITY', res)
				this.searchItems()
				this.loading = false
			})
		},
		removeData() {
			console.log('removeData', this.model)
			this.confirmRemove = false
		},
		makeExcelFile() {
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.headers), '품질보증등록')
		},
		excelDownload() {
			const a = document.createElement('a')
			const url =
				'https://dwe-on-greendongwha.s3.ap-northeast-2.amazonaws.com/greendongwha/asisdata/%ED%92%88%EC%A7%88%EB%B3%B4%EC%A6%9D%EA%B4%80%EB%A6%AC_as-is_data_20220426.xlsx'
			a.href = url
			a.download = url.split('/').pop()
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
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
