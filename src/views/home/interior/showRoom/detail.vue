<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<div class="mt-7 mt-md-10">
				<HomeInteriorShowroomHeader :items="specialItem" />

				<v-row class="ma-0 mt-0 mt-md-7 mb-6 mb-md-0">
					<v-col
						cols="12"
						md="7"
						class="pa-5 pa-md-0 pr-md-5"
					>
						<HomeInteriorShowroomDetailInfo :items="showroomItems" />
					</v-col>
					<v-col
						cols="12"
						md="5"
						align="start"
						class="pa-0 px-5 pb-5 pa-md-0 pl-md-5"
					>
						<v-img
							:src="detailItems.rep_image_url1"
							eager
							class="interior_img"
						/>
					</v-col>
				</v-row>

				<div class="px-5 px-md-0 mb-5 mb-md-15">
					<v-col
						class="pa-0 map"
						cols="12"
					>
						<p class="mb-4 mb-md-6">약도/오시는길</p>
						<div
							class="map_area"
							:style="`height:${mapHeight}px`"
						>
							<div
								class="map_wrap"
								:style="`height:${mapHeight}px`"
							>
								<div id="kakao_map"></div>
							</div>
						</div>
					</v-col>
				</div>

				<div class="px-5 px-md-0">
					<v-col class="pa-0 ad">
						<v-img
							eager
							:src="require('@/assets/img/etc/ad.png')"
						>
							<div class="txt">
								<p>우리집에 어울리는 마루</p>
								<span>동화 쇼룸에서 눈으로 비교하고 고르세요!</span>
							</div>
						</v-img>
					</v-col>
				</div>

				<div
					v-if="showroom_images.length"
					class="px-5 px-md-0 mb-15"
				>
					<v-card class="feature_tit py-5 mb-5 mb-md-15">
						<p>쇼룸사진</p>
					</v-card>
					<v-row
						class="ma-0"
						justify="center"
					>
						<v-col
							class="pa-0"
							cols="12"
							md="10"
						>
							<CommonCarousels02 :items="showroom_images" />
						</v-col>
					</v-row>
				</div>

				<div
					v-if="build_images.length"
					class="px-5 px-md-0"
				>
					<v-card class="feature_tit py-5 mb-5 mb-md-15">
						<p>시공사례</p>
					</v-card>
					<v-row
						class="ma-0"
						justify="center"
					>
						<v-col
							class="pa-0"
							cols="12"
							md="10"
						>
							<CommonCarousels02 :items="build_images" />
						</v-col>
					</v-row>
				</div>
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import kakao_map from '@/mixins/kakao_map'

