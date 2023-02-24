<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="`${title} 내용 확인`"
				@close="$emit('close')"
			/>
			<v-col class="pa-0 pa-md-3">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이름"
								:text="readItem.name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="회원 상태"
								:text="readItem.status"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="로그인ID"
								:text="readItem.login_id"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이메일"
								:text="readItem.emailaddr"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="휴대전화"
								:text="readItem.hand"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="비밀번호"
								:text-button="{
									text: '비밀번호 초기화',
									button: {
										text: '초기화',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="confirmReset = true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="우편번호"
								:text="readItem.zipcode"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="주소"
								:text="readItem.address1"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상세주소"
								:text="readItem.address2"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이메일 수신여부"
								:text="readItem.email_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="SMS 수신여부"
								:text="readItem.sms_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="가입일"
								:text="readItem.join_date"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="탈퇴일"
								:text="readItem.leave_date"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록자"
								:text="readItem.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="readItem.regi_date"
							/>
						</v-col>
					</v-row>
				</v-container>
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
			</v-col>
		</v-card>
		<CommonConfirm
			:dialog="confirmReset"
			:title="`비밀번호 초기화`"
			:text="`가입된 회원님의 휴대전화 <h3>${this.readItem.hand}</h3> 초기화된 비밀번호가 전송됩니다.<br/> 정말로 초기화 하시겠습니까?`"
			@close="confirmReset = false"
			@submit="resetPassword"
		/>
		<CommonDialog
			:dialog="confirmResetResult"
			:title="`초기화 완료`"
			:text="`<h3>${this.readItem.hand}</h3>로 비밀번호를 전송하였습니다.`"
			@close="confirmResetResult = false"
		/>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'AdminUserManagerRead',
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		confirmReset: false,
		confirmResetResult: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['AUTH_ACT_FIND_INFO']),
		async resetPassword() {
			const params = {
				member_kind: 1,
				name: this.readItem.name,
				login_id: this.readItem.login_id,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
				hand: this.readItem.hand,
			}

			const items = { method: 'password', params: params }

			await this.AUTH_ACT_FIND_INFO(items).then(res => {
				console.log('res', res)
				if (res) {
					this.confirmReset = false
					this.confirmResetResult = true
				}
			})
			console.log('password reset')
		},
	},
}
</script>

<style scoped lang="scss"></style>
