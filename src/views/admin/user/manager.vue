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
							md="2"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.status"
								title="상태"
								:select="admin_user_divisions"
							/>
						</v-col>
						<v-col
							cols="12"
							md="2"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.login_id"
								title="ID"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="2"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.name"
								title="이름"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.hand"
								title="휴대폰"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.join_date"
								title="가입일"
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
	name: 'AdminUserManager',
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
			{ text: '구분', value: 'status', width: '60px' },
			{ text: 'ID', value: 'login_id', width: '100px' },
			{ text: '이름', value: 'name', width: '150px' },
			{ text: '전화번호', value: 'hand', width: '150px' },
			{ text: '가입일', value: 'regi_date', width: '100px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			status: null,
			login_id: null,
			name: null,
			hand: null,
			join_date: null,
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
		...mapActions(['ADMIN_ACT_USER_USER']),
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_USER_USER(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.models.join_date)

			const params = {
				status: this.models.status?.value || '',
				login_id: this.models.login_id || '',
				name: this.models.name || '',
				hand: this.models.hand || '',
				join_date_s: filterDate.startDate,
				join_date_e: filterDate.endDate,
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
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.headers), '회원정보')
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
				await this.ADMIN_ACT_USER_USER(items).then(() => {
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
