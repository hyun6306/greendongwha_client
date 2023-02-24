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
								title="패턴코드"
								:text="readItem.pattern_code"
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
								:text="readItem.subject_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="종류"
								:text="readItem.kind_name"
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
								title="제품"
								:text="readItem.goods_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="패턴 이름"
								:text="readItem.pattern_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="패턴(영문)"
								:text="readItem.pattern_engname"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="패턴 이미지"
								:text-button="pattern_url"
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
								:text="readItem.regi_userid"
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
				>
					<!--                    <v-col cols="6" sm="4" md="3" lg="2">
                        <v-btn
                            color="olive"
                            block
                            dark
                            @click="onAddPatternImage"
                        >
                            <v-icon>mdi-image-plus</v-icon>
                            <span class="ml-2 hidden-md-and-down">패턴 이미지</span>
                        </v-btn>
                    </v-col>-->
					<v-spacer />
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
	name: 'AdminProductCategoryPatternRead',
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		pattern_url: null,
	}),
	computed: {},
	watch: {},
	created() {
		console.log('readItem', this.readItem)
		this.pattern_url = this.readItem.pattern_url
			? {
					text: this.readItem.pattern_url,
					button: {
						text: '링크보기',
						color: 'primary',
						link: this.readItem.pattern_url,
					},
			  }
			: {}
	},
	mounted() {},
	destroyed() {},
	methods: {
		onAddPatternImage() {
			this.$emit('onAddPatternImage', this.readItem)
		},
	},
}
</script>

<style scoped lang="scss"></style>
