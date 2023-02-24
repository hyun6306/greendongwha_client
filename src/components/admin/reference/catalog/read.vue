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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="자료명"
								:text="models.catalogue_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="사용여부"
								:text="models.use_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="설명"
								:text="models.description"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="품목"
								:text="models.subject_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="종류"
								:text="models.kind_name"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="브랜드 / 제품"
								:input-select-chips="brandGoods"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="썸네일"
								:text-button="thumbnail"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="카탈로그"
								:text-button="image"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록자"
								:text="models.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="models.regi_date"
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

export default {
	name: 'AdminReferenceCatalogRead',
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: [],
		thumbnail: null,
		image: null,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS', 'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS']),
		brandGoods() {
			const items = []
			this.readItem.catalogue_mapping.forEach(element => {
				const item = {
					brand: this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.find(item => item.brand_code === element.brand_code),
					product: null,
				}
				if (element.goods_code) {
					item.product = this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.find(
						item => item.goods_code === element.goods_code,
					)
				}
				items.push(item)
			})
			return items
		},
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
		this.models = this.readItem

		this.thumbnail = {
			text: this.readItem.catalogue_thumb_url,
			button: {
				text: '이미지 보기',
				color: 'primary',
				link: this.readItem.catalogue_thumb_url,
			},
		}

		this.image = {
			text: this.readItem.catalogue_url,
			button: {
				text: '카탈로그 보기',
				color: 'primary',
				link: this.readItem.catalogue_url,
			},
		}
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.models = []
			this.thumbnail = null
			this.image = null
		},
	},
}
</script>

<style scoped lang="scss"></style>
