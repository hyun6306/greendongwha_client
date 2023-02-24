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
								v-model="models.title"
								title="*제목"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.description"
								title="*설명"
								textarea
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

export default {
	name: 'AdminProductMasterStructureCreate',
	mixins: [model, common],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'N',
			image: null,
			title: null,
			description: null,
		},
		image: null,
		imageDeleteButton: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['use_yn', 'title', 'description']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}

			return false
		},
		editValue() {
			const checkValue = ['use_yn', 'title', 'description']

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

		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_CATEGORY_PRODUCT_GOODS_ITEMS']),
		startDataMapping() {
			this.models = {
				use_yn: this.editItem.use_yn,
				title: this.editItem.title,
				description: this.editItem.description,
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				use_yn: 'N',
				title: null,
				description: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				goods_code: this.editItem.goods_code,
				type_code: this.editItem.type_code,
				use_yn: this.models.use_yn,
				title: this.models.title,
				description: this.models.description,
				regi_userid: this.AUTH_GET_ADMIN_USER.name,
			}
			console.log('params', params)

			if (this.mode === 'edit') params.detail_id = this.editItem.detail_id

			try {
				const items = {
					params: params,
					type_code: this.editItem.type_code,
					goods_code: this.editItem.goods_code,
					method: this.mode,
				}
				await this.ADMIN_ACT_PRODUCT_CATEGORY_PRODUCT_GOODS_ITEMS(items)

				this.loading = false
				this.$emit('update', this.title)
			} catch (e) {
				console.log('admin.product.CategoryProduct/Put', e)
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