export default {
	name: 'HomeInteriorStoreDetail',
	metaInfo() {
		return {
			title: `${this.specialItem.title} | 동화자연마루`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					title: `${this.specialItem.title} | 동화자연마루`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: '동화자연마루를 취급하는 전문 전시장 상세정보입니다.',
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/interior/showRoom/detail/${this.getQuery}`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: `${this.detailItems.rep_image_url1}`,
				},
			],
		}
	},
	mixins: [common, kakao_map],
	data: () => {
		return {
			detailItems: {},
			specialItem: {},
			showroomItems: {},
			model: 0,
			showroom_images: [],
			build_images: [],
		}
	},
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'APP_GET_APP_WIDTH']),
		getQuery() {
			return this.$route.params.id
		},
		mapHeight() {
			if (this.APP_GET_APP_WIDTH > 960) return 642
			return this.APP_GET_APP_WIDTH < 960 ? (this.APP_GET_APP_WIDTH < 768 ? 328 : 658) : 688
		},
	},
	watch: {
		kakao_map_status(val) {
			// kakao map start
			if (val) this.startLocation()
		},
	},
	async created() {
		// 쇼룸 상세 정보
		await this.HOME_ACT_INTERIOR_SHOW_ROOM({ method: 'detail', query: this.getQuery }).then(res => {
			this.parseData(res)
		})
	},
	mounted() {
		console.log('items', this.showroom_images, this.build_images)
	},
	destroyed() {},
	// updated() {
	// 	if (this.kakao_map_status && this.detailItems) this.startLocation()
	// },
	methods: {
		...mapActions(['HOME_ACT_INTERIOR_SHOW_ROOM']),
		parseData(items) {
			console.log('detailItems', items)
			this.detailItems = items[0]
			this.specialItem = {
				title: items[0].showroom_name,
			}
			this.showroomItems = {
				address: `${items[0].showroom_addr1} ${items[0].showroom_addr2}`,
				time: items[0].business_hours,
				call: items[0].security_tel,
				service: items[0].showroom_service,
				homepage: items[0].homepage_url,
				buildType: items[0].buildtype.map(x => {
					// 마루
					if (x.code === 'CC_302_001')
						return {
							name: x.code_name,
							src: require('@/assets/img/icon/icon_maru.svg'),
						}
					// 타일
					if (x.code === 'CC_302_002')
						return {
							name: x.code_name,
							src: require('@/assets/img/icon/icon_tile.svg'),
						}
					// 벽재
					if (x.code === 'CC_302_003')
						return {
							name: x.code_name,
							src: require('@/assets/img/icon/icon_wall.svg'),
						}
					// 도어/몰딩
					if (x.code === 'CC_302_004')
						return {
							name: x.code_name,
							src: require('@/assets/img/icon/icon_door.svg'),
						}
					// 기타
					if (x.code === 'CC_302_005')
						return {
							name: x.code_name,
							src: require('@/assets/img/icon/icon_etc.svg'),
						}
				}),
				snsItems: this.makeSnsItems(items[0]),
			}

			// showroom image추가
			for (let i = 0; i < 5; i++) {
				if (items[0][`showroom_image_url${i + 1}`].length)
					this.showroom_images.push({ src: items[0][`showroom_image_url${i + 1}`] })
			}
			if (items[0].showroom_add_image_url.length)
				this.showroom_images.push({
					src: require('@/assets/img/home/interior/img_showroom.png'),
					link: items[0].showroom_add_image_url,
				})

			// 시공 image추가
			for (let i = 0; i < 5; i++) {
				if (items[0][`build_image_url${i + 1}`].length)
					this.build_images.push({ src: items[0][`build_image_url${i + 1}`] })
			}
			if (items[0].build_add_image_url.length) {
				this.build_images.push({
					src: require('@/assets/img/home/interior/img_showroom.png'),
					link: items[0].build_add_image_url,
				})
			}
		},
		makeSnsItems(items) {
			const sns = []
			const snsItems = Object.keys(items)
				.map(item => {
					if (item.includes('showroom_sns')) return item
				})
				.filter(element => element != null)
			for (let i of snsItems) {
				if (items[i].length) {
					const snsType = i.split('_').pop()
					console.log('snsType', snsType)
					// 인스타
					if (snsType === 'insta')
						sns.push({
							src: require('@/assets/img/home/interior/icon_instagram.svg'),
							link: items[i],
						})
					// 네이버
					if (snsType === 'naver')
						sns.push({
							src: require('@/assets/img/home/interior/icon_naver.svg'),
							link: items[i],
						})
					// 페이스북
					if (snsType === 'facebook')
						sns.push({
							src: require('@/assets/img/home/interior/icon_facebook.svg'),
							link: items[i],
						})
					// 유투브
					if (snsType === 'youtube')
						sns.push({
							src: require('@/assets/img/home/interior/icon_youtube.svg'),
							link: items[i],
						})
				}
			}
			return sns
		},
		startLocation() {
			this.kakao_map_set_center({ lat: Number(this.detailItems.latitude), lng: Number(this.detailItems.longitude) })
			this.kakao_map_create_markers(
				[
					{
						lat: Number(this.detailItems.latitude),
						lng: Number(this.detailItems.longitude),
					},
				],
				[
					{
						place_name: this.detailItems.showroom_name,
						lat: Number(this.detailItems.latitude),
						lng: Number(this.detailItems.longitude),
					},
				],
			)
		},
	},
}
</script>

<style scoped lang="scss">
.map_area {
	position: relative;
	width: 100%;
	height: 340px;
	background-color: #ebffff;
	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

.interior_img {
	width: 100%;
	height: 500px;
}
.interior_bg {
	background: #ededed;
	height: 330px;
	width: 100%;
	opacity: 0.1;
}
.text_area {
	width: 100%;
	height: 330px;
	background-color: rgba(1, 1, 1, 0.4);
	.text_area_title {
		margin-top: 130px;
		font-family: 'NotoSansKR-Bold';
		font-size: 22px;
		color: #fff;
	}
}
.card_align {
	margin: 0 -1% !important;
}

.feature_tit {
	text-align: start !important;
}

.map {
	p {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 18px !important;
		color: #262626;
	}
}

.ad {
	margin-bottom: 80px;
	:deep(.v-image) {
		position: relative;
		height: 430px;
		.txt {
			position: absolute;
			left: 80px;
			bottom: 40px;
			color: #fff;
			p {
				font-family: 'NotoSansKR-Bold' !important;
				font-size: 43px;
			}
			span {
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 30px;
			}
		}
	}
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.interior_img {
		height: 100% !important;
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.map_area {
		height: 200px;
	}
	.interior_img {
		height: 100% !important;
	}
	.text_area {
		height: 400px;
		background-color: rgba(1, 1, 1, 0.4);
		.text_area_title {
			margin-top: 180px;
			font-family: 'NotoSansKR-Bold';
			font-size: 20px;
			color: #fff;
		}
	}
	.map {
		p {
			font-size: 14px !important;
		}
	}
	.ad {
		margin-bottom: 60px !important;
		:deep(.v-image) {
			height: 200px !important;
			.txt {
				left: 20px !important;
				bottom: 20px !important;
				p {
					font-size: 18px !important;
				}
				span {
					font-size: 14px !important;
				}
			}
		}
	}
}
@media all and (max-width: 380px) {
	.interior_img {
		height: 100% !important;
	}
	.text_area {
		height: 400px;
		background-color: rgba(1, 1, 1, 0.4);
		.text_area_title {
			margin-top: 180px;
			font-family: 'NotoSansKR-Bold';
			font-size: 18px;
			color: #fff;
		}
	}
	.map {
		p {
			font-size: 14px !important;
		}
	}
	.ad {
		margin-bottom: 60px !important;
		:deep(.v-image) {
			height: 200px !important;
			.txt {
				left: 20px !important;
				bottom: 20px !important;
				p {
					font-size: 18px !important;
				}
				span {
					font-size: 14px !important;
				}
			}
		}
	}
}
</style>
