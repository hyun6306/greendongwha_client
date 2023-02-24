<template>
	<v-app>
		<div class="test">
			<!--        <LayoutAppbar />-->
			<h1>This is an test page</h1>
			<v-btn
				to="/test/1"
				color="primary"
			>
				1
			</v-btn>
			<v-btn
				to="/test/2"
				color="secondary"
			>
				2
			</v-btn>
			<router-view />
		</div>
	</v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'Test',

	computed: {
		...mapGetters(['APP_GET_PAGE_NAME']),
	},
	created() {
		this.APP_MU_PAGE_NAME('Test')
	},
	mounted() {
		console.log(this.APP_GET_PAGE_NAME)
	},
	methods: {
		...mapMutations(['APP_MU_PAGE_NAME']),
	},
}
</script>
