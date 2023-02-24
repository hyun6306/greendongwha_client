<template>
	<div>
		<div v-if="!appWidthState">
			<v-row
				class="ma-0"
				align="center"
			>
				<v-col
					cols="7"
					align="start"
				>
					<span class="select_count">{{ items.length }} 지점 </span> 선택
					<span class="select_explain">(최대 3개까지 선택 가능)</span>
				</v-col>
				<v-col
					cols="5"
					align="end"
				>
					<v-btn
						dark
						color="olive"
						@click="listState = !listState"
					>
						{{ listState ? '상세보기' : '상세보기' }}
						<v-icon class="pl-2">
							{{ listState ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</div>
		<v-row
			class="ma-0"
			align="center"
		>
			<template v-if="listState">
				<v-col
					v-for="(item, i) in items"
					:key="i"
					cols="12"
					md="3"
					align="center"
				>
					<CommonCardMenuCardInteriorSelect
						:item="item"
						@close="deleteInterior"
					/>
				</v-col>
			</template>
			<template v-if="listState">
				<v-col
					v-for="i in emptyCount"
					:key="`empty_${i}`"
					cols="12"
					md="3"
					align="center"
				>
					<v-img
						width="100%"
						max-width="320px"
						contain
						eager
						:src="require('@/assets/img/home/interior/card_default.png')"
					/>
				</v-col>
			</template>
			<v-col
				cols="12"
				md="3"
			>
				<v-btn
					v-if="appWidthState"
					:disabled="allowCheck"
					color="primary"
					block
					height="80"
					x-large
					@click="next"
				>
					<h1>다 음</h1>
				</v-btn>
				<v-btn
					v-else
					:disabled="allowCheck"
					color="primary"
					block
					height="40"
					large
					@click="next"
				>
					<h3>다 음</h3>
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import common from '@/mixins/common'
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'HomeInteriorPriceItemsInteriorList',
	mixins: [common],
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		tabSelect: {
			type: Number,
			default: 0,
		},
	},
	data: () => ({
		listState: true,
	}),
	computed: {
		...mapGetters(['APP_GET_APP_WIDTH']),
		allowCheck() {
			return !this.items.length
		},
		emptyCount() {
			return 3 - Number(this.items.length)
		},
		appWidthState() {
			return this.APP_GET_APP_WIDTH > 960
		},
	},
	watch: {
		APP_GET_APP_WIDTH() {
			this.checkAppState()
			this.changeHeight()
		},
		listState() {
			this.changeHeight()
		},
		tabSelect(val) {
			if (val === 1) this.checkAppState()
		},
	},
	mounted() {
		this.checkAppState()
		this.changeHeight()
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_INTERIOR']),
		deleteInterior(item) {
			this.HOME_MU_INTERIOR_SELECT_INTERIOR(item)
		},
		checkAppState() {
			// 화면이 960보다 큰 경우
			this.appWidthState ? (this.listState = true) : (this.listState = false)
		},
		changeHeight() {
			// 화면이 960보다 큰 경우
			if (this.appWidthState) return this.$emit('changeHeight', '220px')
			if (this.listState) this.$emit('changeHeight', '487px')
			else this.$emit('changeHeight', '170px')
		},
		next() {
			this.listState = false
			this.$emit('next')
		},
	},
}
</script>

<style scoped lang="scss">
.select {
	&_count {
		font-size: 1.2rem;
		color: $color_primary;
		font-weight: bold;
	}
	&_explain {
		font-size: 0.85rem;
		color: $color_gray2;
	}
}
</style>
