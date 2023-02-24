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
								v-model="models.docu_kind"
								title="*구분"
								:select="admin_certification_divisionItems"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.exposure_yn"
								title="*상태"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.partModel"
								title="*품목"
								:select="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.relatedpdModel"
								title="*제품명"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.docu_name"
								title="*제목"
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
								v-model="models.authority"
								title="*인증기관"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="*발행일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.thumbnail === null"
								v-model="thumbnail"
								title="*썸네일"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="*썸네일"
								:text-button="thumbnailDeleteButton"
								:fill="true"
								@click="
									models.thumbnail = null
									thumbnail = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.attachfile === null"
								v-model="attachfile"
								title="*파일첨부"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="*파일첨부"
								:text-button="imageDeleteButton"
								:fill="true"
								@click="
									models.attachfile = null
									attachfile = null
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

export default {
	name: 'AdminReferenceCertificationCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			docu_kind: null,
			exposure_yn: 'N',
			partModel: null,
			relatedpdModel: null,
			docu_name: null,
			authority: null,
			showDate: null,
			thumbnail: null,
			attachfile: null,
		},
		showDate: null,
		thumbnail: null,
		attachfile: null,
		thumbnailDeleteButton: null,
		imageDeleteButton: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS']),
		allowValue() {
			const checkValue = ['docu_kind', 'exposure_yn', 'partModel']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['relatedpdModel', 'docu_name', 'authority']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			const checkImage = ['thumbnail', 'attachfile', 'showDate']
			for (let i of checkImage) {
				if (this[i] === null) return true
			}

			return false
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		showDate(val) {
			console.log('showDate', val)
			this.models.showDate = val
		},
		partModel(val) {
			this.models.part = val
			if (this.models.part !== val) this.typeModel = null
		},
		typeModel(val) {
			this.models.type = val
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') {
			this.models.partModel = this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.find(
				item => item.subject_code === this.editItem.subject_code,
			)
			this.models.relatedpdModel = this.editItem.relatedpd_name

			this.models.docu_kind = this.editItem.docu_kind
			this.models.exposure_yn = this.editItem.exposure_yn
			this.models.docu_name = this.editItem.docu_name
			this.models.authority = this.editItem.authority
			this.models.showDate = this.editItem.showDate

			this.models.thumbnail = this.editItem.thumimage_url
			this.models.attachfile = this.editItem.attachfile_url

			if (this.editItem.thumimage_url) {
				this.thumbnail = this.editItem.thumimage_url
				this.thumbnailDeleteButton = {
					text: this.editItem.thumimage_url,
					button: {
						text: '썸네일 삭제',
						color: 'primary',
					},
				}
			} else {
				this.thumbnail = null
				this.models.thumbnail = null
			}

			if (this.editItem.attachfile_url) {
				this.attachfile = this.editItem.attachfile_url
				this.imageDeleteButton = {
					text: this.editItem.attachfile_url,
					button: {
						text: '파일 삭제',
						color: 'primary',
					},
				}
			} else {
				this.attachfile = null
				this.models.attachfile = null
			}

			this.showDate = this.editItem.showDate

			this.origin = JSON.parse(JSON.stringify(this.models))
		}

		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_REFERENCE_CERTIFICATION']),
		resetData() {
			this.models = {
				docu_kind: null,
				exposure_yn: true,
				partModel: null,
				relatedpdModel: null,
				docu_name: null,
				authority: null,
				showDate: null,
				thumbnail: null,
				attachfile: null,
			}
			this.thumbnail = null
			this.attachfile = null
		},
		async onApiCallItem() {
			this.loading = true

			const startDate = this.common_dateFilter(this.showDate[0])
			const endDate = this.showDate[1] === undefined ? startDate : this.common_dateFilter(this.showDate[1])

			const params = {
				docu_kind: this.models.docu_kind?.value, // 문서 구분
				subject_code: this.models.partModel.subject_code, // 품목 이름
				relatedpd_name: this.models.relatedpdModel, // 제품명

				docu_name: this.models.docu_name, // 이름
				authority: this.models.authority, // 인증기관

				auth_from_s: startDate, // 시작일
				auth_to_e: endDate, // 종료일

				exposure_yn: this.models.exposure_yn, // 게시글url사용여부

				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // user id
			}

			if (this.mode === 'create') {
				// 등록
				// 이미지가 있는 경우 image param을 추가 없는 경우 param명을 넣지 않음
				if (this.thumbnail != null) params.thumimage = this.thumbnail
				if (this.attachfile != null) params.attachfile = this.attachfile
			} else {
				params.docu_id = this.editItem.docu_id
				// 수정
				// attachfile 수정 > 필수값이므로 수정만 제공
				if (this.attachfile != null && this.attachfile !== this.editItem.attachfile_url) {
					params.attachfile = this.attachfile
					params.attachfile_url = this.editItem.attachfile_url
				}

				// thumbnail
				// thumbnail 삭제 > thumimage_url만 보내기
				if (this.thumbnail === null && this.models.thumbnail === null) {
					params.thumimage_url = this.editItem.thumimage_url
				}
				// thumbnail 수정
				// 기존 thumimage_url과 등록할 thumimage 함께 보내기
				if (this.thumbnail != null && this.thumbnail !== this.editItem.thumimage_url) {
					params.thumimage = this.thumbnail
					params.thumimage_url = this.editItem.thumimage_url
				}
			}

			console.log('params', params)
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_REFERENCE_CERTIFICATION(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_REFERENCE_CERTIFICATION', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
