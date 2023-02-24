<template>
	<div class="certificate pa-4">
		<v-row
			class="ma-0 pr-2"
			align="start"
		>
			<v-col
				cols="4"
				class="pa-0"
			>
				<v-img
					v-if="items.thumimage_url"
					width="100%"
					max-height="150px"
					:src="items.thumimage_url"
				/>
			</v-col>

			<v-col
				cols="7"
				class="pa-0 ml-4 ml-md-5 ml-xl-5 table"
			>
				<v-row class="ma-0">
					<v-col
						:cols="items.docu_kind === '2' ? 5 : 4"
						class="th pa-0 pb-1"
						align="start"
					>
						품목
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 7 : 8"
						class="td pa-0 pb-1"
						align="start"
					>
						<span v-if="items.subject_name">{{ items.subject_name }}</span>
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 5 : 4"
						class="th pa-0 pb-1"
						align="start"
					>
						<span
							v-if="items.docu_kind === '2'"
							class="th"
						>
							시험성적서명
						</span>
						<span
							v-else
							class="th"
						>
							제품명
						</span>
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 7 : 8"
						class="td pa-0 pb-1"
						align="start"
					>
						<span v-if="items.relatedpd_name">{{ items.relatedpd_name }}</span>
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 5 : 4"
						class="th pa-0 pb-1"
						align="start"
					>
						인증서명
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 7 : 8"
						class="td pa-0 pb-1"
						align="start"
					>
						<span v-if="items.docu_name">{{ items.docu_name }}</span>
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 5 : 4"
						class="th pa-0 pb-1"
						align="start"
					>
						인증기관
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 7 : 8"
						class="td pa-0 pb-1"
						align="start"
					>
						<span v-if="items.authority">{{ items.authority }}</span>
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 5 : 4"
						class="th pa-0"
						align="start"
					>
						<span
							v-if="items.docu_kind === '2'"
							class="th"
						>
							취득일
						</span>
						<span
							v-else
							class="th"
						>
							인증기간
						</span>
					</v-col>
					<v-col
						:cols="items.docu_kind === '2' ? 7 : 8"
						class="td pa-0"
						align="start"
					>
						<span v-if="items.docu_kind === '2'">{{ common_number_filter(items.auth_from, 'date') }}</span>
						<span v-else>
							{{ common_number_filter(items.auth_from, 'date') }}~{{ common_number_filter(items.auth_to, 'date') }}
						</span>
					</v-col>
				</v-row>
				<v-row class="ma-0 mt-3 btn_group">
					<v-col
						cols="6"
						class="pa-0"
					>
						<div class="mr-1">
							<v-btn
								v-if="items.attachfile_url"
								depressed
								@click="openViewer"
							>
								<v-row
									class="ma-0"
									justify="center"
								>
									<v-col
										cols="12"
										class="pa-0"
									>
										<span>보기</span>
									</v-col>
								</v-row>
							</v-btn>
						</div>
					</v-col>
					<v-col
						cols="6"
						class="pa-0"
					>
						<div class="ml-1">
							<v-btn
								v-show="false"
								depressed
								@click="fileDownload"
							>
								<v-row
									class="ma-0"
									justify="center"
								>
									<v-col
										cols="12"
										class="pa-0"
									>
										<span>다운로드</span>
									</v-col>
								</v-row>
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'SiteCertificateItem',
	components: {},
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		...mapActions(['COMMON_ACT_FILE_DOWNLOAD']),
		openViewer() {
			window.open(this.items.attachfile_url, '_blank')
		},
		async fileDownload() {
			await this.COMMON_ACT_FILE_DOWNLOAD({
				url: this.items.attachfile_url,
			})
		},
	},
}
</script>

<style scoped lang="scss">
// 두줄이상 (...)처리
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

.certificate {
	background-color: #f6f6f6 !important;
	min-height: 210px;
	.table {
		font-size: 14px !important;
		letter-spacing: -1px !important;
		.th {
			font-family: 'NotoSansKR-Bold' !important;
		}
		.td {
			@include ellipsis_2;
			font-family: 'NotoSansKR-Regular' !important;
		}
	}
	.btn_group {
		.v-btn {
			width: 100%;
			height: 30px !important;
			border: 1px solid #ccc !important;
			background-color: #fff !important;
			:deep(.v-btn__content) {
				span {
					font-family: 'NotoSansKR-Regular' !important;
					font-size: 13px !important;
				}
			}
		}
		.v-btn:hover {
			background-color: #44883d !important;
			color: #fff !important;
		}
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
}
@media all and (max-width: 600px) {
	.certificate {
		.table {
			font-size: 11px !important;
		}
	}
}
</style>
