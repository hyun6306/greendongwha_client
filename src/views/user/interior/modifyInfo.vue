<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			cols="12"
			class="pa-0"
			align="center"
		>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<div class="content_title">
					마이페이지
					<p class="sub_title">인테리어 회원 여러분 환영합니다.</p>
				</div>
			</v-col>

			<v-col
				cols="12"
				md="3"
				class="pa-0 mb-10"
			>
				<CommonCardMenuTypeBtn02
					v-model="toggleProductPopType"
					:type-items="productTypePopItems"
					:cols="6"
					class="mb-6"
				/>
			</v-col>

			<div class="inner_wrapper px-5">
				<v-tabs-items v-model="toggleProductPopType">
					<!-- 담당자 정보입력 -->
					<v-tab-item>
						<UserAgencyModifyMarketer />

						<div
							class="d-flex justify-center"
							align="center"
						>
							<CommonButtonsButton02
								name="취소"
								class-name="btn_basic"
								color="#a0a1a5"
								class="mr-1"
							/>
							<CommonButtonsButton02
								name="회원정보 수정"
								class-name="btn_basic"
								color="#42883d"
								class="ml-1"
							/>
						</div>
					</v-tab-item>

					<!-- 인테리어점 정보입력 -->
					<v-tab-item>
						<UserAgencyModifyStore />

						<div
							class="d-flex justify-center"
							align="center"
						>
							<CommonButtonsButton02
								name="취소"
								class-name="btn_basic"
								color="#a0a1a5"
								class="mr-1"
							/>
							<CommonButtonsButton02
								name="인테리어점 정보 수정"
								class-name="btn_basic"
								color="#42883d"
								class="ml-1"
							/>
						</div>
					</v-tab-item>
				</v-tabs-items>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'
export default {
	name: 'InteriorModifyInfo',
	mixins: [common],
	data: () => ({
		toggleProductPopType: 0,
		productTypePopItems: [{ title: '담당자 정보 입력' }, { title: '인테리어 정보 입력' }],
	}),
	computed: {
		...mapGetters([]),
	},
	methods: {
		...mapMutations([]),
	},
}
</script>

<style scoped lang="scss"></style>
