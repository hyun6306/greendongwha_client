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
		<AdminMainRecommendProductCreate
			v-if="createDialog"
			v-model="createModel"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminMainRecommendProductRead
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
			:text="`선택하신 ${common_title}이 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'AdminMainRecommendProduct',
	mixins: [common],
	data: () => ({
		mode: 'read',
		createModel: null,
		createDialog: false,
		openOrder: false,
		model: [],
		headers: [
			{ text: '순서', value: 'recommend_priority', width: '70px' },
			{ text: '추천제품', value: 'concat_name', width: '300px' },
			{ text: '상태', value: 'show', width: '150px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		desserts: [],
		orderHeader: [
			{ name: '순서', value: 'priority', width: '60' },
			{ name: '추천제품', value: 'concat_name', width: '350' },
			{ name: '', value: 'hendle-icon', width: '20' },
		],
		orderDesserts: [],
		confirmRemove: false,
		readMode: false,
		readItem: [],
		loading: false,
	}),
	computed: {
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
		...mapActions(['ADMIN_ACT_MAIN_RECOMMEND_PRODUCT']),
		async getList(query = null) {
			this.loading = true
			const items = { method: 'get', query: query }
			await this.ADMIN_ACT_MAIN_RECOMMEND_PRODUCT(items).then(res => {
				// 기간 확인 > 배열 재정의 > 상태값 재정의
				this.desserts = res
				this.loading = false
			})
		},
		dataFilter() {
			// 기간 확인 > 배열 재정의 > 상태값 재정의
			const list = this.common_onDatePeriodFilter(this.desserts)
			this.desserts = list
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
				return { product_id: item.product_id }
			})

			console.log('params', params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_MAIN_RECOMMEND_PRODUCT(items).then(() => {
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
				return { product_id: item.product_id, sortno: item.priority }
			})

			console.log('params', params)
			try {
				const items = { method: 'sort', params: params }
				await this.ADMIN_ACT_MAIN_RECOMMEND_PRODUCT(items).then(() => {
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
