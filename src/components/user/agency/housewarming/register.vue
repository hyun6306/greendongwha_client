<template>
	<div class="inner_wrapper">
		<v-col
			cols="12"
			class="pa-0"
			align="center"
		>
			<h2 class="content_title">
				{{ title }}하기
				<p class="sub_title">고객님께 필요한 사항을 직접 파악하여 전문 인테리어점에서 상담을 진행합니다.</p>
			</h2>
		</v-col>

		<v-col class="pa-0">
			<v-expansion-panels
				v-model="panel"
				accordion
				multiple
				elevation="0"
				class="panel"
			>
				<v-expansion-panel>
					<v-expansion-panel-header class="pa-0">
						<span>작성하기 가이드</span>
					</v-expansion-panel-header>
					<v-expansion-panel-content class="mb-8">
						<v-col class="pa-4 pa-md-7 mt-3 guide_bg">
							<v-col class="pa-0 tit">
								<v-icon>error</v-icon>
								{{ title }}하기 가이드
							</v-col>
							<p class="desc">원환한 전문가집들이 콘텐츠 발행을 위해 꼭 읽어주세요.</p>

							<div class="mt-2 guide_list">
								<ul class="pa-0">
									<li>
										오픈 및 반려 여부 확인은 작성해주신 시점을 기준으로 일주일~10일 가량 소요되며,
										‘마이페이지>전문가 집들이 관리에서 확인 가능합니다.
									</li>
									<li>
										업체(인테리어점)에 대한 간단한 소개로 글을 시작해 주시며, 직접 시공한 시공 스토리를 사진과
										함께 남겨주세요.
									</li>
									<li>도면이 있으면 추가해주세요.</li>
									<li>필수 입력정보를 성실하게 기입해주세요.</li>
									<li>직접 시공한 제품 사진을 위주로 인테리어 사진을 업로드해주세요.</li>
									<li>
										사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, jpg, png 형태의 이미지를
										업로드해주세요.
									</li>
									<li>정보를 성실히 기입 해주셔야 검색 결과에 많이 노출되어 조회수가 올라갑니다.</li>
									<li>커버사진과 제목은 에디터에 의해 변경될 수 있습니다.</li>
									<li>글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요.</li>
								</ul>
							</div>
						</v-col>
					</v-expansion-panel-content>
				</v-expansion-panel>

				<v-expansion-panel>
					<v-expansion-panel-header class="pa-0">
						<span>필수 입력 정보</span>
					</v-expansion-panel-header>
					<v-expansion-panel-content class="mb-8">
						<v-col
							cols="12"
							class="pa-0 mt-3 store_info"
						>
							<v-row class="ma-0">
								<v-col
									v-if="AUTH_GET_USER.company_logourl"
									cols="4"
									sm="auto"
									class="pa-0"
								>
									<v-img
										eager
										:src="AUTH_GET_USER.company_logourl"
										class="store_logo"
										width="107"
										contain
									/>
								</v-col>
								<v-col
									cols="8"
									sm="auto"
									class="pa-0 pl-3"
									align-self="center"
								>
									<p
										v-if="AUTH_GET_USER.business_name"
										class="store_name tal"
									>
										{{ AUTH_GET_USER.business_name }}
									</p>
									<p
										v-if="AUTH_GET_USER.company_addr1"
										class="store_adress tal"
									>
										{{ AUTH_GET_USER.company_addr1 }} {{ AUTH_GET_USER.company_addr2 }}
									</p>
									<v-row class="ma-0">
										<v-col
											class="pa-0 mr-3 tal"
											cols="12"
											md="auto"
										>
											<span class="ceo">대표자 l </span>
											<span
												v-if="AUTH_GET_USER.boss_name"
												class="name"
											>
												{{ AUTH_GET_USER.boss_name }}
											</span>
										</v-col>
										<v-col
											class="pa-0 tal"
											cols="12"
											md="auto"
										>
											<span class="tel">연락처 l </span>
											<span
												v-if="AUTH_GET_USER.company_tel"
												class="num"
											>
												{{ common_number_filter(AUTH_GET_USER.company_tel) }}
											</span>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-col>
						<p class="notice mt-2 tar">
							*업체 정보가 일치하지 않을 경우 마이페이지(인테리어점) > 회원정보 수정을 통해 변경해주세요.
						</p>

						<v-col class="pa-0 house_register register">
							<v-col class="pa-0 body">
								<!-- 등록영역 -->
								<v-col class="pa-0 input_area">
									<v-col
										class="pa-0 table"
										cols="12"
									>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">평형</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="3"
												align="start"
											>
												<CommonSelectsSelect01
													v-model="models.spacious_code"
													label="선택해주세요."
													:items="spaciousCodeItems"
												/>
											</v-col>
										</v-row>

										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">가족형태</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="3"
												align="start"
											>
												<CommonSelectsSelect01
													v-model="models.familytype_code"
													label="선택해주세요."
													:items="familytypeCodeItems"
												/>
											</v-col>
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">톤</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="3"
												align="start"
											>
												<CommonSelectsSelect01
													v-model="models.tone_code"
													label="선택해주세요."
													:items="toneCodeItems"
												/>
											</v-col>
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">스타일</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="3"
												align="start"
											>
												<CommonSelectsSelect01
													v-model="models.style_code"
													label="선택해주세요."
													:items="styleCodeItems"
												/>
											</v-col>
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">형태</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="3"
												align="start"
											>
												<CommonSelectsSelect01
													v-model="models.form_code"
													label="선택해주세요."
													:items="formCodeItems"
												/>
											</v-col>
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p>제품특성</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="3"
												align="start"
											>
												<CommonSelectsSelect01
													v-model="models.feature_code"
													label="선택해주세요."
													:items="featureCodeItems"
												/>
											</v-col>
										</v-row>

										<v-row class="ma-0 mb-4 pb-2">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">제품</p>
											</v-col>
											<v-col
												class="py-0 pr-md-15 td"
												cols="12"
												md="9"
												align="start"
											>
												<common-selects-select-05
													v-model="patternModel"
													:parents-items="productItemsFilter"
													:child-items="patternItemsFilter"
													:select-text="selectPatternModel"
													:height="40"
													select-id="pattern_code"
													label="제품 선택"
													@select-parents="selectProduct"
													@select-child="selectPattern"
												/>
											</v-col>
										</v-row>

										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p>태그</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="10"
												align="start"
											>
												<!--                                            <v-row class="ma-0">
                                                    <v-col class="pa-0" cols="8" md="4">
                                                        <div class="pr-2 pr-md-6">
                                                            <CommonSelectsSelect01
                                                                label="선택해주세요."
                                                            />
                                                        </div>
                                                    </v-col>
                                                    <v-col class="pa-0 d-flex" cols="auto">
                                                        <v-btn class="tag_option mr-2">
                                                            <v-icon>add</v-icon>
                                                        </v-btn>
                                                        <v-btn class="tag_option">
                                                            <v-icon>remove</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>-->
												<v-row
													class="ma-0 pt-1"
													align="center"
												>
													<v-col
														cols="12"
														sm="5"
														md="4"
														class="pa-0 pr-0 pr-md-2 pb-2 pb-md-0"
													>
														<CommonSelectsSelect01
															v-model="tagInputGroupSelect"
															:items="filterTagGroup"
														/>
													</v-col>
													<v-col
														cols="12"
														sm="5"
														md="4"
														class="pa-0 pr-0 pr-md-2 pb-2 pb-md-0"
													>
														<CommonSelectsSelect01
															v-model="tagInputItemSelect"
															:items="filterTagItems"
														/>
													</v-col>
													<v-col
														cols="12"
														sm="2"
														class="pa-0"
													>
														<v-btn
															dark
															block
															height="40"
															color="olive"
															elevation="0"
															@click="registerTags()"
														>
															등록
														</v-btn>
													</v-col>
												</v-row>
												<v-col
													v-if="models.tagsModel !== null && models.tagsModel !== []"
													class="pa-0"
												>
													<v-chip-group
														active-class="primary--text"
														column
													>
														<v-chip
															v-for="(item, i) in models.tagsModel"
															:key="i"
															close
															@click:close="remove(item)"
														>
															<span v-if="typeof item === 'string'">
																{{ item }}
															</span>
															<span v-else> {{ item.group.text }}_{{ item.tag.text }} </span>
														</v-chip>
													</v-chip-group>
												</v-col>
												<p class="notice tal">
													*한 개 이상의 태그를 선택해주세요. / 최대 5개까지 선택가능합니다.
												</p>
											</v-col>
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">시공주소</p>
											</v-col>
											<v-col
												class="pa-0 td"
												cols="12"
												md="10"
												align="start"
											>
												<v-row class="ma-0 pa-0">
													<v-col
														cols="6"
														md="3"
														class="pa-0 pr-2"
													>
														<CommonInputsInput03
															v-model="models.zipcode"
															placeholder="우편번호"
															readonly
															disabled
															class="mb-2"
														/>
													</v-col>
													<v-col
														cols="2"
														class="pa-0"
													>
														<CommonButtonsButton01
															name="주소검색"
															color="#9fa1a4"
															class-name="edge_5 olive"
															height="40"
															@click="postApi"
														/>
													</v-col>
												</v-row>
												<v-col
													cols="12"
													class="pa-0"
												>
													<CommonInputsInput03
														v-model="models.address1"
														placeholder="도로명/지번주소"
														readonly
														disabled
														class="mb-2"
													/>
													<p class="notice tal">*지도 검색에 활용될 시공 주소를 입력해주세요.</p>
												</v-col>
											</v-col>
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">대표사진</p>
											</v-col>
											<CommonInputsInputFile01
												v-model="models.image"
												placeholder="jpg / png / gif 이미지"
											/>
											<!--                                        <v-col class="pa-0 td" cols="12" md="10" align="start">-->
											<!--                                            <div class="photo_zone tac py-10">-->
											<!--                                                <v-img-->
											<!--                                                    :src="require('@/assets/img/icon/icon_add_photo.png')"-->
											<!--                                                    class="add_photo layout_align mb-3"-->
											<!--                                                    width="43"-->
											<!--                                                />-->
											<!--                                                <p class="mb-5">드래그 앤 드롭이나 추가하기 버튼으로<br>대표 사진을 업로드 해주세요.</p>-->
											<!--                                                <CommonButtonsButton02-->
											<!--                                                    name="대표 사진 업로드"-->
											<!--                                                    className="btn_basic"-->
											<!--                                                    color="#42883d"-->
											<!--                                                />-->
											<!--                                            </div>-->
											<!--                                        </v-col>-->
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">제목</p>
											</v-col>
											<CommonInputsInput03 v-model="models.title" />
										</v-row>
										<v-row class="ma-0 mb-4">
											<v-col
												class="pa-0 th"
												cols="12"
												md="2"
												align="start"
											>
												<p class="required">내용</p>
											</v-col>
											<v-row class="ma-0 pa-0">
												<v-col
													cols="10"
													class="pa-0 pr-2"
												>
													<CommonInputsInput03
														v-model="models.description"
														placeholder="내용"
														readonly
														disabled
														class="mb-2"
													/>
												</v-col>
												<v-col
													cols="2"
													class="pa-0"
												>
													<CommonButtonsButton01
														name="콘텐츠 입력"
														color="#9fa1a4"
														class-name="edge_5 olive"
														height="40"
														@click="onEditDialog = true"
													/>
												</v-col>
											</v-row>
										</v-row>
									</v-col>
								</v-col>

								<v-card
									v-if="models.description"
									width="100%"
									elevation="0"
									color="#f8f8f8"
									class="ma-0 pa-0 mb-5"
								>
									<CommonEditorQuillViewerTile
										class="py-10"
										:html="models.description"
									/>
								</v-card>
							</v-col>
						</v-col>

						<div
							class="mt-10 d-flex justify-center"
							align="center"
						>
							<CommonButtonsButton02
								name="취소"
								class-name="btn_large"
								color="error"
								class="mr-1"
								@click="cancelRegister"
							/>
							<CommonButtonsButton02
								v-if="getQuery === 'modify'"
								name="수정"
								:disabled="editCheck"
								class-name="btn_large"
								color="secondary"
								class="ml-1"
								@click="onApiCallItem"
							/>
							<CommonButtonsButton02
								v-else
								:disabled="registerCheck"
								name="저장"
								class-name="btn_large"
								color="#00582c"
								class="ml-1"
								@click="onApiCallItem"
							/>
						</div>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-col>

		<CommonConfirm
			:dialog="confirm"
			:title="'정보 확인'"
			:text="`지금 이페이지를 나가시면 작성하신 데이터가 모두 삭제 됩니다. <br/> 그래도 나가시겠습니까?`"
			@close="confirm = false"
			@submit="confirmSubmit"
		/>

		<!-- editor -->
		<CommonEditorQuillEditorDialog
			v-if="onEditDialog"
			:dialog="onEditDialog"
			:edit-contents="models.description"
			@save="contentSave"
			@close="onEditDialog = false"
		/>

		<CommonLoading v-if="loading" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import kakao_post from '@/mixins/kakao_post'
