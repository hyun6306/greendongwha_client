<template>
	<v-btn-toggle
		v-model="model"
		group
		mandatory
		class="toggle_group_btn"
		active-class="toggle_active_btn"
	>
		<v-btn
			v-for="(item, i) in items"
			:key="i"
			height="38"
			:color="model === item.code ? 'primary' : 'secondary'"
			class="mr-2 toggle_normal_btn"
			:value="item.code"
		>
			{{ item.code_name }}
		</v-btn>
	</v-btn-toggle>
</template>

<script>
import model from '@/mixins/model'
export default {
	name: 'HomeCommunityHomeMaruTvToggleItem',
	mixins: [model],
	props: ['items'],
}
</script>

<style lang="scss" scoped>
.toggle_normal_btn {
	border-radius: 50px !important;
	font-size: $font_normal;
	color: $color_gray1 !important;
	border: 1px solid #ccc !important;
	padding-left: 2rem;
	padding-right: 2rem;
}
.toggle_active_btn {
	color: white !important;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1) !important;
	font-weight: bold !important;
	.toggle_group_btn {
		&_txt {
			color: $color_green1 !important;
			font-weight: bold !important;
		}
	}
}
.v-btn--active:hover::before,
.v-btn--active::before {
	opacity: 1;
	background-color: #00592d !important;
}
</style>
