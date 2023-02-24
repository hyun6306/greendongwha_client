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
					v-if="items.catalogue_thumb_url"
					width="100%"
					max-height="150px"
					:src="items.catalogue_thumb_url"
				/>
			</v-col>

			<v-col
				cols="7"
				class="pa-0 ml-4 ml-md-6 ml-xl-7 table"
			>
				<div class="info_area">
					<v-row class="ma-0">
						<v-col
							cols="4"
							class="th pa-0 pb-1"
							align="start"
						>
							품목
						</v-col>
						<v-col
							cols="8"
							class="td pa-0 pb-1"
							align="start"
						>
							<span v-if="items.subject_name">{{ items.subject_name }}</span>
						</v-col>
						<v-col
							cols="4"
							class="th pa-0 pb-1"
							align="start"
						>
							종류
						</v-col>
						<v-col
							cols="8"
							class="td pa-0 pb-1"
							align="start"
						>
							<span v-if="items.catalogue_mapping.length">{{ items.catalogue_mapping[0].kind_name }}</span>
						</v-col>
						<v-col
							cols="4"
							class="th pa-0 pb-1"
							align="start"
						>
							자료명
						</v-col>
						<v-col
							cols="8"
							class="td pa-0 pb-1"
							align="start"
						>
							<span v-if="items.catalogue_name">{{ items.catalogue_name }}</span>
						</v-col>
					</v-row>
				</div>

				<v-row class="ma-0 mt-3 btn_group">
					<v-col
						cols="6"
						class="pa-0"
					>
						<div class="mr-1">
							<v-btn
								v-if="items.catalogue_url"
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
export default {
	name: 'SiteCatalogItem',
	props: ['items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		openViewer() {
			window.open(this.items.catalogue_url, '_blank')
		},
		fileDownload() {
			// let link = document.createElement('a');
			// link.href = this.items.catalogue_url;
			// link.download = this.items.docu_name;
			// link.target = '_blank';
			// console.log('link', link)
			//
			// document.body.appendChild(link);
			// link.click();
			// document.body.removeChild(link);
			var element = document.createElement('a')
			element.setAttribute('href', this.items.catalogue_url)

			element.style.display = 'none'
			document.body.appendChild(element)

			element.click()

			document.body.removeChild(element)
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
	word-break: keep-all;
}

.certificate {
	background-color: #f6f6f6 !important;
	min-height: 200px;
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
