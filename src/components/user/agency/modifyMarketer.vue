<template>
	<div class="inner_wrapper px-5">
		<p class="mb-10 font16 fw_bold">인테리어 담당자님의 회원 정보를 입력해주세요.</p>

		<!-- 담당자 정보 수정 -->
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
								<p>아이디(이메일)</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="3"
								align="start"
								>abc123@naver.com</v-col
							>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>이메일</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03
									placeholder="abc1230naver.com"
									class="mb-1"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>비밀번호</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03
									placeholder="8~12(영문,숫자,특수문자 조합)로 입력해주세요."
									class="mb-1"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>비밀번호</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03
									placeholder="비밀번호를 다시 입력해주세요."
									class="mb-1"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>이름</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
								>김동화</v-col
							>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>휴대폰번호</p>
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
										cols="8"
										md="10"
									>
										<div class="pr-2">
											<CommonInputsInput03 placeholder="010-1234-5678" />
										</div>
									</v-col>
									<v-col
										class="pa-0"
										cols="3"
										md="2"
									>
										<CommonButtonsButton01
											:disabled="hand === null"
											name="인증번호 발송"
											:color="smsNumberCheck ? 'primary' : '#5f6062'"
											class-name="regular font_12 edge5"
											height="40"
											@click="checkSms"
										/>
									</v-col>
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>인증번호</p>
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
										cols="12"
										md="6"
									>
										<div class="pr-0 pr-md-2">
											<CommonInputsInput03 placeholder="인증번호를 입력" />
										</div>
									</v-col>
									<v-col
										class="pa-0"
										cols="12"
										md="6"
									>
										<v-row class="ma-0 mt-2 mt-md-0">
											<v-col
												class="pa-0"
												cols="6"
											>
												<div class="pr-1">
													<CommonButtonsButton01
														:disabled="hand === null"
														name="인증번호 재발송"
														:color="smsNumberCheck ? 'primary' : '#5f6062'"
														class-name="regular font_12 edge5"
														height="40"
														@click="checkSms"
													/>
												</div>
											</v-col>
											<v-col
												class="pa-0"
												cols="6"
											>
												<div class="pl-1">
													<CommonButtonsButton01
														:disabled="hand === null"
														name="인증번호 확인"
														color="#00582c"
														class-name="regular font_12 edge5"
														height="40"
														@click="checkSms"
													/>
												</div>
											</v-col>
										</v-row>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</div>
			</div>
		</div>

		<v-row class="ma-0 py-3 mb-5 history_bar">
			<v-col
				class="pa-0 tit"
				cols="auto"
				align="start"
				align-self="center"
				>마케팅 수신동의(선택)</v-col
			>
		</v-row>
		<!-- 마케팅 수신 동의 -->
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
								<p>이메일 수신여부</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="3"
								align="start"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0"
										cols="4"
									>
										<CommonCheckboxsCheckbox02
											v-model="privateTermsCheck"
											text="수신"
											class="pa-0 ma-0"
										/>
									</v-col>
									<v-col
										class="pa-0"
										cols="auto"
									>
										<CommonCheckboxsCheckbox02
											v-model="privateTermsCheck"
											text="수신거부"
											class="pa-0 ma-0"
										/>
									</v-col>
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p>SNS 수신여부</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="3"
								align="start"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0"
										cols="4"
									>
										<CommonCheckboxsCheckbox02
											v-model="privateTermsCheck"
											text="수신"
											class="pa-0 ma-0"
										/>
									</v-col>
									<v-col
										class="pa-0"
										cols="auto"
									>
										<CommonCheckboxsCheckbox02
											v-model="privateTermsCheck"
											text="수신거부"
											class="pa-0 ma-0"
										/>
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

<style scoped lang="scss"></style>
