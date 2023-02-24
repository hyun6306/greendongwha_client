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
					<h2>고객정보</h2>
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상담번호"
								:text="readItem.consult_id"
								:fill="true"
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
								title="고객 ID"
								:text="readItem.login_id"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="고객 이름"
								:text="readItem.login_name"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="고객 핸드폰"
								:text="common_number_filter(readItem.login_hand)"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="고객 주소"
								:text="readItem.address"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="filterEstconsultadd"
								title="추가상담 항목"
								tag-chips
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="문의사항"
								:text="readItem.content"
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
					<h2 class="mt-2">상담정보</h2>
					<template v-for="(item, i) in interiorItems">
						<v-row
							:key="i"
							class="ma-0 admin_table_area mb-3"
						>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="인테리어점"
									:text="item.business_name"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="사업자번호"
									:text="item.corporate_no"
								/>
							</v-col>
							<v-col
								cols="12"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="상담상태"
									:text="item.consult_state"
									:fill="true"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="상담자 이름"
									:text="item.manager_name"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="상담자 연락처"
									:text="common_number_filter(item.manager_hand)"
								/>
							</v-col>
							<v-col
								cols="12"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="상담자 ID"
									:text="item.business_id"
									:fill="true"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="상담대기 등록일"
									:text="item.check_date"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0"
							>
								<AdminItemsTableItem
									title="상담결과 등록일"
									:text="item.response_date"
								/>
							</v-col>
						</v-row>
					</template>
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
import admin from '@/mixins/admin'
import common from '@/mixins/common'

export default {
	name: 'AdminEstimateConsultRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		interiorItems: [],
	}),
	computed: {
		filterEstconsultadd() {
			return this.readItem.estconsultadd.map(x => x.code_name) || []
		},
	},
	watch: {},
	created() {
		this.parseInteriorItems()
	},
	mounted() {},
	destroyed() {
		this.interiorItems = []
	},
	methods: {
		parseInteriorItems() {
			for (let i = 0; i < 3; i++) {
				const num = i + 1
				const checkValue = this.readItem[`corporate_no${num}`]
				if (checkValue) {
					const item = {
						business_name: this.readItem[`business_name${num}`],
						corporate_no: this.readItem[`corporate_no${num}`],
						consult_state: this.admin_estimate_consult_statusItems.find(
							x => x.value === this.readItem[`consult_state${num}`],
						).text,
						res_content: this.readItem[`res_content${num}`],
						manager_name: this.readItem[`manager_name${num}`],
						manager_hand: this.readItem[`manager_hand${num}`],
						business_id: this.readItem[`business_id${num}`],
						check_date: this.readItem[`check_date${num}`],
						response_date: this.readItem[`response_date${num}`],
					}
					this.interiorItems.push(item)
				}
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
