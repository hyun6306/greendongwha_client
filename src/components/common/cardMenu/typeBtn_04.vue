<template>
	<!-- 컨텐츠 토글버튼 -->
	<v-btn-toggle
		v-model="model"
        mandatory
		class="d-inline flex"
	>
		<v-row class="ma-0 px-5" justify="center">
			<v-col
				v-for="(item, n) in typeItems"
				:key="n"
				cols="4"
				sm="3"
				align="center"
				class="pa-0 type_btn_04"
			>
				<v-btn
                    elevation="0"
					class="btn_toggle pa-0"
				>
					<v-col align="center" class="pa-0">
						<p
                            class="type_btn_04_text"
                            :class="model === n ? 'type_btn_04_text_select':''"
                        >
                            {{item.title}}
                        </p>
					</v-col>
				</v-btn>
			</v-col>
		</v-row>
	</v-btn-toggle>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'TypeBtn04',
	props:[
		'typeItems'
	],
	mixins:[
		model
	],
	data: () => ({
	}),
	computed: {
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
.type_btn_04{
    .v-btn{
		background-color:transparent !important;
    }
	.v-btn.v-btn.v-size--default{
		// min-width:60px !important;
		height:30px !important;
	}
	.v-btn.v-item--active.v-btn--active{
		background-color:#fff !important;
		border-top-left-radius:30px;
		border-top-right-radius:30px;
		border-bottom-left-radius:30px;
		border-bottom-right-radius:30px;

	}
	.type_btn_04_text{
		padding:0 10px !important;
		font-family:'NotoSansKR-Regular';
		font-size:16px;
		color:#dddddc;
        &_select{
			font-family:'NotoSansKR-Bold' !important;
            color:#262626;
        }
	}
}
@media all and (min-width:981px) and (max-width:1280px){}
@media all and (min-width:769px) and (max-width:980px){
	.type_btn_04{
		.v-btn.v-btn.v-size--default{
			min-width:60px !important;
			height:27px !important;
		}
		.type_btn_04_text{font-size:15px !important;}
	}
}
@media all and (min-width:380px) and (max-width:768px){
	.type_btn_04{
		.v-btn.v-btn.v-size--default{
			min-width:60px !important;
			height:27px !important;
		}
		.type_btn_04_text{font-size:14px !important;}
	}
}
@media all and (max-width:380px){
	.type_btn_04{
		.v-btn.v-btn.v-size--default{
			min-width:60px !important;
			height:27px !important;
		}
		.type_btn_04_text{font-size:14px !important;}
	}
}
</style>
