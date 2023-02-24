<template>
	<div class="mb-5 mx-0 mx-lg-3 item">
		<v-col class="pa-0 maru_gram">
			<div class="mb-4 mb-sm-7 category">
				<router-link
					tag="div"
					to="/community/instagram"
					class="mb-3 tit d-flex clickCursor"
				>
					<p class="mr-1">마루스타그램</p>
					<v-img
						:src="require('@/assets/img/community/arrow_gray.svg')"
						max-width="22"
						height="100%"
					/>
				</router-link>

				<span>
					최신 마루 트렌드는 물로 다양한 인테리어 팁과 <br />
					이벤트 소식까지! 최신 소식을 만나고 싶다면?
				</span>
			</div>

			<div class="insta">
				<v-row class="ma-0">
					<v-col
						class="pa-0"
						cols="12"
					>
						<v-row class="ma-0">
							<v-col
								class="pa-0 line_b line_r"
								cols="8"
								:class="showInstagramItems[0].permalink ? 'clickCursor' : ''"
								@click="goInstagram(showInstagramItems[0].permalink)"
							>
								<v-img
									:src="showInstagramItems[0].thumbnail_url"
									height="100%"
								/>
							</v-col>
							<v-col
								class="pa-0"
								cols="4"
							>
								<v-col
									class="pa-0 line_b"
									cols="12"
									:class="showInstagramItems[1].permalink ? 'clickCursor' : ''"
									@click="goInstagram(showInstagramItems[1].permalink)"
								>
									<v-img
										:src="showInstagramItems[1].thumbnail_url"
										height="100%"
									/>
								</v-col>
								<v-col
									class="pa-0 line_b"
									cols="12"
									:class="showInstagramItems[2].permalink ? 'clickCursor' : ''"
									@click="goInstagram(showInstagramItems[2].permalink)"
								>
									<v-img
										:src="showInstagramItems[2].thumbnail_url"
										height="100%"
									/>
								</v-col>
							</v-col>
						</v-row>
					</v-col>
					<v-col
						class="pa-0"
						cols="12"
					>
						<v-row class="ma-0">
							<v-col
								class="pa-0 line_r"
								cols="4"
								:class="showInstagramItems[3].permalink ? 'clickCursor' : ''"
								@click="goInstagram(showInstagramItems[3].permalink)"
							>
								<v-img
									:src="showInstagramItems[3].thumbnail_url"
									height="100%"
								/>
							</v-col>
							<v-col
								class="pa-0 line_r"
								cols="4"
								:class="showInstagramItems[4].permalink ? 'clickCursor' : ''"
								@click="goInstagram(showInstagramItems[4].permalink)"
							>
								<v-img
									:src="showInstagramItems[4].thumbnail_url"
									height="100%"
								/>
							</v-col>
							<v-col
								class="pa-0"
								cols="4"
								:class="showInstagramItems[5].permalink ? 'clickCursor' : ''"
								@click="goInstagram(showInstagramItems[5].permalink)"
							>
								<v-img
									:src="showInstagramItems[5].thumbnail_url"
									height="100%"
								/>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</div>

			<v-col
				class="mt-5 pa-0 py-3 layout_align btn_insta clickCursor"
				cols="10"
				sm="6"
				align="center"
				@click="goInstagram('https://www.instagram.com/green_dongwha/')"
			>
				@green_dongwha
			</v-col>
		</v-col>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'CommunityHomeMaruStargram',
	components: {},
	data: () => ({}),
	computed: {
		...mapGetters(['HOME_GET_COMMUNITY_INSTAGRAM_ITEMS']),
		showInstagramItems() {
			const arr = Array.from({ length: 6 })
			console.log('map', this.HOME_GET_COMMUNITY_INSTAGRAM_ITEMS)
			arr.forEach((_, index) => {
				arr[index] = this.HOME_GET_COMMUNITY_INSTAGRAM_ITEMS[index] ?? {}
			})

			console.log('arr', arr)
			return arr
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		goInstagram(url) {
			if (url) {
				window.open(url, '_blank')
			}
		},
	},
}
</script>

<style scoped lang="scss">
.item {
	background-color: $color_white;
	border-radius: 16px;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	overflow: hidden;

	.category {
		p {
			font-size: $font__sub_tit;
			font-weight: $fw_bold;
			line-height: 1 !important;
		}
		span {
			word-break: keep-all;
			font-size: $font_normal;
			font-weight: $fw_normal;
		}
	}
}

.maru_gram {
	padding: 30px 20px 20px !important;
	.category {
		p {
			color: $color_font;
		}
		span {
			color: $color_gray8;
		}
	}
	.insta {
		margin: 0 -20px !important;
		.line_r {
			border-right: 1px solid $color_white;
		}
		.line_b {
			border-bottom: 1px solid$color_white;
		}
	}
}

.btn_insta {
	background: $color_white;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	border-radius: 99px;
	font-weight: $fw_bold;
	font-size: $font_normal;
	color: #78c046;
}

@media all and (max-width: 1264px) {
	.item {
		border-radius: 0 !important;
	}
	.maru_gram {
		padding: 20px 16px !important;
		.insta {
			margin: 0 -16px !important;
		}
	}
}

@media all and (max-width: 380px) {
	.item {
		.category {
			p {
				font-size: $font_xl !important;
				line-height: 22px !important;
			}
			span {
				font-size: $font_sm !important;
			}
		}
	}
}
</style>
