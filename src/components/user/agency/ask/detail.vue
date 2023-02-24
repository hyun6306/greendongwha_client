<template>
	<div class="inner_wrapper px-5 px-md-0">
		<h3 class="detail_tit mb-1">인테리어점 문의내역</h3>

		<!-- 문의내역 -->
		<v-col
			class="pa-0 sub_tit"
			cols="12"
			align="start"
		>
			<h4>문의</h4>
		</v-col>

		<v-col
			cols="12"
			class="pa-0 mb-6 table_type01 question"
		>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>접수일</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					<span v-if="AGENCY_GET_ASK_SELECT.regi_date">{{ AGENCY_GET_ASK_SELECT.regi_date }}</span>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>처리상태</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					<span v-if="AGENCY_GET_ASK_SELECT.progress_state_name">{{ AGENCY_GET_ASK_SELECT.progress_state_name }}</span>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>제목</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					<span v-if="AGENCY_GET_ASK_SELECT.title">{{ AGENCY_GET_ASK_SELECT.title }}</span>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>첨부파일</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					<a
						:href="AGENCY_GET_ASK_SELECT.file_url"
						target="_blank"
						>{{ AGENCY_GET_ASK_SELECT.file_url }}</a
					>
				</v-col>
			</v-row>
			<v-row class="content ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>내용</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					<span v-if="AGENCY_GET_ASK_SELECT.contents">{{ AGENCY_GET_ASK_SELECT.contents }}</span>
				</v-col>
			</v-row>
		</v-col>

		<!-- 문의답변 -->
		<v-col
			class="pa-0 sub_tit"
			cols="12"
			align="start"
		>
			<h4>답변</h4>
		</v-col>

		<!-- 답변내용: 있음 -->
		<v-col
			v-if="AGENCY_GET_ASK_SELECT.conf_contents"
			cols="12"
			class="table_type01 pa-0 mb-10"
		>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>답변내용</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					{{ AGENCY_GET_ASK_SELECT.conf_contents }}
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>상담처리자</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
					>{{ AGENCY_GET_ASK_SELECT.conf_username }}</v-col
				>
			</v-row>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>접수일</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
					>{{ AGENCY_GET_ASK_SELECT.conf_date }}</v-col
				>
			</v-row>
		</v-col>

		<!-- 답변내용: 없음 -->
		<v-col
			v-else
			class="py-8 mb-10 default"
			cols="12"
		>
			<p class="no_content mb-3">등록된 답변이 없습니다.</p>
		</v-col>

		<div class="d-flex justify-center mb-5">
			<CommonButtonsButton02
				name="수정"
				class-name="btn_basic mr-1"
				color="#00582c"
				@click="pushModify"
			/>
			<CommonButtonsButton02
				name="삭제"
				class-name="btn_basic ml-1 mr-1"
				color="#9fa1a4"
				@click="confirmRemove = true"
			/>
			<CommonButtonsButton02
				name="목록"
				class-name="btn_basic ml-1"
				color="#262626"
				outlined
				@click="$router.go(-1)"
			/>
		</div>
		<CommonConfirm
			:dialog="confirmRemove"
			:title="`인테리어점 문의 내용 삭제`"
			:text="`선택하신 인테리어점 문의 내용이 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserAgencyAskDetail',
	data: () => ({
		confirmRemove: false,
	}),
	computed: {
		...mapGetters(['AGENCY_GET_ASK_SELECT']),
	},
	created() {
		if (Object.keys(this.AGENCY_GET_ASK_SELECT).length === 0) this.$router.go(-1)
	},
	mounted() {
		console.log('AGENCY_GET_ASK_SELECT', this.AGENCY_GET_ASK_SELECT)
		if (this.AGENCY_GET_ASK_SELECT.length === 0) this.$router.go(-1)
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['AGENCY_ACT_ASK']),
		pushModify() {
			this.$router.push('/user/create/6?type=modify')
		},
		async removeData() {
			await this.AGENCY_ACT_ASK({
				method: 'del',
				params: [
					{
						service_id: this.AGENCY_GET_ASK_SELECT.service_id,
					},
				],
			}).then(async () => {
				await this.APP_MU_DIALOG({
					dialog: true,
					title: '인테리어점 문의 내용 삭제',
					text: '해당 내용을 삭제하였습니다.',
				})
				this.$router.go(-1)
			})
		},
	},
}
</script>

<style scoped lang="scss">
.detail_tit {
	font-family: 'NotoSansKR-Bold' !important;
	font-size: 20px !important;
	color: #262626;
}
.sub_tit {
	padding: 12px 0 !important;
	border-bottom: 1px solid #262626;
	h4 {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 18px !important;
		color: #262626;
	}
}

.table_type01.question {
	.content {
		min-height: 120px !important;
	}
}

.default {
	border-bottom: 1px solid #ccc;
	.no_content {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 15px !important;
		color: #5f6062;
	}
}

.btn_basic {
	min-width: 140px !important;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.btn_basic {
		min-width: 100px !important;
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.detail_tit {
		font-size: 16px !important;
	}
	.sub_tit {
		font-size: 15px !important;
	}
	.btn_basic {
		min-width: 80px !important;
	}
}
@media all and (max-width: 380px) {
	.detail_tit {
		font-size: 16px !important;
	}
	.sub_tit {
		font-size: 15px !important;
	}
	.btn_basic {
		min-width: 80px !important;
	}
}
</style>
