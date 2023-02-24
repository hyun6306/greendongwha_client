<template>
	<div class="wrapper">
		<v-container fluid>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<h2 class="content_title">{{ common_title }}</h2>
			</v-col>

			<!-- 전시장찾기 검색 필터 -->
			<HomeInteriorShowroomFilter
				v-model="selectItems"
				:product-items="addDisplayItems"
				@search="searchKeyword"
			/>

			<!-- 전시장 리스트 -->
			<v-col
				class="pa-0"
				cols="12"
			>
				<v-row class="ma-0">
					<v-col
						class="pa-0 mb-5"
						cols="6"
						align="start"
					>
						전체 <strong> {{ filterItems.length || 0 }} </strong>개
					</v-col>
					<v-col
						class="pa-0 mb-5"
						cols="6"
						align="end"
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
					</v-col>
				</v-row>
				<div class="card_align">
					<div
						v-for="(item, i) in filterItems"
						:key="i"
					>
						<HomeInteriorShowroomCardShowroom
							:items="item"
							@click="onClickPushLink"
						/>
					</div>
				</div>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import geolocation from '@/mixins/geolocation'

export default {
	name: 'HomeInteriorShowRoom',
	metaInfo: {
		title: '동화 쇼룸 찾기 ㅣ 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '동화 쇼룸 찾기 ㅣ 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화 쇼룸 찾기, 전시장 찾기',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '우리집에서 가까운 동화 쇼룸이 어디있을까?',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/interior/showRoom`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common, geolocation],
	data: () => ({
		selectItems: [],
		loading: false,
		addDisplayItems: [],
		searchWords: '',
	}),
	computed: {
		...mapGetters(['HOME_GET_INTERIOR_SHOW_ROOM']),
		filterItems() {
			let items = []
			// 취급품목 필터링
			if (this.selectItems.length && this.HOME_GET_INTERIOR_SHOW_ROOM.length) {
				const selectCode = this.selectItems.map(x => {
					return this.addDisplayItems[x].code
				})
				for (let n of selectCode) {
					for (let i of this.HOME_GET_INTERIOR_SHOW_ROOM) {
						const buildTypeCode = i.buildtype.map(x => {
							return x.code
						})
						buildTypeCode.forEach(element => {
							if (element.includes(n)) {
								items.push(i)
							}
						})
					}
				}
				let set = new Set(items)
				items = [...set]
			} else {
				items = this.HOME_GET_INTERIOR_SHOW_ROOM
			}

			// keyword 검색
			if (this.searchWords?.length) {
				let nameItems = items.filter(item => item.showroom_name.toLowerCase().includes(this.searchWords.toLowerCase()))
				let addrItems = items.filter(item => item.address.toLowerCase().includes(this.searchWords.toLowerCase()))
				let set = new Set([...nameItems, ...addrItems])
				items = [...set]
			}

			return items
		},
	},
	watch: {
		geolocation_status(val) {
			if (val === 0) {
				this.$toastr.info('회원님의 위치정보를 통해 가까운 위치의 쇼룸으로 재검색하였습니다.', '동화쇼룸 검색', {
					timeOut: 2500,
				})
				this.searchItems()
			}
		},
	},
	created() {
		this.getPublicCode()
	},
	mounted() {
		if (!this.HOME_GET_INTERIOR_SHOW_ROOM.length) this.searchItems()
	},
	destroyed() {},
	updated() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS', 'HOME_ACT_INTERIOR_SHOW_ROOM']),
		async getPublicCode() {
			// 추가문의 항목
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '302' }).then(res => {
				// 기타 마지막으로 보내기
				let etc = res.findIndex(x => x.code_name === '기타')
				res.push(res[etc])
				res.splice(etc, 1)
				this.addDisplayItems = res.map(x => {
					x.title = x.code_name // title 추가
					return x
				})
			})
		},
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'list', params: params }
			await this.HOME_ACT_INTERIOR_SHOW_ROOM(items).then(res => {
				console.log('HOME_ACT_INTERIOR_SHOW_ROOM', res)
				this.loading = false
			})
		},
		searchItems() {
			const params = {
				showroom_id: '',
				latitude_x: this.geolocation_position.lat,
				longitude_y: this.geolocation_position.lng,
				meter_range: '',
			}
			console.log('search', params)

			this.getList(params)
		},
		searchKeyword(item) {
			this.searchWords = item
			console.log('searchKeyword', item)
		},
		onClickPushLink(link) {
			console.log('link', link)
			this.$router.push(`/interior/showRoom/detail/${link}`).catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss"></style>
