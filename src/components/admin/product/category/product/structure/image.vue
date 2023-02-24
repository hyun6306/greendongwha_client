<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="`구조도 등록`"
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
								v-model="image"
								title="이미지"
								file
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
							<v-col cols="6">
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
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import apiAdmin from '@/api/admin'

export default {
	name: 'AdminProductMasterStructureCreate',
	mixins: [model, common],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		image: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			let check = false

			const checkImage = ['image']

			for (let i of checkImage) {
				if (this[i] === null) check = true
			}

			return check
		},
		editValue() {
			let check = false

			const checkImage = ['image']

			for (let i of checkImage) {
				if (this[i] !== this.origin[i]) check = true
			}

			return check
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	created() {
		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.image = null
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				goods_code: this.editItem.goods_code,
				type_code: this.editItem.type_code,
				image: this.image,
				regi_userid: this.AUTH_GET_ADMIN_USER.name,
			}
			console.log('params', params)

			try {
				await apiAdmin.product.CategoryProductGoodsStructureImagePost(params)

				this.loading = false
				this.$emit('update', this.title)
			} catch (e) {
				console.log('CategoryProductGoodsStructureImagePost', e)
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
