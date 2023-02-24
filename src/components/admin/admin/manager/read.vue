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
							class="pa-0"
						>
							<AdminItemsTableItem
								title="ID"
								:text="readItem.login_id"
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
								:text="readItem.name"
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="전화번호"
								:text="readItem.tel"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="휴대전화"
								:text="readItem.hand"
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
						<v-col
							cols="12"
							class="pa-0"
						>
							<v-card
								width="100%"
								color="#E3EAE6"
								elevation="0"
								tile
							>
								<v-col
									align="center"
									class="table_title"
								>
									*화면 권한 설정
								</v-col>
							</v-card>
							<v-row class="ma-0">
								<v-col
									v-for="(item, i) in admin_menu_items"
									:key="i"
									cols="12"
									md="4"
								>
									<CommonListsList03
										v-model="menuSelected[i]"
										:items="item"
										readonly
									/>
								</v-col>
							</v-row>
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
import { mapActions, mapGetters } from 'vuex'
import admin from '@/mixins/admin'

export default {
	name: 'AdminAdminManagerRead',
	mixins: [admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		confirmReset: false,
		confirmResetResult: false,
		menuSelected: [],
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
	},
	watch: {},
	created() {
		// menu list만큼 빈 []추가
		for (let i = 0; this.admin_menu_items.length > i; i++) {
			this.menuSelected.push([])
		}
		console.log('this.readItem', this.readItem)
	},
	mounted() {
		// menulist parsing
		if (this.readItem.menuauth.length) {
			this.readItem.menuauth.forEach(element => {
				// 기존 admin menu에서 menu위치 확인
				this.admin_menu_items.forEach((menuItem, i) => {
					menuItem.subMenu.forEach((menu, j) => {
						if (element === menu.allow) {
							this.menuSelected[i].push(j)
						}
					})
				})
			})
		}
	},
	destroyed() {},
	methods: {
		...mapActions(['AUTH_ACT_FIND_INFO']),
		async resetPassword() {
			const params = {
				member_kind: 2,
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

<style scoped lang="scss">
.table {
	border-top: 1px solid #ccc;

	&_title {
		background: #e3eae6;
		line-height: 2.2rem;
		font-size: 0.95rem;
		font-family: 'NotoSansKR-Bold';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
	&_text {
		line-height: 1.5rem;
		font-size: 1rem;
		font-family: 'NotoSansKR-Regular';
		&_link {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
