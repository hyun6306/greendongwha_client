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
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.docu_kind"
								title="구분"
								:select="admin_certification_divisionItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.exposure_yn"
								title="상태"
								:select="common_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							lg="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="등록일"
								date-picker
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							lg="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="partModel"
								title="품목"
								:select="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							lg="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.certification"
								title="인증서"
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
				:height="common_tableHeight(550)"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>

		<AdminReferenceCertificationCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminReferenceCertificationRead
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
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminReferenceCertification',
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
			{ text: '상태', value: 'exposure_yn', width: '60px' },
			{ text: '구분', value: 'docu_kind_name', width: '70px' },
			{ text: '품목', value: 'subject_name', width: '100px' },
			{ text: '제품명', value: 'relatedpd_name', width: '150px' },
			{ text: '제목', value: 'docu_name', width: '150px' },
			{ text: '인증기관', value: 'authority', width: '100px' },
			{ text: '발행일', value: 'auth_to', width: '100px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			docu_kind: null,
			exposure_yn: null,
			title: null,
			certification: null,
		},
		partModel: null,
		showDate: null,
		loading: false,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS']),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	watch: {
		partModel(val) {
			this.models.part = val
			if (this.models.part !== val) this.typeModel = null
		},
		typeModel(val) {
			this.models.type = val
		},
	},
	created() {
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_REFERENCE_CERTIFICATION']),
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_REFERENCE_CERTIFICATION(items).then(res => {
				console.log('ADMIN_ACT_REFERENCE_CERTIFICATION', res)
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
				startDate = ''
				endDate = ''
			}

			const params = {
				docu_kind: this.models.docu_kind ? this.models.docu_kind?.value : '',
				exposure_yn: this.models.exposure_yn ? this.models.exposure_yn?.value : '',
				regi_date_s: startDate,
				regi_date_e: endDate,
				subject_code: this.partModel?.subject_code || '',
				docu_name: this.models.certification || '',
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
				return { docu_id: item.docu_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_REFERENCE_CERTIFICATION(items).then(() => {
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
			this.createDialog = false
			this.searchItems()
		},
	},
}
</script>
