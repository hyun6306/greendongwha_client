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
								v-model="models.companyname"
								title="회사명"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.custname"
								title="이름"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
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
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.phone"
								title="일반전화"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.email"
								title="이메일"
								input
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
				readonly
				@open="onReadItem"
			/>
		</v-col>

		<AdminCustomSpecialRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
			:read-item="readItem"
			@close="closeDialog"
		/>
	</v-container>
</template>

<script>
import common from '@/mixins/common'
import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	name: 'AdminCustomSpecial',
	mixins: [common],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		readItem: {},
		confirmRemove: false,
		headers: [
			{ text: '회사명', value: 'companyname', width: '150px' },
			{ text: '이름', value: 'custname', width: '100px' },
			{ text: '휴대폰', value: 'hand', width: '70px' },
			{ text: '일반전화', value: 'tel', width: '150px' },
			{ text: '이메일', value: 'email', width: '150px' },
			{ text: '연락가능시간', value: 'contact_time', width: '100px' },
			{ text: '등록일', value: 'regi_date', width: '150px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
		],
		models: {
			companyname: null,
			custname: null,
			hand: null,
			tel: null,
			email: null,
		},
		showDate: null,
		desserts: [],
		loading: false,
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	mounted() {
		this.getList()
	},
	destroyed() {},
	methods: {
		async getList(params = {}) {
			this.loading = true
			try {
				const res = await apiAdmin.custom.SpecialListGet(params)
				if (res) this.desserts = adminParse.custom.special.parser(res)
				else this.desserts = []
				this.loading = false
			} catch (e) {
				console.log('admin.custom.SpecialListGet', e)
				this.loading = false
			}
		},
		searchItems() {
			const params = {
				companyname: this.models.companyname ? this.models.companyname : null,
				custname: this.models.custname ? this.models.custname : null,
				hand: this.models.hand ? this.models.hand : null,
				tel: this.models.tel ? this.models.tel : null,
				email: this.models.email ? this.models.email : null,
				regi_date: this.showDate ? this.common_dateFilter(this.showDate) : null,
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
			this.addItem = []
			this.readMode = false
			this.searchItems()
		},
	},
}
</script>
