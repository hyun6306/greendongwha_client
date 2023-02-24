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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								:text="editItem.tag_group_name"
								title="태그 그룹"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								:text="editItem.tag_group_bigo"
								title="비고"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.tag_value"
								title="태그"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								:text="editItem.modify_userid"
								title="등록자"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								:text="editItem.modify_date"
								title="등록일"
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
	name: 'AdminProductTagCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			tag_value: null,
		},
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkText = ['tag_value']
			return this.common_allowTextCheck(this.models, checkText)
		},
		editValue() {
			const checkValue = ['tag_value']

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
		...mapActions(['ADMIN_ACT_PRODUCT_TAG_ITEMS']),
		startDataMapping() {
			this.models = {
				tag_value: this.editItem.tag_value,
			}
			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				tag_value: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			console.log('this.AUTH_GET_ADMIN_USER.login_id', this.AUTH_GET_ADMIN_USER.login_id)
			const params = {
				tag_group: this.editItem.tag_group,
				tag_value: this.models.tag_value,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			// 수정일 경우
			if (this.mode === 'edit') params.tag_id = this.editItem.tag_id

			console.log('parmas', params)

			try {
				const items = { params: params, method: this.mode }
				await this.ADMIN_ACT_PRODUCT_TAG_ITEMS(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('admin.product.TagPost', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
