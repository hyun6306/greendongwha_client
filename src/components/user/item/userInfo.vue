<template>
	<v-container class="user_bar py-5 mb-10" fluid>
		<div class="inner_wrapper">
			<v-col cols="12" class="pa-0">
				<div>
					<v-row class="ma-0 pa-3 user" align="center">
						<v-col cols="2" sm="1" class="pa-0 tal" align-self="start">
							<v-avatar
								color="#44883d"
								to="/user"
								class="avatar"
							>
								<v-icon color="white">person</v-icon>
							</v-avatar>
						</v-col>

						<v-col cols="10" sm="11" class="pa-0">
							<v-row class="ma-0" align="center">
								<v-col cols="12" sm="7" align-self="center" class="pa-0 tal">
									<div class="pl-4 pl-md-0">
                                        <!-- 일반 회원 -->
										<p class="name" v-if="AUTH_GET_USER.name">{{AUTH_GET_USER.name}} <span>님</span></p>
										<!-- 인테리어 회원 -->
										<p class="name" v-if="AUTH_GET_USER.manager_name">{{AUTH_GET_USER.manager_name}}<span>님</span> <span>님</span></p>
										<!-- 회원 id -->
										<p class="email" v-if="AUTH_GET_USER.login_id">{{AUTH_GET_USER.login_id}}</p>
									</div>
								</v-col>

								<v-col cols="12" sm="5" align-self="center" class="pa-0 align">
									<v-col cols="4" sm="12" class="pa-0" v-if="AUTH_GET_USER.member_kind === '3'">
										<v-btn
											text
											to="/user/modify"
											class="pa-0 pl-4 pl-md-0 btn_setting"
										>
											<v-img
												class="mr-1"
												width="14"
												height="14"
												:src="require('@/assets/img/icon/icon_store.png')"
												eager
											/>
											내 인테리어점
										</v-btn>
									</v-col>
									<v-col cols="4" sm="12" class="pa-0" v-else>
										<v-btn
											text
											to="/user/modify"
											class="pa-0 pl-4 pl-md-0 btn_setting"
										>
											<v-img
												class="mr-1"
												width="14"
												height="14"
												:src="require('@/assets/img/icon/icon_setting.png')"
												eager
											/>
											회원정보수정
										</v-btn>
									</v-col>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'UserInfo',
	data: ()=>({
	}),
    components: {
    },
	computed: {
		...mapGetters([
			'AUTH_GET_USER',
			'USER_GET_SCRAP',
		])
	},
	watch: {
	},
    created(){
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style scoped lang="scss">
// 회원정보영역
.user_bar{
	background-color:#f8f8f8;
	.user{
		padding:16px 20px !important;
		border-radius:4px;
		background-color:#fff;
		.avatar{
			min-width:44px !important;
			min-height:44px !important;
			width:44px !important;
			height:44px !important;
		}
		.name{
			font-family:'NotoSansKR-Bold' !important;
			font-size:18px;
			color:#262626;
			span{font-family:'NotoSansKR-Regular' !important;}
		}
		.email{
			font-family:'NotoSansKR-Regular' !important;
			font-size:14px;
			color:#7f7f7f;
		}
		.align{text-align:right;}
		.btn_setting{
			font-family:'NotoSansKR-Regular' !important;
			font-size:14px;
		}
		.v-btn:not(.v-btn--round).v-size--default{
			min-height:14px;
			height: 14px;
		}
	}
}


@media all and (min-width:981px) and (max-width:1280px){}
@media all and (min-width:769px) and (max-width:980px){}
@media all and (min-width:600px) and (max-width:768px){}
@media all and (min-width:380px) and (max-width:599px){
	.user_bar{
		.user{
			padding:10px 14px !important;
			border-radius:4px;
			.name{font-size:15px;}
			.email{font-size:12px;}
			.align{text-align:left;}
			.btn_setting{font-size:12px;}
		}
	}
}
@media all and (max-width:380px){
	.user_bar{
		.user{
			padding:10px 14px !important;
			border-radius:4px;
			.name{font-size:15px;}
			.email{font-size:12px;}
			.align{text-align:left;}
			.btn_setting{font-size:12px;}
		}
	}
}
</style>

