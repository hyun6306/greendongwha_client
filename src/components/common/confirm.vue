<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="400"
	>
		<v-card>
			<!-- <v-card-title class="pt-1 pb-0">
				<v-col
					align="center"
					justify="center"
				>
                    <span class="confirm_title">{{title}}</span>
				</v-col>
			</v-card-title>

            <v-divider></v-divider> -->

			<v-card-text>
				<v-row class="ma-0 text_wrapper">
					<v-col
						class="pa-0"
						align="center"
						align-self="center"
					>
						<p
							class="confirm_text"
							v-html="text"
						/>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions class="pa-0">
				<v-col
					align="center"
					justify="center"
					class="pa-0"
				>
					<v-btn
						width="140"
						height="46"
						class="pa-4 mr-1 confirm_btn_left"
						color="secondary lighten-1"
						@click.stop="closePopup"
					>
						취소
					</v-btn>
					<v-btn
						width="140"
						height="46"
						class="pa-4 ml-1 confirm_btn"
						color="primary"
						@click.stop="confirmPopup"
					>
						<b>확인</b>
					</v-btn>
				</v-col>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'Confirm',
	props: ['title', 'text', 'dialog'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {},
	methods: {
		closePopup() {
			this.$emit('close', false)
		},
		confirmPopup() {
			this.$emit('submit', true)
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
		.confirm_title {
			font-family: 'NotoSansKR-Bold';
			font-size: 1.2rem;
			word-break: keep-all;
			color: $color_primary;
		}

		// 컨텐츠
		.text_wrapper {
			min-height: 80px;
		}
		.confirm_text {
			font-family: 'NotoSansKR-Regular';
			font-size: 1.1rem;
			color: #262626;
			word-break: keep-all;
			text-align: center;
		}

		// 버튼
		.v-btn__content {
			font-family: 'NotoSansKR-Regular';
			font-size: 16px;
		}
		.confirm_btn {
			margin-top: 10px;
			font-weight: normal !important;
			border-radius: 5px;
		}
		.confirm_btn_left {
			margin-top: 10px;
			border-radius: 5px !important;
		}
	}
}
</style>
