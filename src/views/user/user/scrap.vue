<template>
	<v-container class="pa-0 d-flex justify-center">
		<v-col
			cols="12"
			lg="11"
			xl="10"
			class="pa-0"
			align="center"
		>
			<v-col
				cols="12"
				align="center"
			>
				<h2 class="content_title">스크랩 북</h2>
				<v-btn
					text
					to="/user"
					class="btn_back"
				>
					마이페이지로 돌아가기
				</v-btn>
			</v-col>

			<v-col
				cols="12"
				align="center"
				class="pa-0"
			>
				<v-row
					class="ma-0 px-3 px-md-10"
					align="center"
				>
					<v-col
						cols="4"
						md="2"
						class="pa-0"
						align="end"
					>
						<CommonSelectsSelect01
							v-model="selectModel"
							:items="searchItems"
						/>
					</v-col>
					<v-spacer />
					<v-col
						cols="4"
						md="3"
						lg="2"
						class="pa-0"
						align="start"
					>
						<v-row class="ma-0">
							<v-col class="pa-0">
								<CommonCheckboxsCheckbox02
									v-model="allSelected"
									text="전체선택"
								/>
							</v-col>
							<v-col class="pa-0">
								<v-btn icon>
									<v-icon> delete </v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<CommonCardMenuGroup02
					:menu-type="'product'"
					:card-menu="productItems"
				/>
			</v-col>
		</v-col>
	</v-container>
</template>

<script>
export default {
	name: 'UserScrap',
	components: {},
	data: () => ({
		productItems: [
			{
				id: '01',
				type: '강마루',
				title: '아기의 행복이 가득해지는 스윗홀',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
				path: '제품 > 강마루 > 나투스진',
			},
			{
				id: '02',
				type: '강마루',
				title: '디자이너 감성을 담은 빌라',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
			},
			{
				id: '03',
				type: '강마루',
				title: '디자이너 감성을 담은 화이트톤',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
			},
			{
				id: '04',
				type: '강마루',
				title: '감성을 담은 화이트톤 빌라',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
			},
			{
				id: '05',
				type: '강마루',
				title: '아기의 행복이 가득해지는 스윗홀',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
			},
			{
				id: '06',
				type: '강마루',
				title: '디자이너 감성을 담은 빌라',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
			},
			{
				id: '07',
				type: '강마루',
				title: '디자이너 감성을 담은 화이트톤',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
			},
			{
				id: '08',
				type: '강마루',
				title: '감성을 담은 화이트톤 빌라',
				text: '[강마루] 나투스진 스카이 캔버스',
				image: require('@/assets/img/home/main/img_find.jpg'),
				tags: ['모던스타일', '화이트 톤', '크림 컬러'],
			},
		],
		selectModel: '전체보기',
		searchItems: ['전체보기', '바닥재', '벽재', '도어/몰딩', '외장'],
	}),
	computed: {
		allSelected() {
			return false
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
:deep(.v-btn.btn_back) {
	color: #fff !important;
	border-radius: 0 !important;
	.v-btn__content {
		color: #000 !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 15px !important;
		border-bottom: 1px solid #000 !important;
	}
}
</style>
