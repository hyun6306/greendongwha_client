<template>
	<v-menu
		offset-y
		open-on-click
		open-on-hover
		z-index="10000"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				dark
				icon
				v-bind="attrs"
				width="23"
				height="30"
				class="ml-5"
				v-on="on"
			>
				<v-img
					eager
					width="23"
					:src="require('@/assets/img/icon/icon_bookmark.png')"
				/>
			</v-btn>
		</template>
		<v-list width="300">
			<v-list-item-group
				v-if="scrapModel"
				color="primary"
			>
				<v-list-item
					v-for="(item, i) in scrapMenu"
					:key="i"
					@click="scrap_push_link(item)"
				>
					<v-list-item-icon class="pl-3">
						<v-img
							eager
							:src="item.image"
							width="40"
						/>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title
							class="bookmark_title pb-1"
							v-text="item.title"
						/>
						<v-list-item-subtitle
							v-if="item.subText"
							class="bookmark_path"
							v-text="item.subText"
						/>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
			<v-list-item-group v-else>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="bookmark_title pb-1"> 스크랩 내용이 없습니다. </v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
			<v-divider />
			<v-col
				cols="12"
				align="center"
			>
				<v-btn
					color="primary"
					rounded
					width="180"
					to="/user?tab=1"
				>
					스크랩 보기
				</v-btn>
			</v-col>
		</v-list>
	</v-menu>
</template>

<script>
import scrap from '@/mixins/scrap'
import { mapGetters } from 'vuex'

export default {
	name: 'ScrapMenu',
	mixins: [scrap],
	data: () => ({}),
	computed: {
		...mapGetters(['USER_GET_SCRAP']),
		scrapMenu() {
			if (!this.scrapModel) return []
			return [...this.USER_GET_SCRAP].slice(undefined, 4) || []
		},
		scrapModel() {
			return this.USER_GET_SCRAP?.length > 0
		},
	},
	watch: {},
	created() {},
	mounted() {
		console.log('scrapMenu', this.scrapMenu)
	},
	methods: {},
}
</script>

<style scoped lang="scss">
.bookmark {
	&_title {
		font-weight: bold;
		font-size: 0.85em;
	}
	&_path {
		font-size: 0.75em;
	}
}
</style>
