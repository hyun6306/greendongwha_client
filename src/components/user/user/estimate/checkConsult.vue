<template>
	<div class="checkBox">
		<v-chip
			v-if="item === '1'"
			x-small
			outlined
		>
			요청
		</v-chip>
		<v-chip
			v-else
			x-small
			dark
			color="olive"
		>
			완료
		</v-chip>
	</div>
</template>
<script>
export default {
	name: 'UserUserEstimateCheckConsult',
	props: {
		item: {
			type: String,
			default: '1',
		},
	},
}
</script>
<style scoped lang="scss">
.checkBox {
	position: relative;
	float: left;
	margin-right: 5px;
}
</style>
