<template>
	<v-dialog
		v-model="dialog"
		persistent
		max-width="760"
	>
		<v-col class="pa-0 py-5 px-3 py-md-10 px-md-7 event_dialog">
			<v-col
				class="pa-0 popup_head"
				width="100%"
				elevation="0"
				tile
			>
				<v-row
					align="center"
					class="ma-0 pb-2"
				>
					<!-- 공통팝업 타이틀 -->
					<v-col
						class="pa-0 pop_title"
						cols="8"
						align="start"
					>
						동화자연마루 회원 탈퇴
					</v-col>

					<!-- 팝업닫기 버튼 -->
					<v-col
						class="pa-0"
						cols="4"
						align="end"
					>
						<v-btn
							icon
							large
							class="pa-0"
							@click="$emit('close')"
						>
							<v-icon
								large
								color="black"
								>clear</v-icon
							>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>

			<v-col
				class="pa-0 py-2 popup_cont"
				cols="12"
				align="center"
			>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<v-col
						class="pa-5 info_zone"
						elevation="0"
					>
						<v-col
							class="pa-0 mb-4 info_title"
							align="start"
						>
							탈퇴 사유를 알려주세요
						</v-col>
						<v-col>
							<CommonSelectsSelect01
								v-model="leave_code"
								:label="'선택해주세요.'"
								:items="secessionItems"
							/>
						</v-col>
						<v-col>
							<v-textarea
								v-model="leave_desc"
								outlined
								hide-details
								class="py-2"
							/>
						</v-col>
					</v-col>

					<v-col
						class="pa-0"
						cols="12"
					>
						<CommonButtonsButton02
							name="취소"
							color="#9fa1a4"
							class="mr-3"
							rounded
							@click="$emit('close')"
						/>
						<CommonButtonsButton02
							:disabled="allowValue"
							name="회원탈퇴"
							color="#00582c"
							rounded
							@click="actApiCall"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-col>
	</v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'UserModifySecessionDialog',
	mixins: [common],
	props: ['dialog', 'type'],
	data: () => ({
		leave_code: null,
		leave_desc: null,
		secessionItems: null,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER']),
		allowValue() {
			let check = true
			if (this.leave_code !== null) check = false
			return check
		},
	},
	watch: {},
	async created() {
		// 탈퇴사유 가져오기
		if (this.type === 'user') {
			// 일반
			this.secessionItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '501' })
		} else {
			// 인테리어
			this.secessionItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '502' })
		}
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS', 'USER_ACT_USER_SECESSTION', 'AUTH_ACT_LOGOUT']),
		async actApiCall() {
			let params = {
				leave_code: this.leave_code.code,
				leave_desc: this.leave_desc,
			}
			if (this.type === 'interior') params.corporate_no = this.AUTH_GET_USER.corporate_no

			const items = { method: this.type, params: params }
			await this.USER_ACT_USER_SECESSTION(items).then(async res => {
				await this.APP_MU_DIALOG({
					dialog: true,
					title: '회원탈퇴 완료',
					text: '정상적으로 탈퇴처리 되었습니다. 감사합니다.',
				}).then(() => {
					this.AUTH_ACT_LOGOUT().then(() => {
						this.$router.push('/')
					})
				})
			})
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.v-dialog) {
	background-color: #fff;
}

// 팝업헤드
.popup_head {
	border-bottom: 2px solid #262626;
	.pop_title {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 1.4rem;
	}
}
@media all and (max-width: 600px) {
	.btn_privacy {
		* {
			font-size: 12px;
		}
	}
}
</style>
