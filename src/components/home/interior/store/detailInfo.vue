<template>
	<div class="product_info mb-0 mb-md-9">
		<v-col
			cols="12"
			class="table_type01 pa-0"
		>
			<v-row
				v-if="items.company_addr1"
				class="ma-0"
			>
				<v-col
					cols="4"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					주소
				</v-col>
				<v-col
					cols="8"
					sm="10"
					class="td"
					align="start"
				>
					{{ items.company_addr1 }}<v-icon medium>place</v-icon>
				</v-col>
			</v-row>
			<v-row
				v-if="items.company_tel"
				class="ma-0"
			>
				<v-col
					cols="4"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					전화번호
				</v-col>
				<v-col
					v-if="items.company_tel"
					cols="8"
					sm="10"
					class="td clickCursor"
					align="start"
					@click="common_phoneCall(items.company_tel)"
				>
					{{ common_number_filter(items.company_tel) }}
					<v-icon size="20">mdi-cellphone</v-icon>
				</v-col>
			</v-row>
			<v-row
				v-if="items.company_estdate"
				class="ma-0"
			>
				<v-col
					cols="4"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					설립연도
				</v-col>
				<v-col
					cols="8"
					sm="10"
					class="td"
					align="start"
				>
					{{ items.company_estdate.substring(0, 4) }}년 {{ items.company_estdate.substring(4, 6) }}월
				</v-col>
			</v-row>
			<v-row
				v-if="items.buildItems"
				class="ma-0"
			>
				<v-col
					cols="4"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					시공범위
				</v-col>
				<v-col
					cols="8"
					sm="10"
					class="td"
					align="start"
				>
					<span
						v-for="(build, i) in items.buildItems"
						:key="i"
						class="text_array"
					>
						{{ build }}
					</span>
				</v-col>
			</v-row>
			<v-row
				v-if="icons.length"
				class="ma-0"
			>
				<v-col
					cols="4"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					SNS
				</v-col>
				<v-col
					cols="8"
					sm="10"
					class="td sns"
					align="start"
				>
					<CommonButtonsButtonIcon
						v-for="(icon, i) in icons"
						:key="i"
						:src="icon.src"
						target="_blank"
						class="mr-2"
						@click="common_onLink(icon.link)"
					/>
				</v-col>
			</v-row>
			<v-row
				v-if="items.homepage_url"
				class="ma-0"
			>
				<v-col
					cols="4"
					sm="2"
					class="th bc_gr th_bt fw_bold"
				>
					홈페이지
				</v-col>
				<v-col
					cols="8"
					sm="10"
					class="td"
					align="start"
					@click="common_onLink(items.homepage_url)"
				>
					<span class="homepage clickCursor">{{ items.homepage_url }}</span>
				</v-col>
			</v-row>
		</v-col>
	</div>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HomeInteriorDetailInfo',
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {
		icons() {
			return this.createSocialIcon()
		},
	},
	created() {},
	mounted() {},
	destroyed() {},
	methods: {
		createSocialIcon() {
			let iconItems = []
			let socialGroup = []

			// snscode 데이터 filter
			Object.keys(this.items).forEach(item => {
				if (item.includes('snscode') && this.items[item].length) {
					socialGroup.push({
						title: item,
						value: this.items[item],
					})
				}
			})

			// filter된 snscode 데이터 가공
			socialGroup.forEach(element => {
				iconItems.push(this.checkSocial(element))
			})

			return iconItems
		},
		checkSocial(social) {
			let data = {
				src: null,
				link: null,
			}
			switch (social.title) {
				case 'company_snscode1':
					data = {
						src: require('@/assets/img/home/interior/icon_instagram.svg'),
						link: social.value,
					}
					break
				case 'company_snscode2':
					data = {
						src: require('@/assets/img/home/interior/icon_naver.svg'),
						link: social.value,
					}
					break
				case 'company_snscode3':
					data = {
						src: require('@/assets/img/home/interior/icon_facebook.svg'),
						link: social.value,
					}
					break
				case 'company_snscode4':
					data = {
						src: require('@/assets/img/home/interior/icon_youtube.svg'),
						link: social.value,
					}
					break
			}

			return data
		},
	},
}
</script>

<style scoped lang="scss">
.sns {
	.v-btn--icon.v-size--default {
		width: 26px !important;
	}
	.v-btn {
		:deep(.v-btn__content) {
			width: 26px !important;
		}
	}
}
.homepage {
	border-bottom: 1px solid #000;
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
}
@media all and (max-width: 380px) {
}
</style>
