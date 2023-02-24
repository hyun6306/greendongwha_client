<template>
	<div class="inner_wrapper px-5">
		<p class="mb-10 font16 fw_bold">인테리어 정보는 ‘내 인테리어점 상세 정보’의 기본 정보로 활용됩니다.</p>
		<!-- 상호 정보 등록 -->
		<div class="register mb-10">
			<div class="body">
				<div class="input_area">
					<v-col
						class="pa-0 table"
						cols="12"
					>
						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">상호명</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03
									placeholder="abc 인테리어"
									class="mb-1"
								/>
								<v-row
									class="ma-0"
									align="center"
								>
									<v-col
										cols="12"
										sm="4"
										md="3"
										lg="2"
										class="pa-0"
									>
										<CommonButtonsButton01
											name="회사 로고 등록"
											color="#9fa1a4"
											class-name="olive"
											height="40"
											:disabled="readonly"
											@click="$refs.fileUpload.$refs.input.click()"
										/>
									</v-col>
									<v-col
										cols="12"
										sm="8"
										md="9"
										lg="10"
										class="pa-0 pl-2 d-none d-sm-flex"
									>
										<v-file-input
											ref="fileUpload"
											v-model="model"
											:multiple="multiple"
											:placeholder="placeholder"
											:disabled="disabled"
											:readonly="readonly"
											outlined
											hide-details
											dense
											height="40"
											:show-size="1000"
											@change="fileChange"
										>
											<template v-slot:selection="{ index, text }">
												<v-chip
													v-if="index < 2"
													color="primary accent-4"
													dark
													label
													small
												>
													{{ text }}
												</v-chip>

												<span
													v-else-if="index === 2"
													class="text-overline grey--text text--darken-3 mx-2"
													>+{{ model.length - 2 }} File(s)</span
												>
											</template>
										</v-file-input>
									</v-col>
									<p class="notice">*파일제한: 3MB 이하 첨부 가능</p>
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">대표자명</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03 placeholder="김동화" />
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">사업자번호</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03 placeholder="214-12-123456" />
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="font14">인테리어점 사진등록</p>
								<span class="font14">(최대 5개등록 가능)</span>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row
									class="ma-0"
									align="center"
								>
									<v-col
										cols="12"
										sm="4"
										md="3"
										lg="2"
										class="pa-0"
									>
										<CommonButtonsButton01
											name="대표 사진 등록"
											color="#9fa1a4"
											class-name="olive"
											height="40"
											:disabled="readonly"
											@click="$refs.fileUpload.$refs.input.click()"
										/>
									</v-col>
									<v-col
										cols="12"
										sm="8"
										md="9"
										lg="10"
										class="pa-0 pl-2 d-none d-sm-flex"
									>
										<v-file-input
											ref="fileUpload"
											v-model="model"
											:multiple="multiple"
											:placeholder="placeholder"
											:disabled="disabled"
											:readonly="readonly"
											outlined
											hide-details
											dense
											height="40"
											:show-size="1000"
											@change="fileChange"
										>
											<template v-slot:selection="{ index, text }">
												<v-chip
													v-if="index < 2"
													color="primary accent-4"
													dark
													label
													small
												>
													{{ text }}
												</v-chip>

												<span
													v-else-if="index === 2"
													class="text-overline grey--text text--darken-3 mx-2"
													>+{{ model.length - 2 }} File(s)</span
												>
											</template>
										</v-file-input>
									</v-col>
									<p class="notice">*파일제한: 3MB 이하 첨부 가능</p>
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">회사 전화 번호</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row class="ma-0">
									<v-col class="pa-0">
										<div class="pr-1">
											<CommonInputsInput03 placeholder="02" />
										</div>
									</v-col>
									<p class="pt-2">-</p>
									<v-col class="pa-0">
										<div class="pr-1 pl-1">
											<CommonInputsInput03 placeholder="1234" />
										</div>
									</v-col>
									<p class="pt-2">-</p>
									<v-col class="pa-0">
										<div class="pl-1">
											<CommonInputsInput03 placeholder="5678" />
										</div>
									</v-col>
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">회사 주소</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row class="ma-0 pa-0">
									<v-col
										cols="6"
										md="3"
										class="pa-0 pr-2"
									>
										<CommonInputsInput03
											placeholder="우편번호"
											readonly
											disabled
											class="mb-2"
										/>
									</v-col>
									<v-col
										cols="2"
										class="pa-0"
									>
										<CommonButtonsButton01
											name="주소검색"
											color="#9fa1a4"
											class-name="edge_5 olive"
											height="40"
										/>
									</v-col>
								</v-row>
								<v-col
									cols="12"
									class="pa-0"
								>
									<CommonInputsInput03
										placeholder="도로명/지번주소"
										readonly
										disabled
										class="mb-2"
									/>
								</v-col>
								<v-col
									cols="12"
									class="pa-0"
								>
									<CommonInputsInput03 placeholder="상세 주소를 입력해주세요." />
								</v-col>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">회사 설립연도</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row class="ma-0">
									<v-col class="pa-0">
										<div class="pr-1">
											<CommonInputsInput03 placeholder="1991" />
										</div>
									</v-col>
									<p class="pt-2">년</p>
									<v-col class="pa-0">
										<div class="pr-1 pl-1">
											<CommonInputsInput03 placeholder="06" />
										</div>
									</v-col>
									<p class="pt-2">월</p>
									<v-col class="pa-0">
										<div class="pl-1 pr-1">
											<CommonInputsInput03 placeholder="29" />
										</div>
									</v-col>
									<p class="pt-2">일</p>
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>홈페이지 주소</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03 placeholder="https://www.greendongwha.com/" />
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>SNS 주소</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0"
										cols="2"
									>
										<div class="pr-2">
											<CommonSelectsSelect01 label="선택" />
										</div>
									</v-col>
									<v-col
										class="pa-0"
										cols="10"
									>
										<CommonInputsInput03 placeholder="https://www.greendongwha.com/" />
									</v-col>
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">시공분야</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonSelectsSelect03 label="시공분야" />
								<v-row class="ma-0 mt-3 tag_zone">
									<v-col
										cols="auto"
										class="pa-0"
									>
										<div class="mr-2 mb-1">
											<span class="pa-2 tag">
												<span>종합인테리어</span>
												<v-icon
													class="pl-3"
													small
													>clear</v-icon
												>
											</span>
										</div>
									</v-col>
									<v-col
										cols="auto"
										class="pa-0"
									>
										<div class="mr-2 mb-1">
											<span class="pa-2 tag">
												<span>마루전문</span>
												<v-icon
													class="pl-3"
													small
													>clear</v-icon
												>
											</span>
										</div>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.tag_zone {
	.tag {
		background-color: #f1f2f3;
		border-radius: 5px;
	}
}
</style>
