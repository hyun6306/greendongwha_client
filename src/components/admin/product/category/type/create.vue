<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? `${title} 등록` : `${title} 수정`"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="*사용여부"
								radio
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="partModel"
								title="*품목명"
								:select="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.kind_name"
								title="*종류"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.kind_engname"
								title="종류(영문)"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.tooltip"
								title="툴팁"
								input
								:fill="true"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						md="6"
						class="pl-0"
					>
						<v-row class="ma-0">
							<v-col cols="6">
								<v-btn
									color="error"
									block
									tile
									elevation="0"
									@click="$emit('close')"
								>
									<v-icon>clear</v-icon>
									<span class="ml-2">취소</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'create'"
								cols="6"
							>
								<v-btn
									color="primary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>add</v-icon>
									<span class="ml-2">등록</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'edit'"
								cols="6"
							>
								<v-btn
									color="secondary"
									block
									tile
									elevation="0"
									:disabled="!editValue"
									@click="onApiCallItem"
								>
									<v-icon>edit</v-icon>
									<span class="ml-2">수정</span>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminProductCategoryTypeCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'N',
			part: null,
			kind_name: null,
			kind_engname: null,
			tooltip: null,
		},
		partModel: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS', 'AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['use_yn', 'part', 'kind_name']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}
			return false
		},
		editValue() {
			const checkValue = ['use_yn', 'part', 'kind_name', 'kind_engname', 'tooltip']

			for (let i of checkValue) {
				if (this.models[i] !== this.origin[i]) return true
			}

			return false
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		partModel(val) {
			this.models.part = val
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_CATEGORY_ITEMS']),
		startDataMapping() {
			this.partModel = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS, this.editItem, 'subject_code')

			this.models = {
				part: this.partModel,
				use_yn: this.editItem.use_yn,
				kind_name: this.editItem.kind_name,
				kind_engname: this.editItem.kind_engname,
				tooltip: this.editItem.tooltip,
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				use_yn: 'N',
				part: null,
				kind_name: null,
				kind_engname: null,
				tooltip: null,
			}
			this.partModel = null
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
				subject_code_2: this.partModel.subject_code,
				kind_name_2: this.models.kind_name,
				kind_engname_2: this.models.kind_engname,
				tooltip_2: this.models.tooltip,
			}

			// 수정일 경우
			if (this.mode === 'edit') params.kind_code_2 = this.editItem.kind_code

			console.log('parmas', params)

			try {
				const items = { params: params, query: '2', method: this.mode }
				await this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('admin.product.category.CategoryPost_Put/2', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
