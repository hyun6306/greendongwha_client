<template>
	<v-expansion-panels
		v-model="model"
		accordion
		elevation="0"
	>
		<v-expansion-panel
			v-for="(item, i) in items"
			:key="i"
		>
			<v-expansion-panel-header class="panel_header">
				<v-row
					class="ma-0"
					align="center"
				>
					<!--                    <v-col class="pa-0 pl-0 pl-md-5 hidden-sm-and-down" cols="1" align="start">-->
					<!--                        <h5 class="panel_title">{{ items.length-i }}</h5>-->
					<!--                    </v-col>-->
					<v-col
						cols="11"
						sm="8"
						class="pa-0"
						align="start"
						justify="center"
					>
						<v-row
							align="center"
							class="ma-0"
						>
							<v-chip
								label
								dark
								class="mr-2 pa-2"
								:color="item.tag === '뉴스' ? '#42883d' : '#0f2e73'"
							>
								{{ item.tag }}
							</v-chip>
							<h5 class="panel_title pa-2">
								{{ item.title }}
							</h5>
						</v-row>
					</v-col>
					<v-col
						class="pa-0 hidden-sm-and-down"
						cols="2"
					>
						<span>{{ item.date }}</span>
					</v-col>
				</v-row>
			</v-expansion-panel-header>
			<v-divider />
			<v-expansion-panel-content class="panel_content_bg">
				<v-row
					class="ma-0 mb-2 mt-5"
					align="start"
				>
					<p v-html="item.contents" />
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Panel01',
	mixins: [model],
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	methods: {},
}
</script>

<style scoped lang="scss">
.panel_title {
	font-family: 'NotoSansKR-Regular';
	font-size: 1.05rem;
	// ...처리
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 80%;
}
.panel_header {
	border-top: 1px solid #ccc;
}
.panel_content_bg {
	background-color: #f6f6f6;
}
:deep(.v-chip) {
	height: 1.7rem;
}
:deep(.v-expansion-panel::before) {
	box-shadow: none !important;
}
:deep(.v-expansion-panel) {
	border-radius: 0 !important;
}
</style>
