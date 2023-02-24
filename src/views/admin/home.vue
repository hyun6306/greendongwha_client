<template>
	<v-container fluid>
		<v-col v-if="news">
			<v-card
				width="100%"
				height="60"
				color="brown darken-3"
			>
				<v-row
					class="ma-0 ml-5 news fill-height"
					align="center"
				>
					<span class="mx-2 news_title">NEW</span> | <span class="mx-2"> 품질보증등록 </span>
					<h3>{{ qualityItems.length }}</h3>
					건 | <span class="mx-2"> AS신청 </span>
					<h3>{{ qualityItems.length }}</h3>
					건 | <span class="mx-2"> 1:1문의 </span>
					<h3>{{ qualityItems.length }}</h3>
					건
					<v-spacer />
					<v-btn
						dark
						icon
						class="mr-3"
						@click="news = false"
					>
						<v-icon> clear </v-icon>
					</v-btn>
				</v-row>
			</v-card>
		</v-col>
		<v-row class="ma-0">
			<v-col
				cols="12"
				md="4"
			>
				<CommonListsList01
					title="품질보증등록"
					count-title="접수중"
					count-unit="건"
					header-title-left="사용자 정보"
					header-title-right="내용"
					link="/admin/custom/quality"
					left="7"
					right="5"
					:items="qualityItems"
				/>
			</v-col>
			<v-col
				cols="12"
				md="4"
			>
				<CommonListsList01
					title="A/S신청"
					count-title="접수중"
					count-unit="건"
					header-title-left="내용"
					header-title-right="접수자"
					link="/admin/custom/as"
					left="5"
					right="7"
					:items="qualityItems"
				/>
			</v-col>
			<v-col
				cols="12"
				md="4"
			>
				<CommonListsList01
					title="1:1문의"
					count-title="접수중"
					count-unit="건"
					header-title-left="구분"
					header-title-right="내용"
					link="/admin/custom/question"
					left="7"
					right="5"
					:items="qualityItems"
				/>
			</v-col>
		</v-row>
		<v-row class="ma-0">
			<v-col
				cols="12"
				md="4"
			>
				<CommonListsList01
					title="최근가입회원"
					count-title="전체"
					count-unit="명"
					header-title-left="가입자정보"
					header-title-right="가입일"
					link="/admin/user/manager"
					left="5"
					right="7"
					:items="qualityItems"
				/>
			</v-col>
			<v-col
				cols="12"
				md="8"
				class="pa-0 px-3"
			>
				<v-row
					class="ma-0 py-3"
					align="center"
				>
					<v-col
						cols="4"
						align="start"
						class="list_title pa-0"
					>
						방문자 통계
					</v-col>
					<v-col
						cols="12"
						sm="8"
						align="end"
						class="pa-0"
					>
						<CommonTabsTab01
							v-model="tab"
							:tab-items="tabItems"
							class-name="margin_0"
						/>
					</v-col>
				</v-row>
				<v-card
					width="100%"
					height="380"
					color="white"
					class="pa-5"
					elevation="1"
				>
					<v-col>
						<CommonChartsBarChart
							height="350"
							:value="barChartItem"
						/>
					</v-col>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'AdminHome',
	data: () => ({
		news: true,
		tab: 0,
		tabItems: ['일간', '주간', '월간', '연간'],
		qualityItems: [
			{
				title: 'test',
				value: 'testValue',
			},
		],
		barChartItem: [
			{
				date: '20.12',
				value: 40,
			},
			{
				date: '1',
				value: 40,
			},
			{
				date: '2',
				value: 60,
			},
			{
				date: '3',
				value: 30,
			},
			{
				date: '4',
				value: 55,
			},
			{
				date: '5',
				value: 25,
			},
			{
				date: '6',
				value: 40,
			},
			{
				date: '7',
				value: 65,
			},
			{
				date: '2021.8',
				value: 80,
			},
		],
	}),
	methods: {},
}
</script>

<style lang="scss" scoped>
.news {
	color: white;
	font-size: 1.2rem;
	font-family: 'NotoSansKR-Regular';
	&_title {
		color: aqua;
		font-size: 1.4rem;
		font-family: 'NotoSansKR-Bold';
	}
	h3 {
		color: #de7f7f;
		font-size: 1.4rem;
		font-family: 'NotoSansKR-Bold';
	}
}
.list {
	&_bg {
		overflow: hidden;
		overflow-y: auto;
	}
	&_title {
		font-size: 1.2rem;
		font-family: 'NotoSansKR-Bold';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	&_text {
		font-size: 1rem;
		font-family: 'NotoSansKR-Regular';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
}
</style>
