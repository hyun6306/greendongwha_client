<template>
	<div class="inner_wrapper layout_align">
		<v-container
			class="pa-0"
			fluid
		>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<v-col
					cols="12"
					class="pa-0 mt-10"
				>
					<v-col
						cols="12"
						class="pa-0 mt-4 table_type01 notice_table"
					>
						<v-row class="ma-0">
							<v-col
								cols="12"
								md="10"
								class="td"
								align="start"
							>
								<div class="tit"><span class="tag news">뉴스</span>제품인증서를 확인하고 싶습니다.</div>
							</v-col>
							<v-col
								cols="2"
								class="td hidden-sm-and-down"
								align="center"
								>2021-10-28</v-col
							>
						</v-row>

						<v-row class="ma-0">
							<v-col
								class="content_area"
								cols="12"
								align="start"
							>
								컨텐츠내용
							</v-col>
						</v-row>
					</v-col>

					<!-- 앞.뒤 목록리스트 -->
					<div class="board_list mt-5">
						<v-row class="ma-0">
							<v-col
								cols="3"
								sm="2"
								md="1"
								class="pa-0 arrow tac"
								align-self="center"
								>이전</v-col
							>
							<!-- <v-col cols="9" sm="9" md="11" class="pa-0 pr-5 title" align-self="center" @click="pushLink(prevItem)">
                                <span class="clickCursor" v-if="prevItem.title">{{ prevItem.title }}</span>
                                <span v-else>이전 공지사항은 없습니다.</span>
                            </v-col> -->
						</v-row>
						<v-row class="ma-0">
							<v-col
								cols="3"
								sm="2"
								md="1"
								class="pa-0 arrow tac"
								align-self="center"
								>다음</v-col
							>
							<!-- <v-col cols="9" sm="9" md="11" class="pa-0 pr-5 title" align-self="center" @click="pushLink(nextItem)">
                                <span class="clickCursor" v-if="nextItem.title">{{ nextItem.title }}</span>
                                <span v-else>다음 공지사항은 없습니다.</span>
                            </v-col> -->
						</v-row>
					</div>

					<v-col
						cols="12"
						class="mt-5"
						align="center"
					>
						<CommonButtonsButton02
							name="목록"
							class-name="btn_more"
							color="#70b341"
							outlined
							@click="$router.push('/community/event')"
						/>
					</v-col>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'CustomNoticeDetail',
	components: {},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
@mixin ellipsis {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.notice_table {
	.th {
		padding: 14px 0 !important;
		border-top: 2px solid #262626 !important;
		border-bottom: 1px solid #262626 !important;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 16px !important;
		text-align: center !important;
	}
	.td {
		padding: 14px 30px !important;
		font-family: 'NotoSansKR-Regular';
		font-size: 15px !important;
		color: #262626;
		border-top: 2px solid #262626 !important;
		border-bottom: 1px solid #a0a1a5 !important;
	}
	.tit {
		position: relative;
		padding-left: 40px;
	}
	.tag {
		display: inline-block !important;
		position: absolute;
		left: 0;
		height: 20px !important;
		min-width: 34px !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px !important;
		text-align: center;
		color: #fff !important;
		&.news {
			background-color: #42883d !important;
		}
		&.alim {
			background-color: #0f2e73 !important;
		}
	}
	.content_area {
		min-height: 600px;
		padding: 30px;
	}
}

.board_list {
	border-top: 1px solid #262626;
	border-bottom: 1px solid #262626;
	.row {
		padding: 15px 0;
		&:first-child {
			border-bottom: 1px solid #ccc;
		}
		.arrow {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 15px !important;
			color: #262626;
		}
		.title {
			@include ellipsis;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 15px !important;
			color: #5f6062;
		}
	}
}
</style>
