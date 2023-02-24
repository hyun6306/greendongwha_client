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
								v-model="models.name"
								title="이름"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="회원 상태"
								:text="editItem.status"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="로그인ID"
								:text="editItem.login_id"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.emailaddr"
								title="이메일"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.hand"
								title="휴대전화"
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
								v-model="models.email_yn"
								title="*이메일 수신여부"
								:radio-group="common_receiveItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.sms_yn"
								title="*SMS 수신여부"
								:radio-group="common_receiveItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="가입일"
								:text="editItem.join_date"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="탈퇴일"
								:text="editItem.leave_date"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록자"
								:text="editItem.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="editItem.regi_date"
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
	name: 'AdminUserManagerCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			emailaddr: null,
			name: null,
			hand: null,
			email_yn: null,
			sms_yn: null,
		},
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['email_yn', 'sms_yn']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['emailaddr', 'name', 'hand']
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
		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_USER_USER']),
		startDataMapping() {
			this.models = {
				emailaddr: this.editItem.emailaddr,
				name: this.editItem.name,
				hand: this.common_dateFilter(this.editItem.hand),
				email_yn: this.editItem.email_yn,
				sms_yn: this.editItem.sms_yn,
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				emailaddr: null,
				name: null,
				hand: null,
				email_yn: null,
				sms_yn: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				login_id: this.editItem.login_id,
				emailaddr: this.models.emailaddr,
				name: this.models.name,
				hand: this.models.hand,
				email_yn: this.models.email_yn,
				sms_yn: this.models.sms_yn,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			console.log('parmas', params)

			try {
				const items = { method: this.mode, params: params }
				await this.ADMIN_ACT_USER_USER(items).then(() => {
					this.loading = false
					this.$emit('close')
				})
			} catch (e) {
				console.log('admin.user.UserGet', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
