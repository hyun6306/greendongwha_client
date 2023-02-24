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
								v-model="models.showroom_yn"
								title="*사용여부"
								radio
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*주소"
								:text-button="{
									text: models.zipcode ? `${models.zipcode} ) ${models.address1}` : '',
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
								title="상세주소"
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.showroom_tel"
								title="*전화번호"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.security_tel"
								title="*안심번호"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.homepage_url"
								title="홈페이지 주소"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.showroom_sns_insta"
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
								v-model="models.showroom_sns_naver"
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
								v-model="models.showroom_sns_facebook"
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
								v-model="models.showroom_sns_youtube"
								title="유튜브"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.showroom_service"
								title="서비스"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.business_hours"
								title="영업시간"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.buildtype"
								title="취급품목"
								:toggle-button="addDisplayItems"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.showroom_name"
								title="*쇼룸명"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="rep_image_url"
								title="*대표이미지 (3개)"
								file-multi
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showroom_image_url"
								title="쇼룸이미지 (5개)"
								file-multi
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.showroom_add_image_url"
								title="쇼룸 이미지( 외부채널 )"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="build_image_url"
								title="시공이미지 (5개)"
								file-multi
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.build_add_image_url"
								title="시공 이미지( 외부채널 )"
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
								v-if="editItem"
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
								v-if="editItem"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'
import kakao_post from '@/mixins/kakao_post'
import kakao_map from '@/mixins/kakao_map'

