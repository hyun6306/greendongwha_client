<template>
	<v-col class="pa-0 tag-group my-5 my-sm-10 py-2 py-sm-8">
		<v-chip-group column>
			<v-chip
				v-for="(item, i) in items"
				:key="i"
				color="white"
				class="hash"
				@click="common_searchTag(item)"
			>
				{{ item.tag_value }}
			</v-chip>
		</v-chip-group>
	</v-col>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HomeProductDetailTags',
	components: {},
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.tag-group {
	background-color: #f8f8f8;
	:deep(.v-slide-group__content) {
		justify-content: center;
	}
	.v-chip.hash {
		padding: 10px 20px !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 16px !important;
		color: #323333 !important;
		border: 1px solid #ccc !important;
		&:hover {
			background-color: #00562f !important;
			color: white !important;
			border: none !important;
		}
	}
}

.bg_tr {
	background-color: transparent !important;
}

@media all and (min-width: 380px) and (max-width: 768px) {
	.tag-group {
		.v-chip.hash {
			padding: 5px 12px !important;
			font-size: 12px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.tag-group {
		.v-chip.hash {
			padding: 5px 12px !important;
			font-size: 12px !important;
		}
	}
}
</style>
