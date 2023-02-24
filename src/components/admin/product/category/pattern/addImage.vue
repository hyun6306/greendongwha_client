<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1200"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="`${title} 정보`"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<AdminItemsTableTopbar
					:check-remove-model="checkRemoveModel"
					:desserts-length="editItem.images.length"
					@callCreate="onCreateItem()"
					@callConfirmRemove="confirmRemove = true"
					@callOpenOrder="openOrder = true"
				/>
				<CommonDataTableGridType02
					v-model="model"
					:headers="headers"
					:desserts="editItem.images"
					:height="'280px'"
					:loading="loading"
					@open="onReadItem"
					@edit="onEditItem"
				/>
			</v-col>
		</v-card>

		<AdminProductCategoryPatternImageCreate
			v-if="createDialog"
			v-model="createModel"
			:title="title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminProductCategoryPatternImageRead
			v-if="readMode"
			:title="title"
			:dialog="readMode"
			:read-item="readItem"
			@close="closeDialog"
		/>

		<CommonDataTableGridTypeDrag01
			v-if="openOrder"
			v-model="changeOrder"
			:title="`${title} 노출 순서`"
			:dialog="openOrder"
			:headers="orderHeader"
			:desserts="editItem.images"
			:show-all="true"
			@close="openOrder = false"
		/>

		<CommonConfirm
			:dialog="confirmRemove"
			:title="`${title} 삭제`"
			:text="`선택하신 목록이 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</v-dialog>
</template>

<script>
// import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'AdminProductCategoryPatternAddImage',
	mixins: [
		// model,
		common,
	],
	props: ['title', 'dialog', 'editItem'],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		readItem: {},
		loading: false,
		headers: [
			{ text: '제목', value: 'title', width: '100px' },
			{ text: '이미지', value: 'image', width: '70px', sortable: false },
			{ text: '등록자', value: 'regi_userId', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		confirmRemove: false,
		openOrder: false,
		createModel: [],
		createDialog: false,
		changeOrder: null,
		orderHeader: [
			{ name: '순서', value: 'priority', width: '60' },
			{ name: '제목', value: 'title', width: '200' },
			{ name: '', value: 'hendle-icon', width: '20' },
		],
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length : false
		},
	},
	watch: {
		// model(val){
		// 	console.log('model',val)
		// },
	},
	created() {
		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
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
		resetData() {},
		removeData() {
			console.log('removeData', this.model)
			this.confirmRemove = false
		},
		closeDialog() {
			this.model = []
			this.readMode = false
			this.createDialog = false
			this.createPatternDialog = false
		},
	},
}
</script>

<style scoped lang="scss"></style>
