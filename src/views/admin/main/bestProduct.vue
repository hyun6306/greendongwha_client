<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col class="pa-3 pa-md-5">
			<v-col class="pa-0">
				<h3>등록기준</h3>
			</v-col>
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
				:height="'280px'"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>
		<v-col class="pa-3 pt-0 pa-md-5">
			<v-col class="pa-0">
				<h3>조회수 기준</h3>
			</v-col>
			<CommonDataTableGridType02
				:headers="hitHeaders"
				:desserts="hitDesserts"
				:height="'280px'"
				:loading="loading"
				readonly
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>
		<AdminMainBestProductCreate
			v-if="createDialog"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminMainBestProductRead
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
import common from '@/mixins/common'
import { mapActions } from 'vuex'

export default {
	name: 'AdminMainBestProduct',
	mixins: [common],
	data: () => ({
		mode: 'read',
		createDialog: false,
		openOrder: false,
		model: [],
		orderDesserts: [],
		headers: [
			{ text: '노출순서', value: 'best_priority', width: '70px' },
			{ text: '베스트제품', value: 'product_name', width: '300px' },
			{ text: '조회수', value: 'hits', width: '100px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		desserts: [],
		hitHeaders: [
			{ text: '조회수', value: 'hits', width: '120px' },
			{ text: '베스트제품', value: 'concat_name', width: '300px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
		],
		hitDesserts: [],
		orderHeader: [
			{ name: '순서', value: 'priority', width: '80' },
			{ name: '베스트 제품', value: 'product_name', width: '430' },
			{ name: '조회수', value: 'hits', width: '100' },
			{ name: '', value: 'hendle-icon', width: '20' },
		],
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
	created() {
		// this.dataFilter()
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_MAIN_BEST_PRODUCT']),
		async getList(query = null) {
			this.loading = true
			// 베트스 제품
			let items = { method: 'bestItems', query: query }
			await this.ADMIN_ACT_MAIN_BEST_PRODUCT(items)
				.then(res => {
					this.desserts = res
				})
				.catch(() => {
					this.loading = false
				})

			// 조회수 기준
			items = { method: 'hitItems', query: query }
			await this.ADMIN_ACT_MAIN_BEST_PRODUCT(items)
				.then(res => {
					this.hitDesserts = res
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
			console.log('bestItems', this.desserts)
			console.log('hitItems', this.hitDesserts)
		},
		dataFilter() {
			// 기간 확인 > 배열 재정의 > 상태값 재정의
			const list = this.common_onDatePeriodFilter(this.desserts)
			this.$nextTick(() => {
				this.desserts = list
				this.hitDataFilter(list)
			})
		},
		hitDataFilter(list) {
			// 등록되어 있는 제품 조회기준 List 목록에서 삭제
			list.filter(x => x.state).forEach(element =>
				this.hitDesserts.splice(
					this.hitDesserts.findIndex(x => x.id === element.id),
					1,
				),
			)
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
				await this.ADMIN_ACT_MAIN_BEST_PRODUCT(items).then(() => {
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
				await this.ADMIN_ACT_MAIN_BEST_PRODUCT(items).then(() => {
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
