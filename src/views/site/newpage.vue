<template>
	<v-container
		class="pa-0"
		fluid
	>
		<!-- 상단배너 -->
		<v-col class="pa-0 mb-7 mb-md-10">
			<v-img
				width="100%"
				height="180"
				:src="require('@/assets/img/fnb/brand/slogan.jpg')"
				eager
				class="slogan"
			>
				<div class="wrapper px-5 mt-6 mt-md-10">
					<p class="mb-2">NewPage</p>
					<span>새로운 페이지 생성</span>
				</div>
			</v-img>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'SiteBrand',
	metaInfo: {
		title: '브랜드스토리ㅣ동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '브랜드스토리ㅣ동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루 브랜드스토리',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content:
					'1948년 설립된 동화기업은 대한민국 No.1 목질 전문기업입니다. 70년 역사의 목질 전문기업이 당신의 행복한 내일을 만들겠습니다.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/site/brand`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	data: () => ({}),
	computed: {
		...mapGetters(['SITE_GET_BRAND_CERTIFICATION']),
	},
	watch: {},
	async created() {
		if (this.SITE_GET_BRAND_CERTIFICATION.length === 0) await this.getCertList()
	},
	mounted() {},
	methods: {
		...mapActions(['SITE_ACT_BRAND_CERTIFICATION']),
		async getCertList() {
			this.loading = true
			const items = {
				method: 'get',
				params: {
					docu_kind: '1',
					exposure_yn: 'Y',
					regi_date_s: '',
					regi_date_e: '',
					subject_code: '',
					docu_name: '',
				},
			}
			await this.SITE_ACT_BRAND_CERTIFICATION(items).then(res => {
				console.log('SITE_ACT_BRAND_CERTIFICATION', res)
			})
		},
	},
}
</script>

<style scoped lang="scss">
.bg_gray {
	background-color: #f8f8f8 !important;
}

// 상단배너
.slogan {
	color: #fff;
	text-align: center;
	p {
		font-family: 'Roboto-Bold' !important;
		font-size: 30px !important;
	}
	span {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		word-break: keep-all !important;
	}
}

// 브랜드 어필문구
.brand_text {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	word-break: keep-all;
	p {
		font-size: 20px !important;
		span {
			font-family: 'NotoSansKR-Bold' !important;
			border-bottom: 1px solid #42883d;
		}
	}
}

// 날개..
.circle_piece {
	position: relative;
	padding: 64px 0 40px !important;
	color: #fff !important;
	p {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 16px !important;
	}
	span {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
	}
	.circle {
		width: 65px !important;
		height: 65px !important;
		border-radius: 50% !important;
		position: absolute !important;
		top: -25px !important;
		left: 50% !important;
		transform: translateX(-50%) !important;
		.wing {
			span {
				font-family: 'Roboto-Regular' !important;
				font-size: 18px !important;
				color: #d5ecd3 !important;
			}
		}
	}
	&.c_01 {
		background-color: #70b341 !important;
		.circle {
			background-color: #70b341 !important;
		}
	}
	&.c_02 {
		background-color: #44883d !important;
		.circle {
			background-color: #44883d !important;
		}
	}
	&.c_03 {
		background-color: #00592d !important;
		.circle {
			background-color: #00592d !important;
		}
	}
}

// HDF설명
.hdf {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	line-height: 1.5;
	span {
		padding: 2px 3px;
		background-color: #44883d;
		color: #fff;
	}
}

// 대외수상
.award_tit {
	font-family: 'NotoSansKR-Bold' !important;
	font-size: 15px !important;
	word-break: keep-all;
}
.award_part {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 14px !important;
	word-break: keep-all;
}
.award_date {
	font-family: 'Roboto-Regular' !important;
	font-size: 14px !important;
}

.hash {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	color: #777;
	line-height: 1.5;
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.slogan {
		height: 150px !important;
		p {
			font-size: 24px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
	.circle_piece {
		p {
			font-size: 13px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
}
@media all and (max-width: 600px) {
	.pc_only {
		display: none !important;
	}
	.slogan {
		height: 150px !important;
		p {
			font-size: 24px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
	.brand_text {
		font-size: 13px !important;
		p {
			font-size: 16px !important;
		}
	}
	.circle_piece {
		padding: 55px 0 25px !important;
		p {
			font-size: 13px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
	.hdf {
		font-size: 13px !important;
	}
}
</style>
