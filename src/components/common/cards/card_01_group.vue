<template>
	<v-row
		class="ma-0 step_group"
		justify="center"
	>
		<v-col
			v-for="(items, i) in cardItems"
			:key="i"
			class="pa-0"
			:cols="APP_GET_APP_STATE != 'web' ? cols : ''"
		>
			<v-row class="ma-0">
				<v-col class="pa-0 mt-3">
					<CommonCardsCard01
						:number="items.number"
						:image="items.image"
						:title="items.title"
						:text="items.text"
					/>
				</v-col>
				<div>
					<v-icon
						:color="cardItems.length - 1 != i ? 'black' : 'white'"
						class="step_arrow hidden-md-and-down"
					>
						arrow_forward_ios
					</v-icon>
				</div>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Card01Group',
	components: {},
	props: ['cols', 'cardItems'],
	data: () => ({}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.step_group {
	text-align: center !important;
}
.step_arrow {
	margin-top: 4.5rem;
}
</style>
