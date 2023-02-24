<template>
	<v-menu
		offset-y
		open-on-hover
		open-on-click
		class="pa-0"
		tile
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				text
				v-bind="attrs"
				:height="buttonHeight"
				width="100"
				v-on="on"
				@click="goPush"
			>
				<p class="menu_btn">{{ menu.title }}</p>
			</v-btn>
		</template>
		<v-list
			v-show="menu.subMenu"
			class="pa-0 py-1"
		>
			<div class="px-1">
				<v-list-item
					v-for="(sub, i) in menu.subMenu"
					:key="i"
					:to="sub.to"
				>
					<p class="menu_title">{{ sub.title }}</p>
				</v-list-item>
			</div>
		</v-list>
	</v-menu>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'Menu',
	mixins: [common],
	props: {
		menu: {
			type: Object,
			default: () => {},
		},
		buttonHeight: {
			type: Number,
			default: 80,
		},
	},
	methods: {
		goPush() {
			// console.log('common_recentlyRouterPath', this.common_recentlyRouterPath, this.menu.subMenu[0].to)
			if (this.common_recentlyRouterPath === this.menu.subMenu[0].to) return
			this.$router.push(this.menu.subMenu[0].to)
		},
	},
}
</script>

<style scoped lang="scss">
.menu_btn {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 16px !important;
	color: #040000 !important;
}
</style>
