<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="650"
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
								v-model="models.group_code"
								title="*코드 구분"
								:select="ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.code_name"
								title="*코드 값"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.bigo"
								title="비고"
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
									:disabled="allowValue"
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
	name: 'AdminProductPublicCodeCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			group_code: null,
			code_name: null,
			bigo: null,
		},
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS']),
		allowValue() {
			const checkValue = ['group_code']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['code_name']
			return this.common_allowTextCheck(this.models, checkText)
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
	mounted() {
		// filter
		this.models.group_code = this.common_findItem(
			this.models.group_code,
			this.ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS,
			'group_code',
		)
	},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_PUBLIC_CODE_ITEMS']),
		startDataMapping() {
			this.models = {
				group_code: this.editItem.group_code,
				code_name: this.editItem.code_name,
				bigo: this.editItem.bigo,
			}
			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				group_code: null,
				code_name: null,
				bigo: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				group_code: this.models.group_code.group_code,
				code_name: this.models.code_name,
				bigo: this.models.bigo,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			// 수정일 경우
			if (this.mode === 'edit') params.code = this.editItem.code

			console.log('parmas', params)

			try {
				const items = { params: params, method: this.mode }
				await this.ADMIN_ACT_PRODUCT_PUBLIC_CODE_ITEMS(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('admin.product.PublicCodePost', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
