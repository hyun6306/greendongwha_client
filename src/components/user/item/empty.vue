<template>
	<v-row justify="center">
		<div class="no_content">
			<v-img
				class="add my-4"
				:src="require('@/assets/img/icon/icon_add.png')"
			/>
			<p
				v-if="text"
				v-html="text"
			></p>
			<p v-if="subText">{{ subText }}</p>
		</div>
	</v-row>
</template>

<script>
export default {
	name: 'UserItemEmpty',
	components: {},
	props: ['text', 'subText'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
// 컨텐츠없을때
.no_content {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	color: #262626 !important;
	line-height: 1.5 !important;
	word-break: keep-all !important;
	.add {
		width: 44px !important;
		height: 44px !important;
		padding: 10px !important;
		border-radius: 50%;
		border: 1px dashed #8b8b8b;
		:deep(.v-image__image--cover) {
			background-size: inherit;
		}
	}
}
</style>
