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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="*사용여부"
								:radio-group="common_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_kind"
								title="*사용구분"
								:select="admin_part_divisionItems"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.subject_name"
								title="*품목"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.subject_engname"
								title="품목(영문)"
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
import methods from 'methods'

export default {
	name: 'AdminProductCategoryPartCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'N',
			use_kind: null,
			subject_name: null,
			subject_engname: null,
		},
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['use_yn', 'use_kind', 'subject_name']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}
			return false
		},
		editValue() {
			const checkValue = ['use_yn', 'use_kind', 'subject_name', 'subject_engname']

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
	},
	created() {
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem, this.models)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_CATEGORY_ITEMS']),
		startDataMapping() {
			this.models = {
				use_yn: this.editItem.use_yn,
				use_kind: this.admin_part_divisionItems.find(items => items.value === this.editItem.use_kind),
				subject_name: this.editItem.subject_name,
				subject_engname: this.editItem.subject_engname,
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				use_yn: 'N',
				use_kind: '1',
				subject_name: null,
				subject_engname: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
				use_kind_1: this.models.use_kind.value,
				subject_name_1: this.models.subject_name,
				subject_engname_1: this.models.subject_engname,
			}

			// 수정일 경우
			if (this.mode === 'edit') params.subject_code_1 = this.editItem.subject_code

			console.log('parmas', params)
			try {
				const items = { params: params, query: '1', method: this.mode }
				await this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('admin.product.CategoryPost_Put/1', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
