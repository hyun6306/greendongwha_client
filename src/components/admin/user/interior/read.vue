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
					<h3 class="py-3 pl-2">< 담당자 정보 ></h3>
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="가입상태"
								:text="readItem.join_state"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상태요청일"
								:text="readItem.app_date"
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
								title="로그인 횟수"
								:text="readItem.hits"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이메일(추가)"
								:text="readItem.emailaddr"
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이름"
								:text="readItem.manager_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="휴대전화"
								:text="readItem.manager_hand"
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
							class="pa-0"
						>
							<AdminItemsTableItem
								title="탈퇴사유"
								:text="readItem.app_desc"
								:fill="true"
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
								:text="readItem.emailReceive_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="수정자"
								:text="readItem.modify_date"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="수정일"
								:text="readItem.modify_userid"
							/>
						</v-col>
					</v-row>
					<h3 class="py-3 pl-2">< 인테리어점 정보 ></h3>
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="업체명"
								:text="readItem.business_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="대표자"
								:text="readItem.boss_name"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="설립연도"
								:text="readItem.company_estdate ? common_number_filter(readItem.company_estdate, 'date') : ''"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="사업자번호"
								:text-button="{
									text: readItem.corporate_no ? common_number_filter(readItem.corporate_no, 'business') : '',
									button: {
										text: '사업자등록증 확인',
										color: 'primary',
										link: readItem.corporate_url,
									},
								}"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="회사전화"
								:text="readItem.company_tel ? common_number_filter(readItem.company_tel) : ''"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="우편번호"
								:text="readItem.company_zipcode"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="주소"
								:text="readItem.company_addr1"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상세주소"
								:text="readItem.company_addr2"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="지도 (위도)"
								:text="readItem.latitude"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="지도 (경도)"
								:text="readItem.longitude"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="홈페이지"
								:text-button="{
									text: readItem.homepage_url,
									button: {
										text: '홈페이지 확인',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem.homepage_url)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="인스타그램"
								:text-button="
									readItem.company_snscode1 !== null
										? {
												text: readItem.company_snscode1,
												button: {
													text: '인스타그램',
													color: 'primary',
												},
										  }
										: ''
								"
								:fill="true"
								@click="common_onLink(readItem.company_snscode1)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="네이버 블로그"
								:text-button="
									readItem.company_snscode2 !== null
										? {
												text: readItem.company_snscode2,
												button: {
													text: '네이버 블로그',
													color: 'primary',
												},
										  }
										: ''
								"
								:fill="true"
								@click="common_onLink(readItem.company_snscode2)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="페이스북"
								:text-button="
									readItem.company_snscode3 !== null
										? {
												text: readItem.company_snscode3,
												button: {
													text: '페이스북',
													color: 'primary',
												},
										  }
										: ''
								"
								:fill="true"
								@click="common_onLink(readItem.company_snscode3)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="유튜브"
								:text-button="
									readItem.company_snscode4 !== null
										? {
												text: readItem.company_snscode4,
												button: {
													text: '유튜브',
													color: 'primary',
												},
										  }
										: ''
								"
								:fill="true"
								@click="common_onLink(readItem.company_snscode4)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="시공분야"
								:text="readItem.buildtype.length > 0 ? readItem.buildtype.map(x => x.code_name).join(',') : ''"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="인테리어점 사진"
								:text-button="{
									text: readItem.company_picurl,
									button: {
										text: '사진 보기',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem.company_picurl)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="회사로고"
								:text-button="{
									text: readItem.company_logourl,
									button: {
										text: '사진 보기',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem.company_logourl)"
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
			:text="`가입된 회원님의 휴대전화 <h3>${this.readItem.manager_hand}</h3> 초기화된 비밀번호가 전송됩니다.<br/> 정말로 초기화 하시겠습니까?`"
			@close="confirmReset = false"
			@submit="resetPassword"
		/>
	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'AdminUserManagerRead',
	mixins: [common],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		confirmReset: false,
		confirmResetResult: false,
	}),
	computed: {},
	watch: {},
	created() {},
	mounted() {
		console.log('readItem.corporate_url.length', this.readItem.corporate_url)
	},
	destroyed() {},
	methods: {
		...mapActions(['AUTH_ACT_FIND_INFO']),
		async resetPassword() {
			const params = {
				member_kind: 3,
				name: this.readItem.manager_name,
				login_id: this.readItem.login_id,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
				hand: this.readItem.manager_hand,
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
