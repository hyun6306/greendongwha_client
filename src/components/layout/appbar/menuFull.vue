<template>
	<v-row>
		<v-col
			v-for="(menu, i) in menus"
			:key="i"
		>
			<v-btn
				text
				:to="menu.to"
				@mousemove="overMouse(i)"
			>
				{{ menu.title }}
			</v-btn>
		</v-col>
		<v-expand-transition>
			<div
				v-if="topMenu && expendMenus.subMenu"
				class="top_menu"
				@mouseleave="topMenu = false"
			>
				<v-container class="pa-0">
					<v-col
						cols="12"
						lg="11"
						xl="10"
						class="pa-0"
					>
						<div class="menu_left_align">
							<v-col
								v-for="(subMenu, i) in expendMenus.subMenu"
								:key="i"
							>
								<v-btn
									color="primary"
									text
									:to="subMenu.to"
								>
									{{ subMenu.title }}
								</v-btn>
							</v-col>
						</div>
					</v-col>
				</v-container>
			</div>
		</v-expand-transition>
	</v-row>
</template>

<script>
export default {
	name: 'MenuFull',
	components: {},
	props: {
		menus: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		topMenu: false,
		openIndex: null,
		expendMenus: null,
	}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		overMouse(index) {
			if (this.openIndex == null) this.openIndex = index
			if (this.openIndex != index) {
				this.topMenu = false
				this.openIndex = null
			} else {
				this.topMenu = true
				this.openIndex = index
				this.expendMenus = this.menus[this.openIndex]
			}
		},
	},
}
</script>

<style scoped lang="scss">
.top_menu {
	width: 100%;
	height: 300px;
	left: 0;
	top: 65px;
	position: absolute;
	background: white;
	color: #414141;
	border-bottom: 1px solid #ededed;
	box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
}
.menu_left_align {
	margin-left: 280px;
}
</style>
