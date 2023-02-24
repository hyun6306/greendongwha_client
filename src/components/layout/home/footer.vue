<template>
	<v-footer
		padless
		class="footer"
	>
		<v-col
			class="pa-0"
			cols="12"
			style="border-bottom: 1px solid #484848"
		>
			<div class="wrapper px-5">
				<v-row
					class="ma-0 py-4"
					align="center"
				>
					<!-- 메뉴 -->
					<v-col
						class="pa-0 text-center text-md-left"
						cols="12"
						md="7"
					>
						<v-btn
							v-for="(menu, i) in footerMenu"
							:key="i"
							:to="menu.to"
							text
							class="foot_menu"
						>
							{{ menu.title }}
						</v-btn>
					</v-col>

					<v-col
						class="pa-0"
						cols="12"
						md="5"
					>
						<v-row
							class="ma-0 mt-2 mt-md-0"
							justify="center"
							justify-md="end"
						>
							<!-- SNS -->
							<v-col
								class="pa-0 pb-2 pb-sm-0 icn_sns"
								cols="12"
								sm="3"
								md="5"
								align="center"
								align-self="center"
							>
								<CommonButtonsButtonIcon
									v-for="(icon, i) in icons"
									:key="i"
									:src="icon.src"
									:href="icon.link"
									target="_blank"
									class="mx-1"
								/>
							</v-col>

							<!-- 패밀리사이트 -->
							<v-col
								class="pa-0"
								cols="7"
								sm="3"
								md="4"
								align="center"
							>
								<v-select
									v-model="selectSite"
									dark
									:items="familySite"
									:item-text="item => item.title"
									:item-value="item => item.link"
									dense
									outlined
									hide-details
									class="family_site"
								/>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</div>
		</v-col>

		<v-col
			class="pa-0"
			cols="12"
		>
			<div class="wrapper px-5">
				<v-row class="ma-0 pt-4 pb-10">
					<!-- 동화자연마루 정보 -->
					<v-col
						cols="12"
						md="8"
						class="pa-0 text-center text-md-left"
					>
						<h1 class="mb-1">동화자연마루</h1>
						<p class="address">동화기업(주)ㅣ김홍진ㅣ137-81-02333</p>
						<p class="address">
							우)07327 서울특별시 영등포구 여의나루로 53-2
							<span class="fax ml-3">FAX: 02-2112-0539</span>
						</p>
					</v-col>

					<!-- 고객센터 정보 -->
					<v-col
						class="pa-0 text-center text-md-right"
						cols="12"
						md="4"
					>
						<v-col
							class="pa-0"
							cols="12"
						>
							<v-row
								class="ma-0 py-3 py-md-0 justify-center justify-md-end"
								align="start"
							>
								<span>
									<span class="custom">고객센터</span>
									<span class="mx-1 bar">│</span>
								</span>
								<span class="custom_num">
									1899-2837<br />
									<p class="time">평일 9:00 ~ 17:00</p>
									<span class="sub_text">(공휴일 제외)</span>
								</span>
							</v-row>
						</v-col>
					</v-col>

					<!-- Copyright -->
					<v-col
						class="pa-0 mt-2 text-center text-md-left"
						cols="12"
					>
						<p class="copyright">Copyright@Dongwha Co. Ltd. All right reserved</p>
					</v-col>
				</v-row>
			</div>
		</v-col>
	</v-footer>
</template>

