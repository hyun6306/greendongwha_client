<template>
	<v-col
		cols="12"
		class="pa-0 px-5 px-md-0 layout_align"
	>
		<v-row class="store_info ma-0 mt-10 pa-3 pa-sm-5">
			<v-col
				cols="8"
				class="pa-0"
				align-self="center"
			>
				<v-row class="ma-0">
					<v-col
						v-if="items.company_logourl"
						cols="4"
						md="2"
						class="pa-0"
					>
						<v-img
							:src="items.company_logourl"
							class="store_logo"
							width="100%"
							contain
						/>
					</v-col>
					<v-col
						cols="7"
						md="9"
						class="pa-0 pl-3"
						align-self="center"
					>
						<p class="store_name">{{ items.business_name }}</p>
						<p class="ceo_name">
							<span class="ceo">대표자</span>
							<span class="name">{{ items.boss_name }}</span>
						</p>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="4"
				class="pa-0"
				align-self="center"
			>
				<v-col
					cols="12"
					class="pa-0 btn_area"
					align="end"
				>
					<CommonMenuMenu01
						:icon="'mdi-share-variant-outline'"
						:items="share_shareItems"
						class="link"
						@submit="onShare"
					/>
					<v-btn
						v-if="AUTH_GET_USER_AUTH !== 'AGENCY'"
						class="pa-0"
						@click="scrap_call"
					>
						<v-icon>mdi-bookmark-outline</v-icon>
					</v-btn>
				</v-col>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import share from '@/mixins/share'
import scrap from '@/mixins/scrap'

export default {
	mixins: [share, scrap],
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	created() {},
	mounted() {},
	destroyed() {},
	methods: {
		onShare(item) {
			const productItem = {
				title: this.items.business_name,
				description: '인테리어점',
				image: this.items.company_picurl,
			}
			this.share_operator(item, productItem)
		},
	},
}
</script>

<style scoped lang="scss">
.store_info {
	width: 100%;
	height: 100px;
	border-radius: 8px;
	background-color: #eee;

	.store_logo {
		height: 64px;
	}

	.store_name {
		font-family: 'NotoSansKR-Regular';
		font-size: 24px;
		line-height: 1.3;
	}
	.ceo_name {
		font-family: 'NotoSansKR-Regular';
		font-size: 14px;
		color: #5f6062;
		.ceo {
			position: relative;
			padding-right: 5px;
			&:after {
				display: block;
				width: 1px;
				height: 13px;
				background-color: #5f6062;
				position: absolute;
				top: 5px;
				right: 0;
				content: '';
			}
		}
		.name {
			color: #000 !important;
			padding-left: 5px;
		}
	}

	.btn_area {
		position: relative;
		.v-btn {
			box-shadow: none !important;
			min-width: 40px !important;
			height: 40px !important;
			padding: 0 !important;
			background-color: #eee !important;
			.v-icon {
				color: #414141 !important;
			}
			&:hover {
				color: #fff !important;
				background-color: #42883d !important;
				.v-icon {
					color: #fff !important;
				}
			}
		}
	}
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.store_info {
		height: 90px !important;
		.store_logo {
			height: 50px;
		}
		.store_name {
			font-size: 14px;
		}
		.ceo_name {
			font-size: 12px;
		}
	}
}
@media all and (max-width: 380px) {
	.store_info {
		height: 90px !important;
		.store_logo {
			height: 40px;
		}
		.store_name {
			font-size: 14px;
		}
		.ceo_name {
			font-size: 12px;
		}
	}
}
</style>
