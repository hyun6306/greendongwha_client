<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="420"
	>
		<v-card class="pa-0">
			<!-- 팝업제목 -->
			<!-- <v-card-text class="pt-3 pb-0 title_bottom">
				<v-col
					align="center"
					justify="center"
				>
					<span class="dialog_title">{{title}}</span>
				</v-col>
			</v-card-text> -->

			<!-- 컨텐츠 -->
			<v-card-title class="pa-0">
				<v-row class="ma-0 text_wrapper">
					<v-col
						class="pa-0"
						align="center"
						align-self="center"
					>
						<p
							class="dialog_text"
							v-html="text"
						/>
					</v-col>
				</v-row>
			</v-card-title>

			<!-- 확인버튼 -->
			<v-card-actions class="pa-0">
				<v-col
					align="center"
					justify="center"
					class="pa-0"
				>
					<v-btn
						width="140"
						height="46"
						class="pa-4 dialog_btn"
						color="primary"
						@click.stop="closePopup(this)"
					>
						확인
					</v-btn>
				</v-col>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'Dialog',
	props: ['title', 'text', 'dialog'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {},
	methods: {
		closePopup(e) {
			this.$emit('close', e)
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.v-dialog) {
	padding: 30px;
	background-color: #fff;
	border: 1px solid #000;
	border-radius: 0;
	box-shadow: none;

	.v-card {
		border-radius: 0;
		box-shadow: none;

		// 제목
		.dialog_title {
			font-family: 'NotoSansKR-Bold';
			font-size: 1.2rem;
			word-break: keep-all;
			color: $color_primary;
		}
		.title_bottom {
			border-bottom: 1px solid #ccc;
		}

		// 컨텐츠
		.text_wrapper {
			min-height: 80px;
		}
		.dialog_text {
			font-family: 'NotoSansKR-Regular';
			font-size: 16px;
			color: #262626;
			word-break: keep-all;
		}

		// 확인버튼
		.v-btn__content {
			font-family: 'NotoSansKR-Regular';
			font-size: 16px;
		}
		.dialog_btn {
			margin-top: 10px;
			border-radius: 5px;
		}
		.dialog_btn_left {
			margin-top: 10px;
			border-radius: 5px;
		}
	}
}
</style>