<script>
export default {
	name: 'Footer',
	components: {},
	data: () => ({
		selectSite: null,
		familySite: [
			{
				title: 'Family Site',
				link: null,
			},
			{
				title: '동화 그룹',
				link: 'https://www.dongwha.com/main/main.asp',
			},
			{
				title: '동화 컬쳐빌리지',
				link: 'http://www.dongwhaculturevillage.com/',
			},
			{
				title: '동화 베트남',
				link: 'http://www.dongwhavietnam.com/',
			},
			{
				title: 'VRG 동화',
				link: 'https://www.dongwha.com/vnen/main/main.asp',
			},
			{
				title: '동화 말레이시아',
				link: 'https://www.dongwha.com/my/main/main.asp',
			},
			{
				title: '동화 호주',
				link: 'https://www.dongwha.com/au/main/main.asp',
			},
			{
				title: '태양 합성',
				link: 'http://www.sunresin.co.kr/main/main.asp',
			},
			{
				title: '동화 핀란드',
				link: 'https://www.dongwha.com/fi/main/main.asp',
			},
			{
				title: '동화 일렉트로라이트',
				link: 'http://www.dongwhaelectrolyte.com/main/main.asp',
			},
			{
				title: '엠파크',
				link: 'http://www.m-park.co.kr/',
			},
			{
				title: '엠파크 이지옥션',
				link: 'http://www.m-parkeasy.co.kr/',
			},
			{
				title: '한국일보',
				link: 'https://www.hankookilbo.com/',
			},
			{
				title: '코리아타임즈',
				link: 'http://www.koreatimes.co.kr/www/index.asp',
			},
			{
				title: '거북이 마라톤',
				link: 'http://www.hkturtle.com/',
			},
		],
		footerMenu: [
			{
				title: '이용약관',
				to: '/site/terms',
			},
			{
				title: '개인정보처리방침',
				to: '/site/userInfo',
			},
			{
				title: '카탈로그',
				to: '/site/catalog',
			},
			{
				title: '인증서/시험성적서',
				to: '/site/certificate',
			},
		],
		icons: [
			{
				src: require('@/assets/img/layout/icon_youtube.png'),
				link: 'https://www.youtube.com/channel/UChk6tpEqFFtBm_79Pr_pFaQ',
			},
			{
				src: require('@/assets/img/layout/icon_insta.png'),
				link: 'https://www.instagram.com/green_dongwha/',
			},
			{
				src: require('@/assets/img/layout/icon_blog.png'),
				link: 'https://blog.naver.com/dongwhagreen',
			},
		],
	}),
	computed: {},
	watch: {
		selectSite(val) {
			if (val === null) return
			window.open(val, '_blank')
		},
	},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style lang="scss">
.footer.v-footer {
	background-color: #333 !important;
}

// 메뉴
.foot_menu {
	.v-btn__content {
		font-size: 14px;
		font-family: 'NotoSansKR-Light' !important;
		color: #fff !important;
	}
	&:first-child {
		padding-left: 0 !important;
	}
}

// SNS
.icn_sns {
	.v-btn {
		width: 27px;
	}
}

// 패밀리사이트
.family_site {
	border-radius: 0;
	.v-select__selection {
		font-size: 14px !important;
		font-family: 'Roboto-Thin' !important;
		color: #fff !important;
	}
}

// 동화자연마루
h1 {
	font-family: 'NotoSansKR-Medium' !important;
	font-size: 20px !important;
	font-weight: 400;
	color: #fff;
}
// 주소, 팩스번호
.address,
.address .fax {
	font-family: 'NotoSansKR-Light' !important;
	font-size: 13px !important;
	line-height: 20px;
	color: #c4c4c4;
}

// 고객센터
.custom {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 14px !important;
	color: #74b446 !important;
	line-height: 30px;
}
.bar {
	color: #fff;
}
.custom_num {
	font-family: 'Roboto-Medium' !important;
	font-size: 22px !important;
	color: #fff;
	.time {
		font-family: 'NotoSansKR-Light' !important;
		font-size: 14px !important;
		color: #fff;
	}
	.sub_text {
		font-family: 'NotoSansKR-Light' !important;
		font-size: 12px !important;
		color: #fff;
	}
}

// copyright
.copyright {
	font-family: 'Roboto-Thin' !important;
	font-size: 14px !important;
	color: #fff;
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
}
@media all and (max-width: 600px) {
	.foot_menu {
		height: 30px !important;
		padding: 0 10px !important;
		.v-btn__content {
			font-size: 13px !important;
		}
		&:first-child {
			padding-left: 8px;
		}
	}
	h1 {
		display: none !important;
	}
	.address,
	.address .fax {
		font-size: 13px !important;
	}
}
</style>
