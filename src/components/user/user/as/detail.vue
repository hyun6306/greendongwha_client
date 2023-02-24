<template>
	<div class="inner_wrapper px-5 px-md-0">
		<!-- A/S 신청 내역 -->
		<v-col
			class="pa-0 sub_tit"
			cols="12"
			align="start"
		>
			<h4>A/S 신청 내역</h4>
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
					>제품군</v-col
				>
				<v-col
					v-if="USER_GET_AS_SELECT.kind_name"
					cols="9"
					sm="10"
					class="td"
					align="start"
					>{{ USER_GET_AS_SELECT.kind_name }}</v-col
				>
			</v-row>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>제목/내용</v-col
				>
				<v-col
					cols="9"
					sm="10"
					class="td"
					align="start"
				>
					<strong v-if="USER_GET_AS_SELECT.title">{{ USER_GET_AS_SELECT.title }}</strong>
					<p
						v-if="USER_GET_AS_SELECT.contents"
						class="mt-3"
					>
						{{ USER_GET_AS_SELECT.contents }}
					</p>
					<p
						v-if="USER_GET_AS_SELECT.file_url"
						class="file mt-3"
					>
						첨부파일 :
						<a
							:href="USER_GET_AS_SELECT.file_url"
							target="_blank"
							>{{ USER_GET_AS_SELECT.file_url }}</a
						>
					</p>
				</v-col>
			</v-row>
			<v-row class="ma-0">
				<v-col
					cols="3"
					sm="2"
					class="th bc_gr"
					>상태</v-col
				>
				<v-col
					v-if="USER_GET_AS_SELECT.progress_state_name"
					cols="9"
					sm="10"
					class="td"
					align="start"
					>{{ USER_GET_AS_SELECT.progress_state_name }}</v-col
				>
			</v-row>
		</v-col>

		<!-- 등록 정보 -->
		<v-col
			class="pa-0 mt-9 sub_tit"
			cols="12"
			align="start"
		>
			<h4>등록정보</h4>
		</v-col>
		<UserItemRegisterInfo :info="USER_GET_AS_SELECT" />

		<div class="my-7 d-flex justify-center">
			<CommonButtonsButton02
				name="수정"
				class-name="btn_basic edge_4 mr-1"
				color="#00582c"
				@click="pushModify"
			/>
			<CommonButtonsButton02
				name="삭제"
				class-name="btn_basic edge_4 mr-1 ml-1"
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
			:title="`A/S 신청 내용 삭제`"
			:text="`선택하신 A/S 신청 내용이 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	name: 'UserAsDetail',
	data: () => ({
		confirmRemove: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER', 'USER_GET_AS_SELECT']),
	},
	created() {
		if (Object.keys(this.USER_GET_AS_SELECT).length === 0) this.$router.go(-1)
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['USER_ACT_AS']),
		download(url, name) {
			let link = document.createElement('a')
			link.href = url
			link.download = name
			// link.target = '_blank';
			console.log('link', link)

			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		},
		pushModify() {
			this.$router.push('/user/create/2?type=modify')
		},
		async removeData() {
			await this.USER_ACT_AS({
				method: 'del',
				params: [
					{
						category: '1',
						service_id: this.USER_GET_AS_SELECT.service_id,
					},
				],
			}).then(async () => {
				await this.APP_MU_DIALOG({
					dialog: true,
					title: 'A/S 삭제',
					text: '해당 내용을 삭제하였습니다.',
				})
				this.$router.go(-1)
			})
		},
	},
}
</script>

<style scoped lang="scss">
.sub_tit {
	padding: 12px 0 !important;
	border-bottom: 1px solid #262626;
	h4 {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 18px !important;
		color: #262626;
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
	.sub_tit {
		font-size: 15px !important;
	}
	.btn_basic {
		min-width: 90px !important;
	}
}
@media all and (max-width: 380px) {
	.sub_tit {
		font-size: 15px !important;
	}
	.btn_basic {
		min-width: 64px !important;
	}
}

h3 {
	font-family: 'NotoSansKR-Bold' !important;
	font-size: 20px !important;
}
.file {
	color: $color_gray1;
	font-size: 13px !important;
}

@media all and (max-width: 767px) {
	h3 {
		font-size: 16px !important;
	}
}
</style>
