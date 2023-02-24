<template>
	<div class="wrapper">
		<v-row class="ma-0">
			<!-- 지도 -->
			<v-col
				class="pa-0"
				cols="12"
				md="7"
			>
				<div class="mr-0 mr-md-2">
					<div
						class="map"
						:style="`height:${mapHeight}px`"
					>
						<!-- 검색필터 -->
						<v-col
							align="center"
							align-self="center"
							class="pa-3 map_search_bar"
						>
							<v-row class="ma-0">
								<!-- 직접검색 -->
								<v-col
									class="pa-0"
									cols="12"
									md="4"
								>
									<div
										class="mr-0 mr-md-1"
										@keyup.enter="$event.target.blur()"
									>
										<CommonInputsInput03
											v-model="kakao_map_search_model"
											class="map"
											placeholder="지역명을 입력해주세요."
											@update="kakao_map_search_places"
										/>
									</div>
								</v-col>

								<!-- 필터검색 -->
								<v-col
									class="pa-0"
									cols="10"
									md="7"
								>
									<v-row
										class="ma-0"
										justify="center"
									>
										<!-- 시공범위 -->
										<v-col
											v-if="mapTab === 0"
											class="pa-0 mt-1 mt-md-0"
											cols="12"
											md="5"
										>
											<CommonSelectsSelect02
												v-model="buildModel"
												:items="buildCodeItems"
												label="시공범위"
												class="interior"
											/>
										</v-col>

										<v-col
											v-else
											class="pa-0"
											cols="11"
											md="10"
										>
											<v-row class="ma-0 mt-1 mt-md-0">
												<!-- 평수 -->
												<v-col
													class="pa-0"
													cols="6"
												>
													<div class="mr-1">
														<CommonSelectsSelect02
															v-model="widthModel"
															:items="widthCodeItems"
															label="평수"
															class="interior"
														/>
													</div>
												</v-col>
												<!-- 스타일 -->
												<v-col
													class="pa-0"
													cols="6"
												>
													<CommonSelectsSelect02
														v-model="styleModel"
														:items="styleCodeItems"
														label="스타일"
														class="interior"
													/>
												</v-col>
											</v-row>
										</v-col>
										<v-spacer />
									</v-row>
								</v-col>

								<!-- 초기화 -->
								<v-col
									class="pa-0 mt-1 mt-md-0 text-center"
									cols="2"
									md="1"
								>
									<v-row class="ma-0 justify-end">
										<v-btn
											class="pa-0 btn_refresh"
											height="40"
											@click="resetData"
										>
											<v-icon small>autorenew</v-icon>
										</v-btn>
									</v-row>
								</v-col>
							</v-row>
						</v-col>

						<!--내 위치 button -->
						<div
							class="map_mobile_location_btn"
							:style="`top:${absoluteButtonTop - 20}px`"
						>
							<v-row
								class="ma-0"
								justify="end"
							>
								<v-btn
									color="olive"
									dark
									width="90"
									@click="geolocation_once"
								>
									<v-icon small> mdi-crosshairs-gps</v-icon>
									<span class="ml-1">내 위치</span>
								</v-btn>
							</v-row>
						</div>

						<!-- 지도 -->
						<div
							class="map_wrap"
							:style="`height:${mapHeight}px`"
						>
							<div id="kakao_map"></div>
						</div>
					</div>
				</div>
			</v-col>

			<!-- 인테리어점찾기, 전문가집들이 리스트 -->
			<v-col
				v-if="appWidthState"
				class="pa-0"
				cols="12"
				md="5"
			>
				<div class="ml-0 ml-md-2">
					<div class="map_text">
						<div v-if="currentPath === 'page'">
							<p class="mt-4 mb-1 tit">인테리어점 찾기</p>
							<p class="guide_text">견적상담 서비스를 이용해 보시는 건 어떠세요?</p>
							<p class="mb-9 guide_text">
								희망하는 지역의 인테리어점을 찾고 <strong>견적상담 의뢰</strong>버튼을 눌러보세요
							</p>
						</div>
						<div v-else>
							<p class="mt-4 mb-1 tit">STEP 1 : 인테리어점 찾기</p>
							<p class="guide_text">견적상담 의뢰를 위해 희망하는 지역의 인테리어점을 찾고</p>
							<p class="mb-9 guide_text"><strong>인테리어점 선택</strong>버튼을 눌러주세요</p>
						</div>
					</div>

					<HomeInteriorStoreListItemsTabGroup
						v-model="mapTab"
						:current-path="currentPath"
						:total-count="totalCount"
						:filter-interior-items="filterInteriorItems"
						:filter-expert-items="filterExpertItems"
						:show-items-count="showItemsCount"
						@showCount="showItemsCount += 16"
					/>
				</div>
			</v-col>
		</v-row>

		<!--mobile list button -->
		<div
			v-if="!appWidthState"
			class="map_mobile_list_btn"
			:style="`top:${absoluteButtonTop}px`"
		>
			<v-badge
				color="primary"
				overlap
				:content="totalCount"
			>
				<v-btn
					color="olive"
					dark
					fab
					@click="dialog = !dialog"
				>
					<v-icon>mdi-format-list-bulleted-square </v-icon>
				</v-btn>
			</v-badge>
		</div>
		<!-- mobile list -->
		<HomeInteriorStoreListItemsListDialog
			v-if="!appWidthState"
			v-model="mapTab"
			:dialog="dialog"
			:current-path="currentPath"
			:total-count="totalCount"
			:filter-interior-items="filterInteriorItems"
			:filter-expert-items="filterExpertItems"
			:show-items-count="showItemsCount"
			@close="dialog = false"
			@showCount="showItemsCount += 16"
		/>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import kakao_map from '@/mixins/kakao_map'
