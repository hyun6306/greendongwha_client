<template>
	<div class="d-flex pa-5 store_list">
		<span>
			<v-img
				:src="item.company_picurl"
				class="store_view"
				eager
				contain
			>
				<v-row
					v-if="!item.is_img"
					class="ma-0 pl-3 pl-md-4 fill-height"
					align="start"
					justify="center"
				>
					<p class="store_title">
						{{ item.business_name }}
					</p>
				</v-row>
			</v-img>
		</span>
		<div class="ml-2 ml-md-5">
			<div class="d-flex mb-3">
				<!--                <span v-if="item.company_logourl">
                    <v-img
                        :src="item.company_logourl"
                        class="store_logo"
                        eager
						contain
                    />
                </span>-->
				<p
					v-if="item.business_name"
					class="ml-1 store_name"
				>
					{{ item.business_name }}
				</p>
			</div>
			<div
				v-if="item.company_addr1"
				class="mb-2 address"
			>
				{{ item.company_addr1 }} {{ item.company_addr2 }}
			</div>
			<div class="explain">
				<table v-if="!housewarmingCheck">
					<tr v-if="item.boss_name">
						<th>대표자</th>
						<td>{{ item.boss_name }}</td>
					</tr>
					<tr v-if="item.company_tel">
						<th>연락처</th>
						<td>{{ item.company_tel }}</td>
					</tr>
				</table>
				<table v-else>
					<tr v-if="item.cnt_construct">
						<th>시공사례</th>
						<td>{{ item.cnt_construct }}건</td>
					</tr>
					<tr v-if="item.buildItems">
						<th>시공범위</th>
						<td>
							<span
								v-for="(build, i) in item.buildItems"
								:key="i"
								class="text_array"
							>
								{{ build }}</span
							>
						</td>
					</tr>
				</table>
			</div>
			<div
				v-if="housewarmingCheck"
				class="d-flex mt-3"
				align="center"
			>
				<CommonButtonsButton02
					name="상세보기"
					outlined
					class-name="btn_small"
					color="#262626"
					class="mr-1"
					:to="`/interior/store/detail/${item.corporate_no}`"
				/>
				<CommonButtonsButton02
					v-if="item.corporate_no !== '1378102333'"
					name="견적상담 의뢰"
					class-name="btn_small"
					color="#42883d"
					class="mr-1"
					@click="goToInquire"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'CommonCardMenuStore',
	mixins: [common],
	props: ['item'],
	data: () => ({}),
	computed: {
		housewarmingCheck() {
			let check = true
			if (this.common_recentlyRouterPath.includes('housewarming')) {
				check = false
			}
			return check
		},
	},
	watch: {},
	mounted() {
		console.log('check', this.item)
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_INTERIOR']),
		goToInquire() {
			this.HOME_MU_INTERIOR_SELECT_INTERIOR(this.item)
			this.$router.push('/interior/price/inquire').catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
.list_board {
	border: 1px solid #ccc;
	height: 642px;
	overflow-y: scroll;
}
.store_title {
	font-family: 'NotoSansKR-bold';
	font-size: 1rem;
	color: white;
	width: 80%;

	// ...처리
	overflow: hidden;
	text-overflow: ellipsis;

	/* 여러 줄 자르기 추가 스타일 */
	white-space: normal;
	line-height: 1.2;
	height: 2.3em;
	word-break: keep-all;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.store_list {
	border-top: 1px solid #ccc;
	.v-btn {
		width: 90px !important;
	}

	.store_view {
		width: 100px !important;
		height: 100px !important;
	}
	.store_logo {
		width: 60px !important;
		height: 24px !important;
	}
	.store_name {
		font-family: 'NotoSansKR-Regular';
		font-size: 16px;
	}
	.address {
		text-align: left !important;
		font-family: 'NotoSansKR-Regular';
		font-size: 13px;
		color: #5f6062;
	}
	.explain {
		table {
			width: 100% !important;
			tr {
				th {
					width: 50px;
					vertical-align: top;
					text-align: left;
					position: relative;
					padding-right: 5px;
					font-family: 'NotoSansKR-Regular';
					font-size: 12px;
					font-weight: 500;
					color: #5f6062;
					&:after {
						display: block;
						position: absolute;
						top: 5px;
						right: 0px;
						width: 1px;
						height: 12px;
						background-color: #ccc;
						content: '';
					}
				}
				td {
					padding-left: 5px;
					font-family: 'NotoSansKR-Regular';
					font-size: 12px;
					color: #000;
					word-break: keep-all;
				}
			}
		}
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
}
@media all and (max-width: 600px) {
	.store_list {
		.store_view {
			width: 80px !important;
			height: 80px !important;
		}
		.store_name {
			font-family: 'NotoSansKR-Regular';
			font-size: 14px;
		}
	}
	.store_title {
		font-size: 0.8rem;
	}
}
</style>
