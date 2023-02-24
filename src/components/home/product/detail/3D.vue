<template>
	<v-col
		cols="12"
		class="pa-0 mt-10 mb-6 houses click_3d_button"
	>
		<span>더욱 생생하게 보고싶으신가요?</span>
		<p>아래 이미지를 클릭하여<br /><span class="color_olive">3D</span> 집들이를 떠나보세요!</p>
		<v-img
			width="100%"
			max-height="458"
			:src="imageItem"
			eager
			class="img_3d clickCursor"
			@click="pushLink"
		>
			<div class="img_3d_bg" />
			<div class="btn_3d">
				<v-img
					width="248"
					:src="require('@/assets/img/product/img_btn_3d.webp')"
					eager
				/>
			</div>
		</v-img>
		<v-col
			class="notice pa-0 mt-2"
			align="center"
		>
			*인터넷 익스플로러 호환이 원활하지 않아, 다른 브라우저(크롬, 웨일 등) 사용을 권장합니다.
		</v-col>
	</v-col>
</template>

<script>
import common from '@/mixins/common'
import ad_kakao from '@/mixins/ad/kakao'
import ad_mobion from '@/mixins/ad/mobion'

export default {
	name: 'HomeProductDetail3D',
	components: {},
	mixins: [common, ad_kakao, ad_mobion],
	props: ['items', 'image', 'link'],
	data: () => ({}),
	computed: {
		imageItem() {
			return this.image ? this.image : require('@/assets/img/product/img_3d.jpg')
		},
		getPageId() {
			return this.$route.params.id || null
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		pushLink() {
			// google analytics
			window.gtag('event', 'click_3d_button', { button_location: `3d_detail_${this.getPageId}` })
			// ad_kakao click
			this.ad_kakao_clickScript(this.getPageId, 'click_3d_button')
			// ad_mobion click
			this.ad_mobion_click_convertion('click_3d_button')

			if (this.link === undefined) return
			// 새창 열기
			// let route = this.$router.resolve(`/3d/coohome?url=${this.link}`)
			// window.open(route.href, '_blank')
			this.$router.push(`/3d/coohome?url=${this.link}`)
		},
	},
}
</script>
<style scoped lang="scss">
.houses {
	padding: 35px 190px !important;
	position: relative;
	background-color: #f5f5f5;
	border-radius: 10px;
	span {
		font-family: 'NotoSansKR-Light' !important;
		font-size: 18px !important;
	}
	p {
		margin-top: 16px;
		font-family: 'NotoSansKR-Bold' !important;
		line-height: 1.2 !important;
		font-size: 30px !important;
		span {
			font-family: 'NotoSansKR-Bold' !important;
			line-height: 1.2 !important;
			font-size: 30px !important;
		}
	}
	.v-image {
		margin-top: 30px;
	}
	.btn_3d {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		&:hover {
			opacity: 0.9;
		}
	}
	.img_3d {
		&:hover {
			.img_3d_bg {
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.3;
			}
		}
	}
	.notice {
		font-family: 'NotoSansKR-Light' !important;
		font-size: 14px !important;
		color: #777 !important;
	}
}
@media all and (min-width: 600px) and (max-width: 960px) {
	.houses {
		padding: 40px !important;
		span {
			font-size: 12px !important;
		}
		p {
			margin-top: 10px;
			font-size: 16px !important;
			span {
				font-size: 16px !important;
			}
		}
		.v-image {
			margin-top: 20px;
		}
		.notice {
			display: none !important;
		}
	}
}
@media all and (max-width: 600px) {
	.houses {
		padding: 28px 15px !important;
		span {
			font-size: 12px !important;
		}
		p {
			margin-top: 10px;
			font-size: 16px !important;
			span {
				font-size: 16px !important;
			}
		}
		.v-image {
			margin-top: 20px;
		}
		.btn_3d {
			width: 180px !important;
		}
		.notice {
			display: none !important;
		}
	}
}
</style>