import geolocation from '@/mixins/geolocation'

export default {
	name: 'HomeInteriorStoreListItems',
	mixins: [common, kakao_map, geolocation],
	props: {
		next: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		dialog: false,

		mapTab: 0,
		showItemsCount: 16,

		// 인테리어점 필터조건
		// interiorItems: [],
		expertItems: [],

		// 전문가 집들이 필터조건
		buildModel: [],
		buildCodeItems: [],
		widthModel: [],
		widthCodeItems: [],
		styleModel: [],
		styleCodeItems: [],
	}),
	computed: {
		...mapGetters(['APP_GET_APP_WIDTH', 'HOME_GET_INTERIOR_SELECT_INTERIOR', 'HOME_GET_INTERIOR_GET_INTERIOR_ITEMS']),
		interiorItems() {
			return this.HOME_GET_INTERIOR_GET_INTERIOR_ITEMS || []
		},
		mapHeight() {
			if (this.APP_GET_APP_WIDTH > 960 && this.currentPath === 'components') return 740
			return this.APP_GET_APP_WIDTH < 960 ? (this.APP_GET_APP_WIDTH < 768 ? window.innerHeight - 90 : 650) : 740
		},
		// 인테리어점 filter
		filterInteriorItems() {
			return this.buildModel.length === 0
				? this.interiorItems
				: this.common_publicCodeDataFilter(this.buildModel, this.interiorItems, 'filter_items', 'code')
		},
		// 전문가 집들이 filter
		filterExpertItems() {
			// 검색 모델 병합
			const filterModel = [...this.widthModel, ...this.styleModel]
			return filterModel.length === 0
				? this.expertItems
				: this.common_publicCodeDataFilter(filterModel, this.expertItems, 'filter_items', 'code')
		},
		currentPath() {
			return this.common_recentlyRouterPath === '/interior/price/inquire' ? 'components' : 'page'
		},
		totalCount() {
			return this.mapTab ? this.filterExpertItems.length : this.filterInteriorItems.length
		},
		appWidthState() {
			return this.APP_GET_APP_WIDTH > 960
		},
		// 지도 위에 버튼 높이
		absoluteButtonTop() {
			return this.appWidthState ? 100 : 155
		},
	},
	watch: {
		kakao_map_center_value() {
			// map 중심이동시 재검색
			this.changeCenterLocation()
		},
		kakao_map_zoom() {
			// map zoom 수정시 재검색
			this.changeCenterLocation()
		},
		kakao_map_update() {
			// map update count 재검색
			this.changeCenterLocation()
		},
		kakao_map_status(val) {
			// kakao map start
			if (val) this.startLocation()
		},
		geolocation_status(val) {
			if (val === 0) {
				this.$toastr.info('회원님의 위치정보를 통해 검색하였습니다.', '위치 검색', { timeOut: 2500 })
				this.resetData()
				if (this.kakao_map_status) this.startLocation()
			}
		},
		mapTab(val) {
			let items = this.filterInteriorItems
			let type = 'interior'

			if (val === 1) {
				items = this.filterExpertItems
				type = 'expert'
			}

			this.kakao_map_remove_markers()
			this.kakao_map_remove_custom_overlay()
			this.createMarker(items, type)
		},
		filterInteriorItems(val) {
			if (val.length && this.mapTab === 0) {
				console.log('update interior')
				this.createMarker(val, 'interior')
			}
			// 인테리어 필터로 인한 마커 삭제 / 필터 검색이 아닌경우 동작 X
			if (val.length === 0 && this.mapTab === 0 && this.buildModel.length) {
				this.kakao_map_remove_markers()
				this.kakao_map_remove_custom_overlay()
			}
		},
		filterExpertItems(val) {
			if (val.length && this.mapTab === 1) {
				console.log('update expert')
				this.createMarker(val, 'expert')
			}
			// 전문가 집들이 필터로 인한 마커 삭제 / 필터 검색이 아닌경우 동작 X
			const filter = [...this.widthModel, ...this.styleModel]
			if (val.length === 0 && this.mapTab === 1 && filter.length) {
				this.kakao_map_remove_markers()
				this.kakao_map_remove_custom_overlay()
			}
		},
		next(val) {
			if (val) this.dialog = false
		},
	},
	async created() {
		// 인테리어 시공분야 그룹코드 가져오기
		await this.getApiInteriorFilterItems('301')
		// 전문가 집들이 그룹코드 가져오기
		await this.getApiInteriorFilterItems('902') // 평수
		await this.getApiInteriorFilterItems('904') // 스타일
	},
	mounted() {
		console.log('currentPath', this.currentPath)
		// this.geolocation_once()
	},
	destroyed() {},
	updated() {},
	methods: {
		...mapActions([
			'HOME_ACT_INTERIOR_GET_INTERIOR_ITEMS',
			'HOME_ACT_INTERIOR_GET_EXPERT_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
		]),
		startLocation() {
			this.kakao_map_pan_to(this.geolocation_position)
			this.kakao_map_create_my_location_marker(this.kakao_map_code_transform(this.geolocation_position), {
				place_name: '내위치',
				lat: this.geolocation_position.lat,
				lng: this.geolocation_position.lng,
			})
			this.getApiExpertItems(this.geolocation_position)
			this.getApiInteriorItems(this.geolocation_position)
		},
		changeCenterLocation() {
			// center value change
			this.getApiInteriorItems(this.kakao_map_center)
			this.getApiExpertItems(this.kakao_map_center)
		},
		async getApiInteriorFilterItems(groupCode) {
			const params = {
				group_code: groupCode,
			}
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS(params).then(res => {
				switch (groupCode) {
					case '301':
						this.buildCodeItems = res
						break
					case '902':
						this.widthCodeItems = res
						break
					case '904':
						this.styleCodeItems = res
						break
				}
				console.log('groupCode', res)
			})
		},
		async getApiInteriorItems(center) {
			if (center.lat === null)
				return this.$toastr.error('지도의 중심점을 찾지 못했습니다. 페이지를 새로 고침해주세요.', '지도 좌표 오류', {
					timeOut: 2500,
				})

			const level = this.kakao_map_zoom !== null ? this.kakao_map_zoom : this.kakao_init_level

			const params = {
				latitude_x: center.lat,
				longitude_y: center.lng,
				build_range: '',
				meter_range: this.kakao_map_zoom_distance(level),
			}

			console.log('params', params)

			await this.HOME_ACT_INTERIOR_GET_INTERIOR_ITEMS(params).then(res => {
				// this.interiorItems = res
				if (res.length && this.mapTab === 0) this.createMarker(this.filterInteriorItems)
			})
		},
		async getApiExpertItems(center) {
			if (center.lat === null)
				return this.$toastr.error('지도의 중심점을 찾지 못했습니다. 페이지를 새로 고침해주세요.', '지도 좌표 오류', {
					timeOut: 2500,
				})

			const level = this.kakao_map_zoom !== null ? this.kakao_map_zoom : this.kakao_init_level

			const params = {
				corporate_no: '',
				form_type: '',
				spacious_type: '',
				style_type: '',

				latitude_x: center.lat,
				longitude_y: center.lng,
				build_range: '',
				meter_range: this.kakao_map_zoom_distance(level),
			}

			console.log('params', params)

			await this.HOME_ACT_INTERIOR_GET_EXPERT_ITEMS(params).then(res => {
				this.expertItems = res
				if (res.length && this.mapTab === 1) this.createMarker(this.filterExpertItems)
			})
		},
		createMarker(res, type) {
			// zoom level 10 이상일 경우 마커 삭제
			if (this.kakao_map_zoom > 10) {
				this.kakao_map_remove_markers()
				this.kakao_map_remove_custom_overlay()
				return
			}
			console.log('createMarker', res, type)
			if (res === []) return console.log('data no', res)

			let data = []
			res.forEach(item => {
				data.push({
					lng: item.kakao_map.lng,
					lat: item.kakao_map.lat,
				})
			})

			let places = []
			res.forEach(item => {
				let placeName = item.business_name
				let placeUrl = `/interior/store/detail/${item.corporate_no}`

				if (type === 'expert') {
					placeName = item.title
					placeUrl = `/housewarming/specialist/detail/${item.exphw_id}`
				}

				places.push({
					place_name: placeName,
					lng: item.kakao_map.lng,
					lat: item.kakao_map.lat,
					place_url: placeUrl,
					place_corporate_no: item.corporate_no || '',
				})
			})

			this.kakao_map_create_markers(data, places)
		},
		resetData() {
			this.kakao_map_search_model = ''
			this.buildModel = []
			this.widthModel = []
			this.styleModel = []
		},
	},
}
</script>

