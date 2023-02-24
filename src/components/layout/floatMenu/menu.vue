<template>
	<v-card
		class="mb-4"
		height="110"
		color="transparent"
		@click="$emit('submit', menu)"
	>
		<v-row class="ma-0">
			<v-col
				class="pa-0 pb-4"
				cols="4"
			>
				<v-img
					v-if="menu.image"
					eager
					width="110"
					height="110"
					:src="menu.image"
				>
					<!--                        <v-col class="pa-0" cols="12" align="right">
                        <v-btn
                            x-small
                            class="px-0 mark"
                        >
                            <v-icon color="white">bookmark_border</v-icon>
                        </v-btn>
                    </v-col>-->
				</v-img>
			</v-col>
			<v-col
				class="pa-0 pb-4"
				align-self="center"
			>
				<p
					v-if="menu.text"
					class="type"
				>
					{{ menu.text }}
				</p>
				<p
					v-if="menu.title"
					class="theme"
				>
					{{ menu.title }}
				</p>
				<p
					v-if="menu.path"
					class="path"
				>
					{{ menu.path }}
				</p>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'HomeMainFloatMenuItems',
	props: ['menu'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.v-card {
	box-shadow: none !important;
	border-radius: 0 !important;
	.type {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
	}
	.theme {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 18px !important;
	}
	.path {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		color: #777;
	}
}
.v-card:last-child {
	border-bottom: none !important;
}
.mark.v-btn:not(.v-btn--round).v-size--x-small {
	min-width: 20px !important;
	width: 23px !important;
	height: 26px !important;
	box-shadow: none;
}
</style>
