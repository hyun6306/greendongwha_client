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
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.spacious_code"
								title="평형"
								:select="spaciousCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.tone_code"
								title="톤"
								:select="toneCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.style_code"
								title="스타일"
								:select="styleCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.familytype_code"
								title="가족형태"
								:select="familytypeCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="노출여부"
								:select="admin_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
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
							md="6"
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
				:height="common_tableHeight(550)"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>

		<AdminDisplayHouse3DCreate
			v-if="createDialog"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminDisplayHouse3DRead
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
import { mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminDisplayHouse3D',
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
			{ text: '노출여부', value: 'status', width: '60px', sortable: false },
			{ text: '평수', value: 'spacious_name', width: '80px' },
			{ text: '가족형태', value: 'familytype_name', width: '90px' },
			{ text: '톤', value: 'tone_name', width: '80px' },
			{ text: '스타일', value: 'style_name', width: '80px' },
			{ text: '제목', value: 'title', width: '120px' },
			{ text: '조회수', value: 'hits', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '90px' },
			{ text: '처리자', value: 'regi_userid', width: '90px' },
			{ text: '처리일', value: 'convert_date', width: '90px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			spacious_code: null,
			familytype_code: null,
			style_code: null,
			tone_code: null,
			use_yn: null,
			regi_date: null,
			title: null,
		},
		loading: false,

		spaciousCodeItems: [],
		familytypeCodeItems: [],
		styleCodeItems: [],
		toneCodeItems: [],
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	async created() {
		await this.getPublicCode()
		await this.getList()
	},
	async mounted() {},
	destroyed() {},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 3D 집들이 API
			'ADMIN_ACT_DISPLAY_HOUSE_3D',
		]),
		async getPublicCode() {
			// 평형코드 가져오기
			this.spaciousCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '902' })
			// 가족형태코드 가져오기
			this.familytypeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '903' })
			// 스타일코드 가져오기
			this.styleCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '904' })
			// 톤코드 가져오기
			this.toneCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '905' })
		},
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_DISPLAY_HOUSE_3D(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.models.regi_date)

			const params = {
				title: this.models.title || '',
				spacious_code: this.models.spacious_code ? this.models.spacious_code.code : '',
				tone_code: this.models.tone_code ? this.models.tone_code.code : '',
				style_code: this.models.style_code ? this.models.style_code.code : '',
				familytype_code: this.models.familytype_code ? this.models.familytype_code.code : '',
				use_yn: this.models.use_yn ? this.models.use_yn.value : '',
				regi_date_s: filterDate.startDate,
				regi_date_e: filterDate.endDate,
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
		makeExcelFile() {
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.headers), '3D집들이')
		},
		async removeData() {
			console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { hw_id: item.hw_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_DISPLAY_HOUSE_3D(items).then(() => {
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
