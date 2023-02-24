<template>
	<v-row
		class="ma-0 fill-height"
		align="center"
	>
		<v-col
			class="pa-0 card_wrapper"
			:class="gridTypeCheck"
			:data-key="menuType"
		>
			<div
				v-for="(menu, n) in cardMenu"
				:key="n"
				class="clickCursor"
			>
				<!-- event -->
				<!-- event -->
				<CommonCardMenuCard06
					v-if="menuType.includes('event')"
					:menu="menu"
					@submit="onClick"
				/>
				<!-- myPage -->
				<!-- user -->
				<UserUserScrapCard
					v-else-if="menuType === 'scrap'"
					:menu="menu"
					@submit="onClick"
				/>
				<UserUserEstimateCard
					v-else-if="menuType === 'estimate'"
					:menu="menu"
					@submit="onClick"
				/>
				<UserUserQualityCard
					v-else-if="menuType === 'quality'"
					:menu="menu"
					@submit="onClick"
				/>
				<UserUserAsCard
					v-else-if="menuType === 'as'"
					:menu="menu"
					@submit="onClick"
				/>

				<!-- agency -->
				<UserAgencyHousewarmingCard
					v-else-if="menuType === 'housewarming'"
					:menu="menu"
					@submit="onClick"
				/>
				<UserAgencyEstimateCard
					v-else-if="menuType === 'agency_estimate'"
					:menu="menu"
					@submit="onClick"
				/>
				<UserAgencyAskCard
					v-else-if="menuType === 'ask'"
					:menu="menu"
					@submit="onClick"
				/>

				<!-- default -->
				<!-- default -->
				<CommonCardMenuCard01
					v-else
					:menu="menu"
					@submit="onClick"
				/>
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'CardMenuGroup02',
	props: ['menuType', 'cardMenu'],
	data: () => ({}),
	computed: {
		gridTypeCheck() {
			let check = ''
			let checkItems = ['scrap', 'estimate', 'quality', 'as', 'housewarming', 'agency_estimate', 'ask']
			for (let i of checkItems) {
				if (i === this.menuType) return 'card_grid'
			}
			return check
		},
	},
	methods: {
		onClick(val) {
			this.$emit('submit', val)
		},
	},
}
</script>

<style scoped lang="scss">
.card_wrapper {
	width: 100% !important;
}
.card_grid {
	display: grid;
	width: 100%;
	padding: 20px 0;
	grid-template-columns: repeat(4, 1fr);
	grid-row-gap: 20px;
	justify-items: center !important;
	align-items: start !important;
}
@media all and (min-width: 650px) and (max-width: 900px) {
	.card_grid {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media all and (min-width: 350px) and (max-width: 650px) {
	.card_grid {
		grid-template-columns: repeat(2, 1fr);
	}
}
@media all and (max-width: 350px) {
	.card_grid {
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
