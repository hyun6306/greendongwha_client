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
					<h3 class="py-3 pl-2">< 담당자 정보 ></h3>
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.app_state"
								title="*상태"
								:select="admin_user_interior_statusItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상태요청일"
								:text="editItem.app_date"
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
								title="로그인 횟수"
								:text="editItem.hits"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.emailaddr"
								title="이메일(추가)"
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
								v-model="models.manager_name"
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
								v-model="models.manager_hand"
								title="*휴대전화"
								input
								:input-type="'number'"
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

					<h3 class="py-3 pl-2">< 인테리어점 정보 ></h3>
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.business_name"
								title="*업체명"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.boss_name"
								title="*대표자명"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.company_estdate_year"
								title="*설립 연도"
								:select="common_yearItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.company_estdate_month"
								title="*설립 월"
								:select="common_monthItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.company_tel"
								title="*회사전화번호"
								input
								:input-type="'number'"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.security_tel"
								title="안심번호"
								input
								:input-type="'number'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*사업자등록번호"
								:text-button="{
									text: editItem.corporate_no ? common_number_filter(editItem.corporate_no, 'business') : '',
									button: {
										text: '사업자등록증 확인',
										color: 'primary',
										link: editItem.corporate_url,
									},
								}"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*시공주소"
								:text-button="{
									text: `${models.zipcode} ) ${models.address1}`,
									button: {
										text: '주소 찾기',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="postApi"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.address2"
								title="*상세주소"
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
								title="*위도"
								:text="models.latitude"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*경도"
								:text="models.longitude"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.homepage_url"
								title="홈페이지"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.company_snscode1"
								title="인스타그램"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.company_snscode2"
								title="네이버 블로그"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.company_snscode3"
								title="페이스북"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.company_snscode4"
								title="유튜브"
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
								v-model="models.buildtype"
								title="시공분야"
								:input-select-items="buildCodeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.recommand_yn"
								title="추천"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.company_picurl === null"
								v-model="company_picurl"
								title="인테리어점 이미지"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="인테리어점 이미지"
								:text-button="{
									text: company_picurl,
									button: {
										text: '이미지 삭제',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="
									models.company_picurl = null
									company_picurl = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.company_logourl === null"
								v-model="company_logourl"
								title="회사 로고"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="회사 로고"
								:text-button="{
									text: company_logourl,
									button: {
										text: '회사 로고 삭제',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="
									models.company_logourl = null
									company_logourl = null
								"
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
import { mapActions, mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'
import kakao_post from '@/mixins/kakao_post'
import kakao_map from '@/mixins/kakao_map'

export default {
	name: 'AdminUserManagerCreate',
	mixins: [model, common, admin, kakao_post, kakao_map],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			app_state: null,
			emailaddr: null,
			manager_name: null,
			manager_hand: null,
			email_yn: null,
			sms_yn: null,
			business_name: null,
			boss_name: null,
			company_estdate_year: null,
			company_estdate_month: null,
			company_tel: null,
			security_tel: null,
			zipcode: null,
			address1: null,
			address2: null,
			latitude: null,
			longitude: null,
			homepage_url: null,
			company_snscode1: null,
			company_snscode2: null,
			company_snscode3: null,
			company_snscode4: null,
			buildtype: null,
			recommand_yn: 'N',
			company_picurl: null,
			company_logourl: null,
		},
		origin: {},
		loading: false,
		company_picurl: null,
		company_logourl: null,
		buildCodeItems: [],
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['app_state', 'email_yn', 'sms_yn', 'company_estdate_year', 'company_estdate_month']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['manager_name', 'manager_hand', 'business_name', 'boss_name', 'company_tel', 'zipcode']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			return check
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	async created() {
		await this.getApiInteriorItems()
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem, this.models)
	},
	async mounted() {
		this.kakao_map_start()
	},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_USER_INTERIOR', 'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS']),
		async getApiInteriorItems() {
			const params = { group_code: '301' }
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS(params).then(res => {
				this.buildCodeItems = res
			})
		},
		async postApi() {
			await this.kakao_post_api_call(res => {
				this.models.address1 = res.address
				this.models.zipcode = res.post
				this.getLanLng(res)
			})
		},
		async getLanLng(res) {
			this.kakao_map_search_address_model = res.address.split('(')[0]
			await this.kakao_map_search_places_lanlng('search', res => {
				// console.log('getLanLng', res)
				this.models.latitude = res[0].y
				this.models.longitude = res[0].x
			})
		},
		startDataMapping() {
			// 설립연월
			const estdateFilter = val => {
				if (val.length === 1) val = `0${val}` // 한자리 month 예외처리
				return { text: val, value: val }
			}
			// 시공타입
			const buildTypeFilter = val => {
				let items = []
				val.forEach(element => items.push(this.buildCodeItems.find(x => x.code === element.code)))
				return items
			}
			this.models = {
				app_state: this.admin_user_interior_statusItems.find(item => item.value === this.editItem.app_state),
				emailaddr: this.editItem.emailaddr,
				manager_name: this.editItem.manager_name,
				manager_hand: this.editItem.manager_hand,
				email_yn: this.editItem.email_yn,
				sms_yn: this.editItem.sms_yn,
				business_name: this.editItem.business_name,
				boss_name: this.editItem.boss_name,
				company_estdate_year: estdateFilter(this.editItem.company_estdate.substring(0, 4)),
				company_estdate_month: estdateFilter(this.editItem.company_estdate.substring(4, 6)),
				company_tel: this.editItem.company_tel,
				security_tel: this.editItem.security_tel,
				zipcode: this.editItem.company_zipcode,
				address1: this.editItem.company_addr1,
				address2: this.editItem.company_addr2,
				latitude: this.editItem.latitude,
				longitude: this.editItem.longitude,
				homepage_url: this.editItem.homepage_url,
				company_snscode1: this.editItem.company_snscode1,
				company_snscode2: this.editItem.company_snscode2,
				company_snscode3: this.editItem.company_snscode3,
				company_snscode4: this.editItem.company_snscode4,
				buildtype: buildTypeFilter(this.editItem.buildtype),
				recommand_yn: this.editItem.recommand_yn,
				company_picurl: this.editItem.company_picurl,
				company_logourl: this.editItem.company_logourl,
			}

			if (this.editItem.company_picurl) {
				this.company_picurl = this.editItem.company_picurl
			} else {
				this.company_picurl = null
				this.models.company_picurl = null
			}

			if (this.editItem.company_logourl) {
				this.company_logourl = this.editItem.company_logourl
			} else {
				this.company_logourl = null
				this.models.company_logourl = null
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				app_state: null,
				emailaddr: null,
				manager_name: null,
				manager_hand: null,
				email_yn: null,
				sms_yn: null,
				business_name: null,
				boss_name: null,
				company_estdate_year: null,
				company_estdate_month: null,
				company_tel: null,
				security_tel: null,
				zipcode: null,
				address1: null,
				address2: null,
				latitude: null,
				longitude: null,
				homepage_url: null,
				company_snscode1: null,
				company_snscode2: null,
				company_snscode3: null,
				company_snscode4: null,
				buildtype: null,
				recommand_yn: 'N',
				company_picurl: null,
				company_logourl: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				app_state: this.models.app_state.value, // 상태

				manager_name: this.models.manager_name, // 담당자명
				manager_hand: this.models.manager_hand, // 담당자 전화
				business_name: this.models.business_name, // 업체이름
				boss_name: this.models.boss_name, // 대표이름
				company_tel: this.models.company_tel, // 회사 전화
				security_tel: this.models.security_tel, // 안심번호
				emailaddr: this.models.emailaddr, // 이메일 추가

				company_zipcode: this.models.zipcode, // 우편번호
				company_addr1: this.models.address1, // 주소
				company_addr2: this.models.address2, // 상세주소
				latitude: this.models.latitude, // 경도
				longitude: this.models.longitude, // 위도

				// 설립연도
				company_estdate: `${this.models.company_estdate_year.value}${this.models.company_estdate_month.value}`,

				homepage_url: this.models.homepage_url, // 홈페이지
				company_snscode1: this.models.company_snscode1, // 인스타
				company_snscode2: this.models.company_snscode2, // 네이버블로그
				company_snscode3: this.models.company_snscode3, // 페이스북
				company_snscode4: this.models.company_snscode4, // 유튜브

				buildtype: this.models.buildtype.map(x => x.code).join(','), // 시공분야

				recommand_yn: this.models.recommand_yn, // 추천인테리어점

				corporate_no: this.editItem.corporate_no, // 사업자번호
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // 등록자ID
			}

			// company_pic
			// company_pic 삭제 > company_picurl만 보내기
			if (this.company_picurl === null && this.models.company_picurl === null) {
				params.company_picurl = this.editItem.company_picurl
			}
			// company_pic 수정
			// 기존 company_picurl과 등록할 company_pic 함께 보내기
			if (this.company_picurl != null && this.company_picurl !== this.editItem.company_picurl) {
				params.company_pic = this.company_picurl
				params.company_picurl = this.editItem.company_picurl
			}

			// company_logo
			// company_logo 삭제 > company_logourl만 보내기
			if (this.company_logourl === null && this.models.company_logourl === null) {
				params.company_logourl = this.editItem.company_logourl
			}
			// company_logo 수정
			// 기존 company_logourl과 등록할 company_logo 함께 보내기
			if (this.company_logourl != null && this.company_logourl !== this.editItem.company_logourl) {
				params.company_logo = this.company_logourl
				params.company_logourl = this.editItem.company_logourl
			}

			const items = { method: this.mode, params: params }

			console.log('items', items)

			try {
				await this.ADMIN_ACT_USER_INTERIOR(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_USER_INTERIOR', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
