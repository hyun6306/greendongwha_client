<template>
	<v-dialog
		v-model="dialog"
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
								title="상품 ID"
								:text="models.id"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="조회수"
								:text="models.hits"
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="브랜드"
								:text="models.brand_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제품"
								:text="models.goods_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="패턴"
								:text="models.pattern_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="SAP 코드"
								:text="models.sapcode"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상품타이틀"
								:text="`${models.subject_name} ${models.kind_name} ${models.brand_name}`"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="출시일"
								:text="models.release_date"
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="폭유형코드"
								:text="models.width_code"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="구분코드"
								:text="models.division_code"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="톤 코드"
								:text="models.tone_code"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제품특성코드"
								:text="models.feature_code"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="컬러코드"
								:text="models.color_code"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="스타일코드"
								:text="models.style_code"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="tagsFilterItems"
								title="태그"
								tag-chips
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="image != null"
								title="대표이미지"
								:text-button="image"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-for="(item, i) in productImages"
							:key="i"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상품이미지"
								:text-button="item"
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
export default {
	name: 'AdminProductMasterRead',
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: [],
		image: null,
		productImages: [],
	}),
	computed: {
		tagsFilterItems() {
			return this.readItem.tags.length ? this.readItem.tags.map(x => x.tag_value) : []
		},
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
		this.models = this.readItem
		if (this.readItem.rep_image_url != null) {
			this.image = {
				text: this.readItem.rep_image_url,
				button: {
					text: '이미지 보기',
					color: 'primary',
					link: this.readItem.rep_image_url,
				},
			}
		}
		if (this.readItem.images_url.length && this.readItem.images_url != null) {
			this.readItem.images_url.forEach(element => {
				const item = {
					text: element,
					button: {
						text: '이미지 보기',
						color: 'primary',
						link: element,
					},
				}
				this.productImages.push(item)
			})
		}
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.models = {
				codeType: null,
				codeName: null,
				codeValue: null,
				etc: null,
				regi_userId: null,
				regi_date: null,
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
