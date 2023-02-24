<template>
	<div class="wrapper">
		<v-container
			class="pa-0 pt-5 pt-md-15 px-3 mb-5"
			fluid
		>
			<HomeInteriorPriceConsult @back="$emit('selectTab', 1)" />
		</v-container>
	</div>
</template>

<script>
import common from '@/mixins/common'
import { mapGetters } from 'vuex'

export default {
	name: 'HomeInteriorPriceInquireRegister03',
	mixins: [common],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	watch: {},
	created() {},
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss"></style>
