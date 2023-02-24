<template>
	<v-row
		class="ma-0"
		align="center"
	>
		<v-col
			cols="12"
			class="pa-0"
		>
			<div
				class="card_wrap"
				:data-key="menuType"
			>
				<v-col
					v-for="(menu, n) in menuItems"
					:key="n"
					class="card_item pa-0 clickCursor"
				>
					<!-- myPage -->
					<!-- user -->
					<UserUserScrapCard
						v-if="menuType === 'scrap'"
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
					<CommonCardMenuCard01
						v-else
						:menu="menu"
						@submit="onClick"
					/>
				</v-col>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'CardMenuGroup04',
	props: ['menuType', 'cardMenu'],
	data: () => ({
		scroll: false,
	}),
	computed: {
		...mapGetters(['APP_GET_APP_WIDTH']),
		menuItems() {
			let count
			if (this.APP_GET_APP_WIDTH > 900) count = 4
			if (this.APP_GET_APP_WIDTH < 900) count = 3
			if (this.APP_GET_APP_WIDTH < 665) count = 2
			if (this.APP_GET_APP_WIDTH < 350) count = 1
			return this.cardMenu.slice(0, count)
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
.slide_wrapper {
	position: relative;
}
.card_wrap {
	display: flex;
	width: 100%;
	height: 100%;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
	.card_wrap {
		.card_item {
			width: 31.3% !important;
		}
	}
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.card_wrap {
		.card_item {
			width: 31.3% !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.card_wrap {
		.card_item {
			width: 48% !important;
		}
	}
}
@media all and (max-width: 380px) {
	.card_wrap {
		.card_item {
			width: 48% !important;
		}
	}
}
</style>
