<template>
	<div class="mb-7">
		<h3 class="mb-5">{{ title }}</h3>
		<v-row class="ma-0">
			<v-col
				v-for="(item, i) in items"
				:key="i"
				class="pa-0 card clickCursor"
				cols="6"
				@click="goDetail(item.id)"
			>
				<div :class="i % 2 === 0 ? 'mr-1' : 'ml-1'">
					<v-img
						:src="item.image_url"
						width="100%"
						height="100%"
						aspect-ratio="1"
					/>
					<p class="mt-1 tit">{{ item.title }}</p>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'HomeCommunityHomeKnowhowTipItem',
	props: {
		title: {
			type: String,
			default: '',
		},
		items: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		goDetail(id) {
			this.$router.push({
				name: 'Community_KnowHow_Detail',
				params: {
					id,
				},
			})
		},
	},
}
</script>

<style lang="scss" scoped>
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}
.card {
	.v-image {
		border-radius: 4px !important;
	}
	.tit {
		@include ellipsis_2;
		color: $color_font;
		font-size: $font_normal;
		font-weight: $fw_normal;
		word-break: keep-all;
	}
}
</style>
