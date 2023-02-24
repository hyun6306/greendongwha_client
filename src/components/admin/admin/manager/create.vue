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
								v-model="models.login_id"
								title="*ID"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							v-if="mode === 'create'"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.password"
								title="*비밀번호"
								input
								input-type="password"
							/>
						</v-col>
						<v-col
							v-if="mode === 'create'"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="passwordConfirm"
								title="*비밀번호 확인"
								input
								input-type="password"
								:input-check="passwordCheck"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.name"
								title="*이름"
								input
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.tel"
								title="전화번호"
								input
								input-type="number"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.hand"
								title="휴대전화"
								input
								input-type="number"
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
									/>
								</v-col>
							</v-row>
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
									:disabled="editValue"
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
import { mapActions, mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminAdminManagerCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			login_id: null,
			password: null,
			name: null,
			emailaddr: null,
			tel: null,
			hand: null,
			menuauth: null,
		},
		passwordConfirm: null,
		origin: {},
		loading: false,
		menuSelected: [],
		resultMenuSelected: [],
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		passwordCheck() {
			return this.models.password?.length ? this.models.password === this.passwordConfirm : false
		},
		allowValue() {
			if (!this.passwordCheck) return true

			const checkText = ['login_id', 'password', 'name']
			return this.common_allowTextCheck(this.models, checkText)
		},
		editValue() {
			const checkText = ['login_id', 'name']
			return this.common_allowTextCheck(this.models, checkText)
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		menuSelected(val) {
			if (val.length) {
				let items = []
				// 중첩코드 제거
				const set = new Set(val)
				const setArr = [...set]

				setArr.forEach((element, i) => {
					if (element.length) {
						// console.log(this.admin_menu_items[i].subMenu[element])
						element.forEach(element => {
							items.push(this.admin_menu_items[i].subMenu[element].allow)
						})
					}
				})

				// 중첩코드 제거
				const setItems = new Set(items)
				const setItemsArr = [...setItems]
				this.resultMenuSelected = setItemsArr
				// console.log('this.resultMenuSelected',this.resultMenuSelected)
			}
		},
	},
	created() {
		// menu list만큼 빈 []추가
		for (let i = 0; this.admin_menu_items.length > i; i++) {
			this.menuSelected.push([])
		}
	},
	mounted() {
		if (this.editItem && this.mode === 'edit') {
			this.models = {
				login_id: this.editItem.login_id || null,
				name: this.editItem.name || null,
				emailaddr: this.editItem.emailaddr || null,
				tel: this.editItem.tel || null,
				hand: this.editItem.hand || null,
				menuauth: this.editItem.menuauth || null,
			}

			// menulist parsing
			if (this.editItem.menuauth.length) {
				this.editItem.menuauth.forEach(element => {
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

			this.origin = JSON.parse(JSON.stringify(this.models))
		}
	},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_ADMIN_USER']),
		resetData() {
			this.models = {
				login_id: null,
				password: null,
				name: null,
				emailaddr: null,
				tel: null,
				hand: null,
			}
			this.passwordConfirm = null
			this.origin = {}
			this.loading = false
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				login_id: this.models.login_id || null,
				name: this.models.name || null,
				emailaddr: this.models.emailaddr || null,
				tel: this.models.tel || null,
				hand: this.models.hand || null,
				menuauth: this.resultMenuSelected.join(',') || null,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id || null,
			}

			if (this.mode === 'create') params.password = this.models.password
			console.log('parmas', params)

			try {
				const items = { method: this.mode, params: params }
				await this.ADMIN_ACT_ADMIN_USER(items).then(() => {
					this.loading = false
					if (this.AUTH_GET_ADMIN_USER.login_id === this.models.login_id) this.$router.go(0)
					this.$emit('close')
				})
			} catch (e) {
				console.log('ADMIN_ACT_ADMIN_USER', e)
				this.loading = false
			}
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
