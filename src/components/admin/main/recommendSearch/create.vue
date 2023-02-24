<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="700"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? '추천검색어 등록' : '추천검색어 수정'"
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
								v-model="models.search_name"
								title="*검색어"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.link"
								title="*링크"
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

export default {
	name: 'AdminMainRecommendSearchCreate',
	mixins: [model, common],
	props: ['dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			search_name: null,
			link: null,
		},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkText = ['search_name', 'link']
			return this.common_allowTextCheck(this.models, checkText)
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') {
			this.models.search_name = this.editItem.search_name
			this.models.link = this.editItem.link
		}

		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_MAIN_RECOMMEND_SEARCH']),
		resetData() {
			this.models = {
				search_name: null,
				link: null,
			}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				search_name: this.models.search_name,
				link_url: this.models.link,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // user id
			}

			if (this.mode === 'edit') params.search_id = this.editItem.search_id

			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_MAIN_RECOMMEND_SEARCH(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_MAIN_RECOMMEND_SEARCH', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
