<template>
	<v-container fluid>
		<v-col class="pa-1 pb-0">
			<v-row
				class="ma-0"
				align="center"
				justify="center"
			>
				<v-col
					cols="12"
					md="9"
				>
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.exclusive_area"
								title="평면적"
								:select="widthCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.modifyDate"
								title="견적상담의뢰 등록일"
								date-picker-one
							/>
						</v-col>
					</v-row>
				</v-col>
				<v-col
					align="end"
					class="py-0"
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

		<AdminEstimateEstimateCostCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminEstimateEstimateCostRead
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
	name: 'AdminEstimateEstimateCost',
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
			{ text: '전용면적(㎡)', value: 'exclusive_area', width: '80px' },
			{ text: '평면적(평)', value: 'py_area', width: '80px' },
			{ text: '베란다면적(㎡)', value: 'veranda_area', width: '80px' },
			{ text: '최대 범위비율(%)', value: 'range_ratio_max', width: '80px' },
			{ text: '최소 범위비율(%)', value: 'range_ratio_min', width: '80px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			exclusive_area: null,
			modifyDate: null,
		},
		widthCodeItems: [],
		loading: false,
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	watch: {},
	created() {
		this.getList()
	},
	async mounted() {
		// 평면적 데이터 가져오기
		await this.getData()
	},
	destroyed() {},
	methods: {
		...mapActions([
			// 평면적 데이터 가져오기
			'HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA',
			// 견적단가 API
			'ADMIN_ACT_ESTIMATE_ESTIMATE_PRICE',
		]),
		async getData() {
			await this.HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA().then(res => (this.widthCodeItems = res)) // 평면적 데이터
		},
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_ESTIMATE_ESTIMATE_PRICE(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const params = {
				py_area: this.models.exclusive_area ? this.models.exclusive_area.py_area : '',
				modify_date: this.models.modifyDate ? this.common_dateFilter(this.models.modifyDate) : '',
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
				return { exclusive_area: item.exclusive_area }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_ESTIMATE_ESTIMATE_PRICE(items).then(async () => {
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
		async closeDialog() {
			this.model = []
			this.readMode = false
			this.createDialog = false
			this.createPatternDialog = false
			this.searchItems()
		},
	},
}
</script>
