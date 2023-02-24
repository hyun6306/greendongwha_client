<template>
	<div class="inner_wrapper">
		<v-container class="pa-0 px-5">
			<v-col
				class="pa-0 sub_tit"
				cols="12"
				align="start"
			>
				<h4>품질보증 등록 내역</h4>
			</v-col>
			<v-col
				cols="12"
				class="pa-0 table_type01"
			>
				<v-row class="ma-0">
					<v-col
						cols="3"
						sm="2"
						class="th bc_gr"
						>시공제품</v-col
					>
					<v-col
						cols="9"
						sm="10"
						class="td"
						align="start"
					>
						<span v-if="USER_GET_QUALITY_SELECT.goods_name">
							{{ USER_GET_QUALITY_SELECT.brand_name }} {{ USER_GET_QUALITY_SELECT.goods_name }}
						</span>
					</v-col>
				</v-row>
				<v-row class="ma-0">
					<v-col
						cols="3"
						sm="2"
						class="th bc_gr"
						>품질보증<br />(QR코드)No.</v-col
					>
					<v-col
						cols="9"
						sm="10"
						class="td"
						align="start"
					>
						<span v-if="USER_GET_QUALITY_SELECT.guarantee_no">{{ USER_GET_QUALITY_SELECT.guarantee_no }}</span>
					</v-col>
				</v-row>
				<v-row class="ma-0">
					<v-col
						cols="3"
						sm="2"
						class="th bc_gr"
						>구입월</v-col
					>
					<v-col
						cols="9"
						sm="10"
						class="td"
						align="start"
					>
						<span v-if="USER_GET_QUALITY_SELECT.date">{{ USER_GET_QUALITY_SELECT.date }}</span>
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
						cols="9"
						sm="10"
						class="td"
						align="start"
					>
						<span v-if="USER_GET_QUALITY_SELECT.conf_name">{{ USER_GET_QUALITY_SELECT.conf_name }}</span>
					</v-col>
				</v-row>
			</v-col>

			<v-col
				class="pa-0 mt-9 sub_tit"
				cols="12"
				align="start"
			>
				<h4>등록정보</h4>
			</v-col>
			<UserItemRegisterInfo :info="USER_GET_QUALITY_SELECT" />

			<div
				class="mt-10 mb-10 d-flex justify-center"
				align="center"
			>
				<CommonButtonsButton02
					name="수정"
					class-name="btn_basic mr-1"
					color="#00582c"
					@click="pushModify"
				/>
				<CommonButtonsButton02
					name="삭제"
					class-name="btn_basic mr-1 ml-1"
					color="#a0a1a5"
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
				:title="`품질보증 내용 삭제`"
				:text="`선택하신 품질보증 내용이 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
				@close="confirmRemove = false"
				@submit="removeData"
			/>
		</v-container>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserQualityDetail',
	data: () => ({
		confirmRemove: false,
	}),
	computed: {
		...mapGetters(['USER_GET_QUALITY_SELECT']),
	},
	created() {
		if (Object.keys(this.USER_GET_QUALITY_SELECT).length === 0) this.$router.go(-1)
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['USER_ACT_QUALITY']),
		pushModify() {
			this.$router.push('/user/create/1?type=modify')
		},
		async removeData() {
			await this.USER_ACT_QUALITY({
				method: 'del',
				params: [{ guarantee_id: this.USER_GET_QUALITY_SELECT.guarantee_id }],
			}).then(async () => {
				await this.APP_MU_DIALOG({
					dialog: true,
					title: '품질보증 내용 삭제',
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

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.sub_tit {
		h4 {
			font-size: 15px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.sub_tit {
		h4 {
			font-size: 15px !important;
		}
	}
}
</style>
