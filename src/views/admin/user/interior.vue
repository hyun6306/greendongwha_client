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
								v-model="models.app_state"
								title="상태"
								:select="admin_user_interior_statusItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.recommand_yn"
								title="추천"
								:select="admin_user_interior_recommand_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.app_date"
								title="승인일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.city"
								title="지역"
								:select="cityItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="8"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.keyword"
								title="검색"
								input
								label="로그인ID, 이름, 휴대폰, 회사명, 대표자명, 회사전화로 검색"
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
			<v-row
				class="ma-0"
				align="center"
			>
				<!--                <v-col cols="10" sm="6" md="4" xl="3" class="pl-0">
                    <v-col cols="4" class="pa-0">
                        <v-btn
                            color="error"
                            block
                            :disabled="!checkRemoveModel"
                            @click="confirmRemove = true"
                        >
                            <v-icon>delete</v-icon>
                            <span class="hidden-md-and-down ml-2">삭제</span>
                        </v-btn>
                    </v-col>
                </v-col>-->
			</v-row>
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

		<AdminUserInteriorCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminUserInteriorRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
			:read-item="readItem"
			@close="closeDialog"
		/>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminUserInterior',
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
			{ text: '가입상태', value: 'join_state', width: '90px' },
			{ text: '승인일', value: 'app_date', width: '150px' },
			{ text: '로그인ID', value: 'login_id', width: '150px' },
			{ text: '이름', value: 'manager_name', width: '80px' },
			{ text: '휴대폰번호', value: 'manager_hand', width: '100px' },
			{ text: '업체명', value: 'business_name', width: '150px' },
			{ text: '대표자명', value: 'boss_name', width: '100px' },
			{ text: '회사전화번호', value: 'company_tel', width: '110px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		excelHeaders: [
			{ text: '로그인ID', value: 'login_id' },
			{ text: '이름', value: 'manager_name' },
			{ text: '휴대폰번호', value: 'manager_hand' },
			{ text: '업체명', value: 'business_name' },
			{ text: '대표자명', value: 'boss_name' },
			{ text: '설립연월', value: 'company_estdate' },
			{ text: '회사전화번호', value: 'company_tel' },
			{ text: '안심번호', value: 'security_tel' },
			{ text: '사업자등록번호', value: 'corporate_no' },
			{ text: '업체주소', value: 'company_addr1' },
			{ text: '상세주소', value: 'company_addr2' },
			{ text: '위도', value: 'latitude' },
			{ text: '경도', value: 'longitude' },
		],
		models: {
			app_state: null,
			recommand_yn: null,
			city: null,
			app_date: null,
			keyword: null,
		},
		desserts: [],
		loading: false,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_USER_INTERIOR_CITY_ITEMS']),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
		cityItems() {
			return this.ADMIN_GET_USER_INTERIOR_CITY_ITEMS || []
		},
	},
	created() {
		if (!this.ADMIN_GET_USER_INTERIOR_CITY_ITEMS.length) this.getCityItems()
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_USER_INTERIOR']),
		async getCityItems() {
			const items = { method: 'getCity' }
			await this.ADMIN_ACT_USER_INTERIOR(items)
		},
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_USER_INTERIOR(items).then(res => {
				console.log('ADMIN_ACT_USER_INTERIOR', res)
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.models.app_date)

			const params = {
				app_state: this.models.app_state?.value || '',
				recommand_yn: this.models.recommand_yn?.value || '',
				city: this.models.city || '',
				app_date_s: filterDate.startDate,
				app_date_e: filterDate.endDate,
				keyword: this.models.keyword || '',
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
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.excelHeaders), '인테리어 회원정보')
		},
		async removeData() {
			console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { corporate_no: item.corporate_no }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_USER_INTERIOR(items).then(() => {
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
			this.readMode = false
			this.createDialog = false
			this.searchItems()
		},
	},
}
</script>
