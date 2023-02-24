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
								v-model="models.exclusive_area"
								title="*전용면적 (㎡)"
								input
								:input-type="'number'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.veranda_area"
								title="*베란다면적 (㎡)"
								input
								:input-type="'number'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.range_ratio_max"
								title="*최대 범위비율 (%)"
								input
								:input-type="'number'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.range_ratio_min"
								title="*최소 범위비율 (%)"
								input
								:input-type="'number'"
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
	name: 'AdminEstimateProductCostCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			exclusive_area: null,
			veranda_area: null,
			range_ratio_max: null,
			range_ratio_min: null,
		},
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkText = ['exclusive_area', 'veranda_area', 'range_ratio_max', 'range_ratio_min']
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
		console.log('editItem', this.editItem, this.models, this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT)
	},
	async mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions([
			// 견적단가 API
			'ADMIN_ACT_ESTIMATE_ESTIMATE_PRICE',
		]),
		startDataMapping() {
			this.models = {
				exclusive_area: this.editItem.exclusive_area,
				veranda_area: this.editItem.veranda_area,
				range_ratio_max: this.editItem.range_ratio_max,
				range_ratio_min: this.editItem.range_ratio_min,
			}
			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				exclusive_area: null,
				veranda_area: null,
				range_ratio_max: null,
				range_ratio_min: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				exclusive_area: this.models.exclusive_area,
				veranda_area: this.models.veranda_area,
				range_ratio_max: this.models.range_ratio_max,
				range_ratio_min: this.models.range_ratio_min,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			console.log('parmas', params)

			try {
				const items = { method: this.mode, params: params }
				await this.ADMIN_ACT_ESTIMATE_ESTIMATE_PRICE(items).then(() => {
					this.loading = false
					this.$emit('close')
				})
			} catch (e) {
				console.log('admin.estimate.EstimatePriceGet', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
