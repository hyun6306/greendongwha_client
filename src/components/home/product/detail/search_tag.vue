<template>
	<div class="search_tag pa-4">
		<v-row class="ma-0 pb-3 search_zone">
			<v-col
				class="pa-0"
				cols="12"
				sm="9"
				md="10"
			>
				<v-row
					class="ma-0"
					justify="center"
					justify-sm="start"
				>
					<v-col
						cols="auto"
						class="pa-0"
					>
						<div class="mr-2 mb-1">
							<CommonSelectsSelect03 label="품목" />
						</div>
					</v-col>
					<v-col
						cols="auto"
						class="pa-0"
					>
						<div class="mr-2 mb-1">
							<CommonSelectsSelect03 label="브랜드" />
						</div>
					</v-col>
					<v-col
						cols="auto"
						class="pa-0"
					>
						<div class="mr-2 mb-1">
							<CommonSelectsSelect03 label="톤" />
						</div>
					</v-col>
					<v-col
						cols="auto"
						class="pa-0"
					>
						<div class="mr-2 mb-1">
							<CommonSelectsSelect03 label="스타일" />
						</div>
					</v-col>
					<v-col
						cols="auto"
						class="pa-0"
					>
						<div class="mr-2 mb-1">
							<CommonSelectsSelect03 label="평형" />
						</div>
					</v-col>
					<v-col
						cols="auto"
						class="pa-0"
					>
						<div class="mr-2 mb-1">
							<CommonSelectsSelect03 label="제품특성" />
						</div>
					</v-col>
					<v-col
						cols="auto"
						class="pa-0"
					>
						<div class="mr-2 mb-1">
							<CommonSelectsSelect03 label="추천태그" />
						</div>
					</v-col>
				</v-row>
			</v-col>

			<v-col
				class="pa-0"
				cols="12"
				sm="3"
				md="2"
			>
				<v-col
					class="pa-0 mt-2 mt-sm-0 text-center text-sm-end"
					cols="auto"
				>
					<v-btn
						text
						outlined
						@click="resetData"
					>
						<v-icon small>autorenew</v-icon>초기화
					</v-btn>
				</v-col>
			</v-col>
		</v-row>

		<v-row class="ma-0 pt-6 tag_zone">
			<v-col
				cols="auto"
				class="pa-0"
			>
				<div class="mr-2 mb-1">
					<span class="pa-2 tag">
						<span>강화마루</span>
						<v-icon
							class="pl-3"
							small
							>clear</v-icon
						>
					</span>
				</div>
			</v-col>
			<v-col
				cols="auto"
				class="pa-0"
			>
				<div class="mr-2 mb-1">
					<span class="pa-2 tag">
						<span>라이트 그레이</span>
						<v-icon
							class="pl-3"
							small
							>clear</v-icon
						>
					</span>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'HomeProductSearchTag',
	components: {},
	props: ['items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
//.search_tag {
//	border: 1px solid #ccc;
//	border-radius: 5px;
//	.search_zone {
//		border-bottom: 1px solid #ccc;
//	}
//	.tag_zone {
//		.tag {
//			background-color: #f1f2f3;
//			border-radius: 5px;
//		}
//	}
//}
</style>
