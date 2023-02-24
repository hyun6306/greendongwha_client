<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="800"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="title"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-container class="admin_table">
					<v-row
						class="ma-0"
						justify="center"
						align="center"
					>
						<v-col cols="9">
							<v-text-field
								v-model="keyword"
								label="검색어를 입력해주세요."
								outlined
								hide-details
								clearable
								@keyup.enter="onSearchKeyboard"
							/>
						</v-col>
						<v-col
							cols="1"
							class="pa-0"
						>
							<v-btn
								icon
								x-large
								@click="onSearchKeyboard"
							>
								<v-icon>search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
					<v-row class="ma-0 admin_table_area">
						<v-col
							v-for="(item, i) in items"
							:key="i"
							cols="12"
							class="pa-0"
						>
							<v-row class="ma-0 admin_table_item">
								<v-col
									class="admin_table_title"
									cols="6"
									md="3"
								>
									{{ item.business_name }}
								</v-col>
								<v-col
									class="admin_table_text"
									cols="6"
									md="6"
								>
									<p>{{ item.company_addr }}</p>
									<p>{{ item.login_id }}</p>
									<p>{{ common_number_filter(item.corporate_no, 'business') }}</p>
								</v-col>
								<v-col
									cols="12"
									md="3"
									align-self="center"
								>
									<v-btn
										color="primary"
										block
										tile
										@click="selectCorporate(item)"
									>
										업체선택
									</v-btn>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script>
import common from '@/mixins/common'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'AdminDisplayHouseSpecialCorporateDialog',
	mixins: [common],
	props: ['title', 'dialog'],
	data: () => ({
		keyword: '',
		searchKeyword: '',
	}),
	computed: {
		...mapGetters(['SITE_GET_USERINFO_INTERIOR_LIST']),
		items() {
			if (this.searchKeyword.trim().length) {
				const businessName = this.SITE_GET_USERINFO_INTERIOR_LIST.filter(x =>
					x.business_name.toLowerCase().includes(this.searchKeyword.toLowerCase()),
				)
				const addressName = this.SITE_GET_USERINFO_INTERIOR_LIST.filter(x =>
					x.company_addr.toLowerCase().includes(this.searchKeyword.toLowerCase()),
				)
				let set = new Set([...businessName, ...addressName])
				return [...set]
			}
			return this.SITE_GET_USERINFO_INTERIOR_LIST
		},
	},
	watch: {},
	created() {
		if (!this.SITE_GET_USERINFO_INTERIOR_LIST.length) this.getData()
	},
	async mounted() {
		console.log('SITE_GET_USERINFO_INTERIOR_LIST', this.SITE_GET_USERINFO_INTERIOR_LIST)
	},
	destroyed() {},
	methods: {
		...mapActions(['SITE_ACT_USERINFO_INTERIOR_LIST']),
		async getData() {
			await this.SITE_ACT_USERINFO_INTERIOR_LIST()
		},
		selectCorporate(item) {
			this.$emit('submit', {
				name: item.business_name,
				no: item.corporate_no,
			})
		},
		onSearchKeyboard() {
			this.searchKeyword = this.keyword
		},
	},
}
</script>

<style scoped lang="scss">
.admin_table {
	&_area {
		max-height: 300px;
		overflow: auto;
	}
	&_item {
		border-top: 1px solid #ccc;
	}
	&_title {
		font-size: 1.15rem;
		font-weight: bold;
		border-right: 1px solid #ccc;
		word-break: keep-all;
		background-color: #f8f8f8;
	}
	&_text {
		border-right: 1px solid #ccc;
		word-break: keep-all;
	}
}
</style>