import kakao_map from '@/mixins/kakao_map'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'UserAgencyHousewarmingRegister',
	mixins: [kakao_map, kakao_post, common, admin],
	data: () => ({
		panel: [0, 1],
		privateTermsCheck: false,
		confirm: false,

		onEditDialog: false,
		loading: false,

		models: {
			zipcode: null,
			address1: null,
			latitude: null,
			longitude: null,

			patternModel: null,
			image: null,
			spacious_code: null,
			familytype_code: null,
			style_code: null,
			tone_code: null,
			feature_code: null,
			form_code: null,

			title: null,
			description: null,

			tagsModel: [],
		},

		partModel: null,
		kindModel: null,
		brandModel: null,
		productModel: null,
		patternModel: null,

		spaciousCodeItems: [],
		familytypeCodeItems: [],
		styleCodeItems: [],
		toneCodeItems: [],
		featureCodeItems: [],
		formCodeItems: [],

		tagInputGroupSelect: null,
		tagInputItemSelect: null,

		housewarmingItems: {},
		origin: null,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_USER',
			'AGENCY_GET_HOUSEWARMING_SELECT',
			'ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS',
			'ADMIN_GET_PRODUCT_TAG_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS',
		]),
		registerCheck() {
			let check = false
			const checkValue = [
				'zipcode',
				'address1',
				'latitude',
				'longitude',
				'patternModel',
				'image',
				'spacious_code',
				'familytype_code',
				'style_code',
				'tone_code',
				'form_code',
				'title',
				'description',
			]

			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}

			return check
		},
		editCheck() {
			let check = false
			const checkValue = ['zipcode', 'address1', 'latitude', 'longitude', 'image', 'title', 'description']

			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}

			return check
		},
		title() {
			return `전문가 집들이 ${this.getQuery === 'modify' ? '수정' : '작성'}`
		},
		getQuery() {
			return this.$route.query.type
		},
		productItemsFilter() {
			if (this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS) {
				// 종류 - 추출한 내용의 kind_code만 추출
				// 주거용 / 바닥재 && 벽재 > 강마루 / 강화마루 / 원목마루 / 장판 / 디자인벽재
				const setArr = ['KC_00001', 'KC_00002', 'KC_00003', 'KC_00004', 'KC_00005']

				const filterBrandItems = this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.filter(x => setArr.includes(x.kind_code))

				let filterItems = []
				this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.forEach(x => {
					const findData = filterBrandItems.find(y => x.brand_code === y.brand_code)
					console.log('filterItems', findData)
					if (findData) {
						x.kind_code = findData.kind_code
						x.kind_name = findData.kind_name
						x.brand_name = findData.brand_name
						x.text = `${findData.brand_name} ${x.goods_name}`
						filterItems.push(x)
					}
				})

				if (!filterItems.length) return []

				filterItems.map(x => (x.active = false)) // active reset

				if (this.productModel) {
					// 선택데이터 확인 active 체크
					const select = filterItems.findIndex(x => x.goods_code === this.productModel.goods_code)
					filterItems[select].active = true
				} else {
					// 초기에 선택된 종류 데이터가 없을때 강제로 [0]데이터 active
					filterItems[0].active = true
				}

				return filterItems
			}
			return []
		},
		patternItemsFilter() {
			console.log('this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS', this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS)
			if (this.productModel) {
				return this.common_filterItem(this.productModel, this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS, 'goods_code')
			} else {
				return this.common_filterItem(
					this.productItemsFilter[0],
					this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS,
					'goods_code',
				)
			}
		},
		selectPatternModel() {
			let text = null
			if (this.patternModel) {
				const productItem = this.productItemsFilter.find(x => x.goods_code === this.patternModel.goods_code)
				text = `${productItem.text} ${this.patternModel.text}`
			}
			return text
		},
		// tag filter
		// tag filter
		filterTagGroup() {
			return this.ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS.map(x => {
				return { text: x.code_name, value: x.code }
			})
		},
		filterTagItems() {
			return this.tagItems.map(x => {
				return { text: x.tag_value, value: x.tag_id }
			})
		},
		tagItems() {
			let tagData = []
			if (this.tagInputGroupSelect !== null) {
				tagData = this.ADMIN_GET_PRODUCT_TAG_ITEMS.filter(item => this.tagInputGroupSelect.value === item.tag_group)
			}
			return tagData
		},
	},
	watch: {},
	async created() {
		await this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS_ALL()
		await this.getTagItems()
		await this.getPublicCode().then(() => {
			// 수정
			if (this.getQuery === 'modify') this.startDataMapping()
		})
	},
	async mounted() {
		await this.kakao_map_start()
	},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_CATEGORY_ITEMS_ALL',
			'ADMIN_ACT_PRODUCT_TAG_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 전문가 집들이 API
			'AGENCY_ACT_HOUSEWARMING',
		]),
		selectProduct(item) {
			console.log('selectProduct', item, this.patternItemsFilter)
			this.productModel = item
		},
		selectPattern(item) {
			this.patternModel = item
			this.models.patternModel = item
		},
		startDataMapping() {
			console.log(this.AGENCY_GET_HOUSEWARMING_SELECT)
			if (Object.keys(this.AGENCY_GET_HOUSEWARMING_SELECT).length === 0) return this.$router.push('/user')

			this.panel = [1]
			const pattern = this.admin_dataFind(
				this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS,
				this.AGENCY_GET_HOUSEWARMING_SELECT,
				'pattern_code',
			)
			const product = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS, pattern, 'goods_code')
			const brand = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, product, 'brand_code')
			const type = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, brand, 'kind_code')
			const part = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS, type, 'subject_code')

			this.partModel = part || null
			this.kindModel = type || null
			this.brandModel = brand || null
			this.productModel = product || null
			this.patternModel = pattern || null

			this.models.zipcode = this.AGENCY_GET_HOUSEWARMING_SELECT.zipcode || null
			this.models.address1 = this.AGENCY_GET_HOUSEWARMING_SELECT.address1 || null
			this.models.latitude = this.AGENCY_GET_HOUSEWARMING_SELECT.latitude || null
			this.models.longitude = this.AGENCY_GET_HOUSEWARMING_SELECT.longitude || null
			this.models.patternModel = pattern || null
			this.models.image = this.AGENCY_GET_HOUSEWARMING_SELECT.image_url || null
			this.models.spacious_code = this.AGENCY_GET_HOUSEWARMING_SELECT.spacious_code
				? this.spaciousCodeItems.find(item => item.code === this.AGENCY_GET_HOUSEWARMING_SELECT.spacious_code)
				: null
			this.models.familytype_code = this.AGENCY_GET_HOUSEWARMING_SELECT.familytype_code
				? this.familytypeCodeItems.find(item => item.code === this.AGENCY_GET_HOUSEWARMING_SELECT.familytype_code)
				: null
			this.models.style_code = this.AGENCY_GET_HOUSEWARMING_SELECT.style_code
				? this.styleCodeItems.find(item => item.code === this.AGENCY_GET_HOUSEWARMING_SELECT.style_code)
				: null
			this.models.tone_code = this.AGENCY_GET_HOUSEWARMING_SELECT.tone_code
				? this.toneCodeItems.find(item => item.code === this.AGENCY_GET_HOUSEWARMING_SELECT.tone_code)
				: null
			this.models.feature_code = this.AGENCY_GET_HOUSEWARMING_SELECT.feature_code
				? this.featureCodeItems.find(item => item.code === this.AGENCY_GET_HOUSEWARMING_SELECT.feature_code)
				: null
			this.models.form_code = this.AGENCY_GET_HOUSEWARMING_SELECT.form_code
				? this.formCodeItems.find(item => item.code === this.AGENCY_GET_HOUSEWARMING_SELECT.form_code)
				: null
			this.models.title = this.AGENCY_GET_HOUSEWARMING_SELECT.title || null
			this.models.description = this.AGENCY_GET_HOUSEWARMING_SELECT.description || null
			this.models.tagsModel = []

			if (this.AGENCY_GET_HOUSEWARMING_SELECT.tags.length > 0) {
				this.AGENCY_GET_HOUSEWARMING_SELECT.tags.forEach(element => {
					let item = {
						group: {
							text: null,
						},
						tag: {
							text: null,
							value: null,
						},
					}
					item.group.text = element.tag_value.split('_')[0]
					item.tag.text = element.tag_value.split('_')[1]
					item.tag.value = element.tag_id
					this.models.tagsModel.push(item)
				})
			}

			this.origin = JSON.parse(JSON.stringify(this.models))

			console.log('models', this.models)
		},
		async getTagItems() {
			if (this.ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS.length === 0)
				await this.ADMIN_ACT_PRODUCT_TAG_ITEMS({ method: 'getGroupItems', params: {} })
			if (this.ADMIN_GET_PRODUCT_TAG_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_TAG_ITEMS({ method: 'getItems' })

			// 첫번째 값 기본 선택
			this.tagInputGroupSelect = {
				text: this.ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS[0].text,
				value: this.ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS[0].code,
			}
		},
		async getPublicCode() {
			// 평형코드
			this.spaciousCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '902' })
			// 가족형태코드
			this.familytypeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '903' })
			// 스타일코드
			this.styleCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '904' })
			// 톤코드
			this.toneCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '905' })
			// 제품특성코드
			this.featureCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '907' })
			// 형태코드 가져오기
			this.formCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '908' })
		},
		async postApi() {
			await this.kakao_post_api_call(res => {
				// console.log('postApi', res)
				this.models.address1 = res.address
				this.models.zipcode = res.post
				this.getLanLng(res)
			})
		},
		async getLanLng(res) {
			this.kakao_map_search_address_model = res.address.split('(')[0]
			await this.kakao_map_search_places_lanlng('search', res => {
				// console.log('getLanLng', res)
				this.models.latitude = res[0].y
				this.models.longitude = res[0].x
			})
		},
		contentSave(content) {
			this.models.description = content
			console.log('contentSave', content)
		},
		cancelRegister() {
			this.registerCheck ? (this.confirm = true) : this.$router.go(-1)
		},
		confirmSubmit() {
			this.confirm = false
			this.$router.go(-1)
		},

		// tag
		registerTags() {
			if (this.models.tagsModel.length < 5) {
				// 등록된 tag 체크
				const check = this.models.tagsModel.some(item => item.tag.value === this.tagInputItemSelect.value)
				if (check) return this.$toastr.error('이미 등록된 tag입니다.', 'tag등록 오류', { timeOut: 2500 })

				// tag등록
				const item = {
					group: this.tagInputGroupSelect,
					tag: this.tagInputItemSelect,
				}
				this.models.tagsModel.push(item)
				this.tagInputItemSelect = null
			} else {
				this.$toastr.error('5개 이상 등록 불가능합니다.', 'tag등록 오류', { timeOut: 2500 })
			}
		},
		remove(item) {
			this.models.tagsModel.splice(this.models.tagsModel.indexOf(item), 1)
			this.models.tagsModel = [...this.models.tagsModel]
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				corporate_no: this.AUTH_GET_USER.corporate_no, // 사업자 등록번호

				image: this.models.image, // 대표이미지

				spacious_code: this.models.spacious_code?.code || null, // 평형코드
				tone_code: this.models.tone_code?.code || null, // 톤 코드
				familytype_code: this.models.familytype_code?.code || null, // 가족형태 코드
				style_code: this.models.style_code?.code || null, // 스타일 코드
				feature_code: this.models.feature_code?.code || null, // 제품특성 코드
				form_code: this.models.form_code?.code || null, // 형태 코드

				zipcode: this.models.zipcode, // 우편번호
				address1: this.models.address1, // 주소
				latitude: this.models.latitude, // 위도
				longitude: this.models.longitude, // 경도

				title: this.models.title, // 제목
				description: this.models.description, // 내용

				pattern_code: this.models.patternModel.pattern_code, // 패턴 코드

				regi_userid: this.AUTH_GET_USER.login_id, // 등록자ID
			}

			if (this.getQuery === 'modify') {
				// 수정
				params.exphw_id = this.AGENCY_GET_HOUSEWARMING_SELECT.exphw_id

				// image 수정 > 필수값이므로 수정만 제공
				if (this.models.image === this.AGENCY_GET_HOUSEWARMING_SELECT.image_url) {
					// 변경사항 없을경우 image 항목 삭제
					delete params['image']
				} else {
					params.image = this.models.image
					params.image_url = this.AGENCY_GET_HOUSEWARMING_SELECT.image_url
				}

				// description 수정
				if (this.models.description === this.AGENCY_GET_HOUSEWARMING_SELECT.description) {
					// 변경사항 없을경우 description 항목 삭제
					delete params['description']
				}
			}

			// tags
			if (this.models.tagsModel !== [] && this.models.tagsModel?.length > 0) {
				this.models.tagsModel.forEach((element, i) => {
					params[`tag${i + 1}`] = element.tag.value
				})
			}

			console.log('params', params)
			const items = { method: this.getQuery === 'modify' ? 'put' : 'post', params: params }

			try {
				await this.AGENCY_ACT_HOUSEWARMING(items).then(res => {
					if (res) {
						this.loading = false
						this.resetData()
						this.$router.go(-1)
					}
				})
			} catch (e) {
				console.log('AGENCY_ACT_HOUSEWARMING', e)
				this.loading = false
			}
		},
		resetData() {
			this.models = {
				zipcode: null,
				address1: null,
				latitude: null,
				longitude: null,

				patternModel: null,
				image: null,
				spacious_code: null,
				familytype_code: null,
				style_code: null,
				tone_code: null,
				feature_code: null,
				form_code: null,

				title: null,
				description: null,

				tagsModel: [],
			}

			this.partModel = null
			this.kindModel = null
			this.brandModel = null
			this.productModel = null
			this.patternModel = null
		},
	},
}
</script>