export default {
	name: 'AdminDisplayShowRoomCreate',
	mixins: [common, admin, kakao_post, kakao_map],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			showroom_yn: 'N',

			zipcode: null,
			address1: null,
			address2: null,
			latitude: null,
			longitude: null,

			showroom_tel: null,
			security_tel: null,

			homepage_url: null,
			showroom_sns_insta: null,
			showroom_sns_facebook: null,
			showroom_sns_naver: null,
			showroom_sns_youtube: null,
			showroom_service: null,
			business_hours: null,
			buildtype: [],
			showroom_name: null,

			showroom_add_image_url: null,
			build_add_image_url: null,
		},
		rep_image_url: [],
		showroom_image_url: [],
		build_image_url: [],

		addDisplayItems: [],

		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS', 'ADMIN_GET_PRODUCT_TAG_ITEMS']),
		allowValue() {
			const checkValue = ['use_yn']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['zipcode', 'showroom_name', 'showroom_tel', 'security_tel']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			// const checkImage = ['rep_image_url', 'showroom_image_url', 'build_image_url']
			//
			// for (let i of checkImage) {
			// 	if (!this[i].length) return true
			// }

			return !this.rep_image_url.length
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		rep_image_url(val) {
			console.log('rep_image_url', val)
			const count = 3
			if (this.rep_image_url.length > count) this.errorImageNotice('rep_image_url', val, count)
		},
		showroom_image_url(val) {
			console.log('showroom_image_url', val)
			const count = 5
			if (this.showroom_image_url.length > count) this.errorImageNotice('showroom_image_url', val, count)
		},
		build_image_url(val) {
			console.log('build_image_url', val)
			const count = 5
			if (this.build_image_url.length > count) this.errorImageNotice('build_image_url', val, count)
		},
		// 'models.rep_image_url': val => {
		// 	if (this.mode === 'edit') this.rep_image_url = val
		// },
		// 'models.showroom_image_url': val => {
		// 	if (this.mode === 'edit') this.showroom_image_url = val
		// },
		// 'models.build_image_url': val => {
		// 	if (this.mode === 'edit') this.build_image_url = val
		// },
	},
	async created() {
		await this.getPublicCode()
	},
	async mounted() {
		this.kakao_map_start()
	},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions([
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 동화 쇼룸 API
			'ADMIN_ACT_DISPLAY_SHOW_ROOM',
		]),
		errorImageNotice(name, item, count) {
			this[name] = item.slice(undefined, count)
			return this.$toastr.error(`파일은 최대 ${count}개까지만 허용 가능합니다.`, '파일첨부 오류', { timeOut: 2500 })
		},
		async getPublicCode() {
			this.loading = true

			// 추가문의 항목
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '302' }).then(res => {
				// 기타 마지막으로 보내기
				let etc = res.findIndex(x => x.code_name === '기타')
				res.push(res[etc])
				res.splice(etc, 1)
				this.addDisplayItems = res.map(x => {
					x.title = x.code_name // title 추가
					return x
				})
			})

			if (this.editItem && this.mode === 'edit') this.startDataMapping()

			this.loading = false

			console.log('editItem', this.editItem, this.models, this.origin)
		},
		startDataMapping() {
			this.models = {
				showroom_yn: this.editItem.showroom_yn || '',

				zipcode: this.editItem.showroom_zipcode || '',
				address1: this.editItem.showroom_addr1 || '',
				address2: this.editItem.showroom_addr2 || '',
				latitude: this.editItem.latitude || '',
				longitude: this.editItem.longitude || '',

				showroom_tel: this.editItem.showroom_tel || '',
				security_tel: this.editItem.security_tel || '',

				homepage_url: this.editItem.homepage_url || '',
				showroom_sns_insta: this.editItem.showroom_sns_insta || '',
				showroom_sns_facebook: this.editItem.showroom_sns_facebook || '',
				showroom_sns_naver: this.editItem.showroom_sns_naver || '',
				showroom_sns_youtube: this.editItem.showroom_sns_youtube || '',
				showroom_service: this.editItem.showroom_service || '',
				business_hours: this.editItem.business_hours || '',
				buildtype: [],
				showroom_name: this.editItem.showroom_name || '',

				showroom_add_image_url: this.editItem.showroom_add_image_url || '',
				build_add_image_url: this.editItem.build_add_image_url || '',
			}
			// 취급품목
			if (this.editItem.buildtype) {
				for (let i of this.editItem.buildtype) {
					const findCheck = this.addDisplayItems.findIndex(x => x.code === i.code)
					if (findCheck > -1) this.models.buildtype.push(Number(findCheck))
					// console.log('buildtype', this.models.buildtype)
				}
			}

			const itemsKeys = Object.keys(this.editItem)
			const imageItemsArray = ['rep_image_url', 'showroom_image_url', 'build_image_url']
			for (let i of imageItemsArray) {
				const imageItems = itemsKeys.filter(x => x.includes(i))
				// 해당 이미지 push
				if (imageItems.length) {
					for (let n of imageItems) {
						if (this.editItem[n].length) {
							this[i].push(this.editItem[n])
						}
					}
				}
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
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
		resetData() {
			this.models = {
				showroom_yn: 'N',

				zipcode: null,
				address1: null,
				address2: null,
				latitude: null,
				longitude: null,

				showroom_tel: null,
				security_tel: null,

				homepage_url: null,
				showroom_sns_insta: null,
				showroom_sns_facebook: null,
				showroom_sns_naver: null,
				showroom_sns_youtube: null,
				showroom_service: null,
				business_hours: null,
				buildtype: [],
				showroom_name: null,

				showroom_add_image_url: null,
				build_add_image_url: null,
			}
			this.origin = {}
			this.onEditDialog = false
			this.loading = false
			this.image_url = null
		},
		contentSave(content) {
			this.models.description = content
			console.log('contentSave', content)
		},
		async onApiCallItem() {
			this.loading = true

			// 취급품목 데이터 추출
			const buildValue = this.models.buildtype.map(x => {
				return this.addDisplayItems[x].code
			})

			const params = {
				showroom_yn: this.models.showroom_yn, // 상태

				showroom_zipcode: this.models.zipcode || '', // 우편번호
				showroom_addr1: this.models.address1 || '', // 주소
				showroom_addr2: this.models.address2 || '', // 상세주소
				latitude: this.models.latitude || '', // 위도
				longitude: this.models.longitude || '', // 경도

				showroom_tel: this.models.showroom_tel || '', // 전화번호
				security_tel: this.models.security_tel || '', // 안심번호

				homepage_url: this.models.homepage_url || '', // 홈페이지 url
				showroom_sns_insta: this.models.showroom_sns_insta || '', // 인스타
				showroom_sns_facebook: this.models.showroom_sns_facebook || '', // 페이스북
				showroom_sns_naver: this.models.showroom_sns_naver || '', // 네이버
				showroom_sns_youtube: this.models.showroom_sns_youtube || '', // 유투브
				showroom_service: this.models.showroom_service || '', // 서비스
				business_hours: this.models.business_hours || '', // 영업시간
				buildtype: buildValue.join(',') || '', // 취급품목
				showroom_name: this.models.showroom_name || '', // 쇼룸 이름

				showroom_add_image_url: this.models.showroom_add_image_url || '', // 쇼룸 외부
				build_add_image_url: this.models.build_add_image_url || '', // 시공 외부

				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // 등록자ID
			}

			// 수정일 경우 showroom_id 추가
			if (this.mode === 'edit') {
				params.showroom_id = this.editItem.showroom_id
			}

			// 이미지
			const copyData = JSON.parse(JSON.stringify(this.editItem))
			const imageItemsArray = ['rep_image_url', 'showroom_image_url', 'build_image_url']
			for (let i of imageItemsArray) {
				if (this.mode === 'create') {
					// 신규 등록
					const originName = i.split('_')
					originName.splice(-1, 1)
					const imageName = originName.join('_')
					this[i].forEach((element, i) => {
						// console.log('imageName', `${imageName}${i}`)
						params[`${imageName}${i + 1}`] = element
					})
				} else {
					// 이미지 수정
					console.log(`이미지 수정`, this[i])
					const itemsKeys = Object.keys(copyData)
					const imageItems = itemsKeys.filter(x => x.includes(i))

					if (imageItems.length) {
						console.log('imageItems', imageItems)
						// 1. 기존 이미지에서 삭제될 이미지 확인 > 이미지 추출
						for (let n of imageItems) {
							console.log('imageItems n', copyData[n], this[i])
							this[i].forEach(element => {
								// 기존 이미지와 같은 경우 리스트에서 삭제
								if (copyData[n] === element) delete copyData[n]
							})
						}
						// 2. 삭제할 이미지 params추가 > 데이터는 빈 배열 삽입
						const deleteName = Object.keys(copyData).filter(x => x.includes(i))
						if (deleteName.length) {
							deleteName.forEach(element => {
								if (copyData[element]) {
									params[element] = copyData[element] // params 추가
									copyData[element] = '' // 초기화
								}
							})
						}
						// 3. 추가할 이미지 확인 > 빈 배열 확인 후 삽입
						const addImages = this[i].filter(x => typeof x !== 'string')
						console.log('ADD이미지', addImages)
						if (addImages.length) {
							const addList = Object.keys(copyData).filter(x => x.includes(i))
							console.log('ADD이미지-list', addList)
							for (let i of addImages) {
								// 빈 값 찾기
								const addFilterList = []
								for (let n of addList) if (!copyData[n].length) addFilterList.push(n)

								// 추가될 이름 생성
								const addName = addFilterList[0]
								const number = addFilterList[0].slice(-1)
								const originName = addName.split('_')
								originName.splice(-1, 1)
								const imageName = originName.join('_')

								// 빈 값에 추가 후 'image add' 추가
								params[`${imageName}${number}`] = i
								copyData[addFilterList[0]] = 'image add'
							}
						}
					}
				}
			}

			console.log('params', params)
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_DISPLAY_SHOW_ROOM(items)
				this.loading = false
				this.APP_MU_DIALOG({
					dialog: true,
					title: '동화 쇼룸',
					text: '설정하신 내용이 저장되었습니다.',
				})
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_DISPLAY_SHOW_ROOM', e)
				this.$toastr.error('내용을 저장하는데 실패하였습니다.', '동화 쇼룸 오류', { timeOut: 2500 })
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
