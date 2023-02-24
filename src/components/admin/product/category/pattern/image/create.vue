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
								v-model="models.title"
								title="*패턴 이미지"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.textEnglish"
								title="패턴 이미지(영문)"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.imageUrl"
								title="*이미지 URL"
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
									@click="onCreateItem"
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
									@click="onEditItem"
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
import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'AdminProductCategoryPatternImageCreate',
	mixins: [model, common],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			title: null,
			textEnglish: null,
			imageUrl: null,
		},
		loading: false,
	}),
	computed: {
		allowValue() {
			const checkValue = ['title', 'textEnglish', 'imageUrl']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}
			return false
		},
		editValue() {
			const checkValue = ['title', 'textEnglish', 'imageUrl']
			for (let i of checkValue) {
				if (this.models[i] !== this.editItem[i]) return true
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
		if (this.editItem && this.mode === 'edit') {
			this.models.title = this.editItem.title
			this.models.textEnglish = this.editItem.textEnglish
			this.models.imageUrl = this.editItem.imageUrl
		}

		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.models = {
				title: null,
				textEnglish: null,
				imageUrl: null,
			}
		},
		onCreateItem() {
			this.loading = true
			setTimeout(() => {
				console.log('createItem', this.models)
				this.loading = false
				this.$emit('close')
			}, 2000)
		},
		onEditItem() {
			this.loading = true
			setTimeout(() => {
				console.log('editItem', this.models)
				this.loading = false
				this.$emit('close')
			}, 2000)
		},
	},
}
</script>

<style scoped lang="scss"></style>
