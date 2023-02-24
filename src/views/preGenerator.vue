<template>
	<v-container>
		<v-col
			cols="12"
			class="pa-0 pt-6 pl-3 pr-3 mb-5"
			align="center"
		>
			<h3 class="pb-5">prerender파일을 생성 > src/prerender경로에 붙여 넣기 > yarn build 후 배포</h3>
			<CommonButtonsButton02
				name="PreRender list 생성하기"
				color="#23b76d"
				@click="generator"
			/>
		</v-col>
		<div class="pa-5">
			<v-col
				v-for="(item, i) in recentList"
				:key="i"
			>
				<p>{{ item.name }}</p>
			</v-col>
		</div>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'PreRenderGenerator',
	data: () => ({
		saveList: [
			{
				id: 'hw_id',
				api: 'HOME_ACT_HOUSEWARMING_HOUSE_3D',
				name: 'housewarming_3d.json',
				path: '/housewarming/3d/detail/',
				params: { method: 'getList', params: {} },
			},
			{
				id: 'exphw_id',
				api: 'HOME_ACT_HOUSEWARMING_SPECIAL',
				name: 'housewarming_specialist.json',
				path: '/housewarming/specialist/detail/',
				params: { method: 'getList', params: {} },
			},
			{
				id: 'id',
				api: 'HOME_ACT_TOTAL_PRODUCT_ITEMS',
				name: 'product.json',
				path: '/product/detail/',
				params: {},
			},
			{
				id: 'knowhow_id',
				api: 'HOME_ACT_COMMUNITY_KNOW_HOW',
				name: 'community_knowHow.json',
				path: '/community/knowHow/detail/',
				params: { method: 'getList' },
			},
			{
				id: 'event_id',
				api: 'HOME_ACT_COMMUNITY_EVENT',
				name: 'community_event.json',
				path: '/community/event/detail/',
				params: { method: 'getList', params: { event_id: '', current_status: '' } },
			},
		],
		recentList: [],
	}),
	computed: {},
	created() {},
	mounted() {
		this.importAll(require.context('@/prerender', true, /\.json$/))
	},
	methods: {
		...mapActions([
			'HOME_ACT_HOUSEWARMING_HOUSE_3D',
			'HOME_ACT_HOUSEWARMING_SPECIAL',
			'HOME_ACT_TOTAL_PRODUCT_ITEMS',
			'HOME_ACT_COMMUNITY_KNOW_HOW',
			'HOME_ACT_COMMUNITY_EVENT',
		]),
		importAll(r) {
			r.keys().forEach(key => {
				console.log('import', key)
				this.recentList.push({ name: key })
			})
		},
		async generator() {
			for (let i of this.saveList) {
				const listItems = await this[i.api](i.params)
				let urls = []
				if (listItems) {
					listItems.forEach(item => {
						urls.push(`${i.path}${item[i.id]}`)
					})
					const element = document.createElement('a')
					element.setAttribute('href', 'data:text/json;charset=utf-8, ' + encodeURIComponent(JSON.stringify(urls)))
					element.setAttribute('download', i.name)
					document.body.appendChild(element)
					element.click()
					element.remove()
				}
			}
		},
	},
}
</script>
<style scoped lang="scss"></style>