<style scoped lang="scss">
.panel {
	border-radius: 0 !important;
	.v-expansion-panel-header {
		border-bottom: 1px solid #262626;
		span {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 18px;
		}
		:deep(.v-expansion-panel-header__icon) {
			.v-icon::before {
				font-size: 30px;
				font-weight: 500;
			}
		}
	}
	:deep(.v-expansion-panel-content__wrap) {
		padding: 0;
	}
}
:deep(.v-expansion-panel::before) {
	box-shadow: none !important;
}
:deep(.v-expansion-panel:not(:first-child)::after) {
	border-top: none !important;
}

.guide_bg {
	background-color: #f8f8f8;
	.tit {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 15px !important;
		line-height: 25px;
		color: #262626;
		.theme--light.v-icon {
			color: #fa2a6f;
		}
	}
	.desc {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px !important;
		color: #7f7f7f;
		word-break: keep-all;
	}
	ul {
		padding: 20px !important;
		background-color: #fff;
		border-radius: 8px;
		li {
			position: relative;
			padding-left: 10px;
			text-align: left;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 12px !important;
			color: #7f7f7f;
			word-break: keep-all;
			list-style: none !important;
			&:before {
				display: block;
				content: '-';
				position: absolute;
				left: 0;
				top: 2px;
			}
		}
	}
}