<style lang="scss">
.map_mobile {
	&_list_btn {
		margin-left: 0.85rem;
		position: absolute;
		z-index: 1;
	}
	&_location_btn {
		position: absolute;
		right: 8px;
		z-index: 2;
	}
}
.map_text {
	color: $color_font;
	.tit {
		font-size: 1.562rem;
		font-weight: $fw_regular;
	}
	.guide_text {
		font-size: $font_lg;
		font-weight: $fw_regular;
	}
}

@media all and (max-width: 959px) {
	.map_text {
		display: none !important;
	}
}

//.map_board {
//	height: 580px;
//	overflow-y: scroll;
//	-ms-overflow-style: none !important;
//	&::-webkit-scrollbar {
//		display: none;
//	}
//}

// 검색필터
.map_search_bar {
	width: 98%;
	position: absolute;
	top: 12px;
	left: 50%;
	transform: translate(-50%, 0);
	background-color: $color_green1;
	border-radius: 8px;
	z-index: 2;
	.btn_refresh.v-btn {
		min-width: 40px;
		height: 40px;
	}
}

// 지도
.map {
	position: relative;
}

#kakao_map {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	border-radius: 16px !important;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
}

.map_wrap,
.map_wrap * {
	margin: 0;
	padding: 0;
	font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
	font-size: $font_sm;
}
.map_wrap {
	width: 100%;
	position: relative;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
	color: $color_font;
	text-decoration: none;
}

