<template>
	<v-container
		fluid
		fill-height
		class="pa-0"
	>
		<!--		<iframe
			:src="getQuery"
			name="myframe"
			frameborder="0"
			width="100%"
			:height="height"
			marginwidth="0"
			marginheight="0"
			class="coohome_wrapper"
		></iframe>-->
		<object
			:data="getQuery"
			frameborder="0"
			width="100%"
			:height="height"
			scrolling="no"
			class="coohome_wrapper"
		/>
	</v-container>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HomeHousewarming3DCooHome',
	mixins: [common],
	data: () => ({}),
	computed: {
		getQuery() {
			return this.$route.query.url || null
		},
		width() {
			return `${window.innerWidth}px`
		},
		height() {
			return `${window.innerHeight}px`
		},
	},
	watch: {},
	created() {
		if (!this.getQuery) this.$router.go(-1)
	},
	mounted() {
		// if (this.getQuery) this.common_onLink(this.getQuery)
		// this.$router.go(-1)
	},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss"></style>
