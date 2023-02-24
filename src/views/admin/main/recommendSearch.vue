<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col class="pa-3 pa-md-5">
			<AdminItemsTableTopbar
				:check-remove-model="checkRemoveModel"
				:desserts-length="desserts.length"
				@callCreate="onCreateItem()"
				@callConfirmRemove="confirmRemove = true"
				@callOpenOrder="openOrder = true"
			/>
			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(380)"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>
		<AdminMainRecommendSearchCreate
			v-if="createDialog"
			v-model="createModel"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminMainRecommendSearchRead
			v-if="readMode"
			:dialog="readMode"
			:read-item="readItem"
			@close="closeDialog"
		/>
		<CommonDataTableGridTypeDrag01
			v-if="openOrder"
			v-model="orderDesserts"
			title="노출 순서"
			:dialog="openOrder"
			:headers="orderHeader"
			:desserts="desserts"
			show-all
			@close="openOrder = false"
			@submit="sortPostData"
		/>
		<CommonConfirm
			:dialog="confirmRemove"
			:title="`${common_title} 삭제`"
			:text="`선택하신 ${common_title}가 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'AdminMainRecommendSearch',
	mixins: [common],
	data: () => ({
		mode: 'read',
		createModel: null,
		createDialog: false,
		openOrder: false,
		model: [],
		headers: [
			{ text: '순서', value: 'priority', width: '80px' },
			{ text: '검색어', value: 'search_name', width: '150px' },
			{ text: '링크', value: 'link', width: '70px', sortable: false },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		desserts: [],
		orderHeader: [
			{ name: '순서', value: 'priority', width: '60' },
			{ name: '추천검색어', value: 'search_name', width: '200' },
			{ name: '', value: 'hendle-icon', width: '20' },
		],
		orderDesserts: [],
		confirmRemove: false,
		readMode: false,
		readItem: [],
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	watch: {
		mode(val) {
			if (val === 'read') this.model = []
		},
	},
	created() {
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_MAIN_RECOMMEND_SEARCH']),
		async getList(query = null) {
			this.loading = true
			const items = { method: 'get', query: query }
			await this.ADMIN_ACT_MAIN_RECOMMEND_SEARCH(items).then(res => {
				this.desserts = res
				this.loading = false
			})
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
				return { search_id: item.search_id }
			})

			console.log('params', params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_MAIN_RECOMMEND_SEARCH(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.getList()
				})
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
				this.loading = false
			}
		},
		async sortPostData() {
			console.log('sortPostData', this.orderDesserts)
			this.loading = true
			const params = this.orderDesserts.map(item => {
				return { search_id: item.search_id, sortno: item.priority, regi_userid: this.AUTH_GET_ADMIN_USER.login_id }
			})

			console.log('params', params)
			try {
				const items = { method: 'sort', params: params }
				await this.ADMIN_ACT_MAIN_RECOMMEND_SEARCH(items).then(() => {
					this.loading = false
					this.model = []
					this.getList()
				})
			} catch (e) {
				console.log(e)
				this.loading = false
			}
		},
		closeDialog() {
			this.model = []
			this.readMode = false
			this.createDialog = false
			this.getList()
		},
	},
}
</script>
