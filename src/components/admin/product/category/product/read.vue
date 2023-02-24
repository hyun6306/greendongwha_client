<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="`${title} 내용 확인`"
				@close="$emit('close')"
			/>
			<v-col class="pa-0 pa-md-3">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제품코드"
								:text="readItem.goods_code"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="사용여부"
								:text="readItem.use_yn === 'Y' ? 'ON' : 'OFF'"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="품목"
								:text="part"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="종류"
								:text="type"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="브랜드"
								:text="readItem.brand_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제품 이름"
								:text="readItem.goods_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제품(영문)"
								:text="readItem.goods_engname"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="툴팁"
								:text="readItem.tooltip"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="슬로건"
								:text="readItem.slogan"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="특장점 이미지"
								:text-button="banner_url"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="보증 기간"
								:text="readItem.guarantee_year === '0' ? '없음' : `${readItem.guarantee_year}년`"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="특판 문의"
								:text="readItem.specialadd_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="BEST"
								:text="readItem.best_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="NEW"
								:text="readItem.new_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록자"
								:text="readItem.regi_userId"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="readItem.regi_date"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="end"
				>
					<v-col
						cols="12"
						sm="4"
						md="3"
						lg="2"
					>
						<v-btn
							color="error"
							block
							tile
							elevation="0"
							@click="$emit('close')"
						>
							<v-icon>clear</v-icon>
							<span class="ml-2">닫기</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminProductCategoryProductRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		part: null,
		type: null,
		banner_url: {},
	}),
	computed: {
		...mapGetters([
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
		]),
	},
	watch: {},
	created() {
		console.log('getReadData', this.readItem)
		const brand = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, this.readItem, 'brand_code')
		const type = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, brand, 'kind_code')
		const part = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS, type, 'subject_code')

		this.part = part.text
		this.type = type.text

		this.banner_url = this.readItem.banner_url
			? {
					text: this.readItem.banner_url,
					button: {
						text: '링크보기',
						color: 'primary',
						link: this.readItem.banner_url,
					},
			  }
			: {}
		console.log('readItem', this.readItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.part = null
			this.type = null
			this.banner_url = {}
		},
	},
}
</script>

<style scoped lang="scss"></style>
