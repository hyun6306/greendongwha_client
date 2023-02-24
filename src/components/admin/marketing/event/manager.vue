<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="`${title} 참여자 관리`"
				@close="$emit('close')"
			/>
			<v-col class="pa-0 pa-md-3">
				<v-container class="admin_table">
					<v-col class="pa-4 px-md-4 pt-0">
						<v-row class="ma-0">
							<v-col
								cols="6"
								class="pa-0"
							>
								<v-btn
									dark
									tile
									elevation="0"
									color="primary"
									@click="makeExcelFile"
								>
									<v-icon class="pr-2">mdi-download</v-icon>
									<p class="hidden-md-and-down">excel download</p>
								</v-btn>
							</v-col>
							<v-col
								cols="6"
								class="pa-0"
								align="end"
							>
								<p>전체 : {{ readItem.participating_user.length }} 건</p>
							</v-col>
						</v-row>

						<CommonDataTableGridType02
							:headers="headers"
							:desserts="readItem.participating_user"
							:height="common_tableHeight(0)"
							readonly
							@status="onEditStatusItem"
						/>
					</v-col>
					<v-row
						class="ma-0"
						align="center"
						justify="end"
					>
						<v-col
							cols="12"
							sm="4"
							md="3"
							lg="2"
						>
							<v-btn
								color="error"
								block
								tile
								elevation="0"
								@click="$emit('close')"
							>
								<v-icon>clear</v-icon>
								<span class="ml-2">닫기</span>
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import admin from '@/mixins/admin'
import common from '@/mixins/common'

export default {
	name: 'AdminMarketingEventManager',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: null,
		onViewDialog: false,
		headers: [
			{ text: '당첨여부', value: 'data_status_event', width: '100px' },
			{ text: '로그인ID', value: 'login_id', width: '100px' },
			{ text: '이름', value: 'name', width: '80px' },
			{ text: '휴대폰', value: 'hand', width: '100px' },
			{ text: 'URL', value: 'message_url', width: '100px' },
			{ text: '참여일', value: 'enter_date', width: '100px' },
		],
	}),
	computed: {},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_MARKETING_EVENT']),
		makeExcelFile() {
			this.common_create_excel(this.common_excel_data_convert(this.readItem.participating_user, this.headers), '견적관리')
		},
		async onEditStatusItem(item) {
			const params = {
				event_id: this.readItem.event_id,
				win_yn: item.status.value,
				login_id: this.readItem.regi_userid,
			}

			const items = { method: 'winPost', params: params }

			await this.ADMIN_ACT_MARKETING_EVENT(items).then(() => {
				this.$emit('submit')
			})
		},
	},
}
</script>

<style scoped lang="scss"></style>
