<template>
	<v-col class="pa-5 mb-12 filter">
		<!-- 선택검색 -->
		<v-row
			class="ma-0"
			align="center"
		>
			<v-col
				class="pa-0 mb-1 mb-md-0 tit"
				cols="12"
				sm="2"
				md="1"
			>
				취급품목 선택
			</v-col>
			<v-col
				class="pa-0 pl-0 pl-md-8 mb-1 mb-md-0"
				cols="12"
				sm="8"
			>
				<CommonButtonsToggleButton02
					v-model="model"
					:items="productItems"
				/>
			</v-col>
			<v-col
				class="pa-0"
				cols="12"
				sm="2"
				md="3"
			>
				<v-col
					class="pa-0 mt-2 mt-sm-0 text-center text-sm-end"
					cols="auto"
				>
					<v-btn
						text
						outlined
						@click="reset"
					>
						<v-icon small>autorenew</v-icon>
						초기화
					</v-btn>
				</v-col>
			</v-col>
		</v-row>

		<v-divider class="my-4" />

		<!-- 직접검색 -->
		<v-row
			class="ma-0"
			justify="center"
		>
			<v-col
				class="pa-0"
				cols="12"
				sm="8"
				md="5"
			>
				<v-row
					class="ma-0"
					align="center"
				>
					<v-text-field
						v-model="keyword"
						label="매장명 또는 주소를 입력해주세요."
						clearable
						@keyup.enter="onSearchKeyboard"
					/>
					<v-btn
						icon
						@click="onSearchKeyboard"
					>
						<v-icon>search</v-icon>
					</v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'HomeInteriorShowRoomFilter',
	mixins: [model],
	props: ['productItems'],
	data: () => ({
		keyword: '',
	}),
	watch: {
		model(val) {
			console.log('filter model', val)
		},
	},
	created() {},
	methods: {
		onSearchKeyboard() {
			this.$emit('search', this.keyword)
		},
		reset() {
			this.model = []
			this.keyword = ''
		},
	},
}
</script>

<style scoped lang="scss">
.filter {
	border: 1px solid #ccc;
	border-radius: 10px;

	:deep(.v-text-field__details) {
		display: none !important;
	}
}

.tit {
	color: #7f7f7f;
	font-size: 14px;
	font-family: 'NotoSansKR-Regular';
	word-break: keep-all;
}

.item {
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 4px;
	cursor: pointer;
	.txt {
		color: #262626;
		font-size: 14px;
		font-family: 'NotoSansKR-Regular';
	}

	&.active {
		border: 0 !important;
		background-color: #44883d;
		.txt {
			color: #fff;
		}
	}
}
</style>
