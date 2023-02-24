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
				:show-expand="true"
				:height="common_tableHeight(380)"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>
		<AdminMainBannerCreate
			v-if="createDialog"
			v-model="createModel"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminMainBannerRead
			v-if="readMode"
			:dialog="readMode"
			:read-item="readItem"
			@close="closeDialog"
		/>
		<CommonDataTableGridTypeDrag01
			v-if="openOrder"
			v-model="desserts"
			:title="common_title"
			:dialog="openOrder"
			:headers="orderHeader"
			:desserts="desserts"
			@close="openOrder = false"
			@submit="onApiCallOrder"
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
import { mapActions } from 'vuex'
import common from '@/mixins/common'
import moment from '@/mixins/moment'

export default {
	name: 'AdminMainBanner',
	mixins: [common, moment],
	data: () => ({
		mode: 'read',
		createModel: null,
		createDialog: false,
		openOrder: false,
		model: [],
		headers: [
			{ text: '상태', value: 'state', width: '70px' },
			{ text: '노출기간', value: 'showDate', width: '150px' },
			{ text: '제목', value: 'title', width: '100px' },
			{ text: '내용', value: 'contents', width: '150px' },
			{ text: '', value: 'data-table-expand', width: '30px', sortable: false },
			{ text: '썸네일', value: 'thumbnail', width: '70px', sortable: false },
			{ text: '이미지', value: 'image', width: '70px', sortable: false },
			{ text: '링크', value: 'link', width: '70px', sortable: false },
			{ text: '등록자', value: 'regi_userId', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		desserts: [],
		orderHeader: [
			{ name: '순서', value: 'priority', width: '60' },
			{ name: '제목', value: 'title', width: '350' },
			{ name: '이미지', value: 'image', width: '100' },
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
	watch: {
		model(val) {
			console.log(val)
		},
		createModel(val) {
			console.log(val)
		},
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
		...mapActions(['ADMIN_ACT_MAIN_BANNER']),
		async getList(query = null) {
			this.loading = true
			const items = { method: 'search', query: query }
			await this.ADMIN_ACT_MAIN_BANNER(items).then(res => {
				// 기간 확인 > 배열 재정의 > 상태값 재정의
				this.desserts = this.common_onDatePeriodFilter(res)
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
				return { id: item.id }
			})

			console.log('params', params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_MAIN_BANNER(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.getList()
				})
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
			}
		},
		async onApiCallOrder(val) {
			const orderItems = val.filter(x => x.state === true)
			const orderList = []
			orderItems.forEach((element, i) =>
				orderList.push({
					id: element.id,
					priority: i + 1,
				}),
			)
			console.log('onApiCallOrder', orderList)

			const items = { method: 'priority', params: orderList }
			await this.ADMIN_ACT_MAIN_BANNER(items)
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