#menu_wrap {
	width: 250px;
	margin: 10px 0 30px 10px;
	padding: 5px;
	overflow-y: auto;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.7);
	font-size: 12px;
	border-radius: 10px;
	z-index: 1;
}
#menu_wrap hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 2px solid #5f5f5f;
	margin: 3px 0;
}
#menu_wrap .option {
	text-align: center;
}
#menu_wrap .option p {
	margin: 10px 0;
}
#menu_wrap .option button {
	margin-left: 5px;
}

.customoverlay {
	position: relative;
	bottom: 80px;
	border-radius: 6px;
	border: 1px solid #ccc;
	border-bottom: 2px solid #ddd;
	float: left;
}
.customoverlay:nth-of-type(n) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
	display: block;
	text-decoration: none;
	color: #000;
	text-align: center;
	border-radius: 6px;
	font-size: 12px !important;
	font-weight: bold;
	overflow: hidden;
	background: #00582c;
	background: #00582c url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}
.customoverlay .title {
	display: block;
	text-align: center;
	background: #fff;
	margin-right: 35px;
	padding: 5px 10px;
	font-size: 10px !important;
	font-weight: bold;
}
.customoverlay .title:hover {
	background: #00582c;
	color: #fff;
}
.customoverlay:after {
	content: '';
	position: absolute;
	margin-left: -12px;
	left: 50%;
	bottom: -12px;
	width: 22px;
	height: 12px;
	background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}
</style>
