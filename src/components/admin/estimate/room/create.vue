<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="650"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? `${title} 등록` : `${title} 수정`"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.exclusive_area"
								title="*전용 면적(㎡)"
								:select="widthCodeItems"
								:disabled="mode === 'edit'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.roomcount"
								title="*방 개수(개)"
								input
								:input-type="'number'"
								:disabled="mode === 'edit'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.area"
								title="*방 면적(㎡)"
								input
								:input-type="'number'"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						md="6"
						class="pl-0"
					>
						<v-row class="ma-0">
							<v-col cols="6">
								<v-btn
									color="error"
									block
									tile
									elevation="0"
									@click="$emit('close')"
								>
									<v-icon>clear</v-icon>
									<span class="ml-2">취소</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'create'"
								cols="6"
							>
								<v-btn
									color="primary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>add</v-icon>
									<span class="ml-2">등록</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'edit'"
								cols="6"
							>
								<v-btn
									color="secondary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>edit</v-icon>
									<span class="ml-2">수정</span>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminEstimateRoomCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			exclusive_area: null,
			roomcount: null,
			area: null,
		},
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_ADMIN_USER',
			// 전용면적 데이터
			'HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA',
		]),
		widthCodeItems() {
			return this.HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA || []
		},
		allowValue() {
			const checkValue = ['exclusive_area']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['roomcount', 'area']
			return this.common_allowTextCheck(this.models, checkText)
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	async created() {
		await this.getData()
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem, this.models)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions([
			// 전용면적 선택 데이터 가져오기
			'HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA',
			// 방면적 API
			'ADMIN_ACT_ESTIMATE_ROOM_AREA',
		]),
		async getData() {
			// 전용면적, 방 데이터 가져오기
			if (this.HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA === null) await this.HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA() // 평수
		},
		startDataMapping() {
			this.models = {
				exclusive_area: this.HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA.find(
					item => item.exclusive_area === this.editItem.exclusive_area,
				),
				roomcount: this.editItem.roomcount,
				area: this.editItem.area,
			}
			this.origin = JSON.parse(JSON.stringify(this.models))
			console.log('this.origin', this.origin)
		},
		resetData() {
			this.models = {
				exclusive_area: null,
				roomcount: null,
				area: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				exclusive_area: this.models.exclusive_area.exclusive_area,
				roomcount: this.models.roomcount || '',
				area: this.models.area || '',
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			console.log('parmas', params)

			try {
				const items = { method: this.mode, params: params }
				await this.ADMIN_ACT_ESTIMATE_ROOM_AREA(items).then(() => {
					this.loading = false
					this.$emit('close')
				})
			} catch (e) {
				console.log('admin.estimate.RoomAreaGet', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