.store_info {
	padding: 18px 26px !important;
	background-color: #f8f8f8;
	border-radius: 8px;
	.store_logo {
		height: 45px;
	}
	.store_name {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 18px !important;
		color: #262626;
	}
	.store_adress {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 13px !important;
		color: #777;
	}
	.ceo,
	.tel {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 13px !important;
		color: #777;
	}
	.name,
	.num {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 13px !important;
		color: #262626;
	}
}

.notice {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 12px !important;
	color: #777;
	word-break: keep-all;
}

.house_register {
	margin-top: 70px;
	.require {
		color: #fa2a6f;
	}
	.tag_option {
		min-width: 40px !important;
		width: 40px !important;
		height: 40px !important;
		border-radius: 10px !important;
		border: 1px solid #7f7f7f;
		background-color: #fff !important;
	}
}

.photo_zone {
	background-color: #f8f8f8;
	border: 1px solid #ccc;
	p {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		color: #262626;
		word-break: keep-all;
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.guide_bg {
		.tit {
			font-size: 14px !important;
		}
		.desc {
			font-size: 11px !important;
		}
		ul {
			padding: 16px !important;
		}
	}
	.store_info {
		padding: 10px 10px !important;
		.store_name {
			font-size: 14px !important;
		}
	}
	.house_register {
		margin-top: 30px;
	}
}
@media all and (max-width: 380px) {
	.guide_bg {
		.tit {
			font-size: 14px !important;
		}
		.desc {
			font-size: 11px !important;
		}
		ul {
			padding: 16px !important;
		}
	}
	.store_info {
		padding: 10px 10px !important;
		.store_name {
			font-size: 14px !important;
		}
	}
}
</style>
