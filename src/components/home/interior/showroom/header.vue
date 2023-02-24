<template>
	<!-- 제목 -->
	<v-row class="ma-0">
		<v-col
			cols="12"
			class="header"
		>
			<v-row class="px-5 px-md-0 ma-0 mb-0 mb-md-3">
				<v-col
					cols="8"
					sm="9"
					md="10"
					class="pa-0 title"
					align="start"
					align-self="center"
				>
					{{ items.title }}
				</v-col>
				<v-col
					cols="4"
					sm="3"
					md="2"
					class="pa-0"
					align="end"
				>
					<v-btn
						v-if="AUTH_GET_USER_AUTH !== 'AGENCY'"
						class="pa-0"
						@click="scrap_call"
					>
						<v-icon v-if="scrap_check === 'post'">mdi-bookmark-outline</v-icon>
						<v-icon v-else>mdi-bookmark</v-icon>
					</v-btn>
					<CommonMenuMenu01
						:icon="'mdi-share-variant-outline'"
						:items="share_shareItems"
						@submit="onShare"
					/>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'
import scrap from '@/mixins/scrap'
import share from '@/mixins/share'

export default {
	name: 'ShowRoomHeader',
	mixins: [common, scrap, share],
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	watch: {
		items() {
			// 스크랩 카운트
			this.scrap_detail_count = this.items.scrap_cnt
		},
	},
	mounted() {},
	destroyed() {},
	methods: {
		onShare(item) {
			console.log('onShare', this.items)
			console.log('onShare', this.items.hw_id !== undefined)
			console.log('onShare', this.items.hw_id !== undefined)
			// const link = this.items.hw_id !== undefined? `${process.env.VUE_APP_BASIC_SERVER}/housewarming/3d`: `${process.env.VUE_APP_BASIC_SERVER}/housewarming/specialist`
			const productItem = {
				title: this.items.title,
				description: '집들이',
				image: this.items.image,
				url: null,
			}
			this.share_operator(item, productItem)
		},
	},
}
</script>

<style scoped lang="scss">
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

.header {
	padding: 0 10px;
	// border-top:2px solid #262626;
	// border-bottom:1px solid #ccc;
	.title {
		@include ellipsis_2;
		margin-bottom: 12px;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 24px !important;
		color: #262626;
		word-break: keep-all;
	}
	.v-btn {
		box-shadow: none !important;
		min-width: 40px !important;
		height: 40px !important;
		padding: 0 !important;
		background-color: #fff !important;
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
	.content_info {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 16px !important;
		color: #a0a1a5;
		.tal,
		.tar {
			width: 50%;
		}
		.scrap,
		.count {
			position: relative;
			padding: 0 10px;
			&:after {
				display: block;
				width: 1px;
				height: 14px;
				position: absolute;
				top: 6px;
				right: 0;
				background-color: #a0a1a5 !important;
				content: '';
			}
			strong {
				color: #262626;
			}
		}
		.date {
			padding-left: 10px;
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.body {
		.event_clear {
			height: 90px;
			margin-bottom: 30px;
		}
	}
	.board_list {
		.row {
			padding: 10px 0;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.header {
		padding: 0 !important;
		.title {
			font-size: 20px !important;
		}
		.content_info {
			font-size: 14px !important;
			.tal,
			.tar {
				width: 100%;
			}
			.tar {
				margin-left: -10px !important;
				text-align: left !important;
			}
		}
	}
	.body {
		padding: 32px 0 !important;
		.event_clear {
			height: 75px;
			margin-bottom: 20px;
		}
		span {
			font-size: 15px;
		}
	}
	.notice {
		padding-left: 0 !important;
		.title {
			margin-bottom: 14px;
			font-size: 16px !important;
		}
		ul {
			padding: 0;
			li {
				font-size: 14px !important;
			}
		}
	}
	.board_list {
		.row {
			padding: 10px 0;
		}
	}
}
@media all and (max-width: 380px) {
	.header {
		padding: 0 !important;
		.title {
			font-size: 20px !important;
		}
		.content_info {
			font-size: 14px !important;
			.tal,
			.tar {
				width: 100%;
			}
			.tar {
				margin-left: -10px !important;
				text-align: left !important;
			}
		}
	}
	.body {
		padding: 20px 0 !important;
		.event_clear {
			height: 75px;
			margin-bottom: 20px;
		}
		span {
			font-size: 15px;
		}
	}
	.notice {
		padding-left: 0 !important;
		.title {
			margin-bottom: 14px;
			font-size: 16px !important;
		}
		ul {
			padding: 0;
			li {
				font-size: 14px !important;
			}
		}
	}
	.board_list {
		.row {
			padding: 10px 0;
		}
	}
}
</style>
