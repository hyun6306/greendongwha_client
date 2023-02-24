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
								title="상태"
								:text="readItem.status"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="주소"
								:text="`${readItem.showroom_zipcode} ) ${readItem.showroom_addr1} ${readItem.showroom_addr2}`"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="위도"
								:text="readItem.latitude"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="경도"
								:text="readItem.longitude"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="전화번호"
								:text="readItem.showroom_tel"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="안심번호"
								:text="readItem.security_tel"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="홈페이지 주소"
								:text="readItem.homepage_url"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="인스타그램"
								:text="readItem.showroom_sns_insta"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="네이버 블로그"
								:text="readItem.showroom_sns_naver"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="페이스북"
								:text="readItem.showroom_sns_facebook"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="유투브"
								:text="readItem.showroom_sns_youtube"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="서비스"
								:text="readItem.showroom_service"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="취급품목"
								:text="filterBuildType"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="영업시간"
								:text="readItem.business_hours"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="쇼룸명"
								:text="readItem.showroom_name"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-for="i in 3"
							:key="`rep_image_url${i}`"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="readItem[`rep_image_url${i}`]"
								:title="`대표이미지${i}`"
								:text-button="{
									text: readItem[`rep_image_url${i}`],
									button: {
										text: `대표이미지${i}`,
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem[`rep_image_url${i}`])"
							/>
						</v-col>
						<v-col
							v-for="i in 3"
							:key="`showroom_image_url${i}`"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="readItem[`showroom_image_url${i}`]"
								:title="`쇼룸이미지${i}`"
								:text-button="{
									text: readItem[`showroom_image_url${i}`],
									button: {
										text: `쇼룸이미지${i}`,
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem[`showroom_image_url${i}`])"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="쇼룸 이미지( 외부채널 )"
								:text="readItem.showroom_add_image_url"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-for="i in 5"
							:key="i"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="readItem[`build_image_url${i}`]"
								:title="`시공이미지${i}`"
								:text-button="{
									text: readItem[`build_image_url${i}`],
									button: {
										text: `시공이미지${i}`,
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem[`build_image_url${i}`])"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="시공 이미지( 외부채널 )"
								:text="readItem.showroom_add_image_url"
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
	name: 'AdminDisplayShowRoomRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({}),
	computed: {
		filterBuildType() {
			return this.readItem.buildtype.map(x => x.code_name).join(' , ') || ''
		},
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
	},
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss"></style>
