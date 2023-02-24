<template>
	<v-card
		class="ma-3 pa-0 card_type"
		elevation="0"
		@click="onClick"
	>
		<v-col class="pa-0 px-2">
			<div class="pt-5 pb-3">
				<p class="product">{{menu.kind_name}}</p>
				<p class="date">{{menu.date}}</p>
			</div>

			<v-divider/>

			<div class="py-2 state">
				<p class="state">{{menu.progress_state_name}}</p>
				
			</div>
		</v-col>
		
	</v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	name: 'UserUserASCard',
	props:['menu'],
	data: () => ({
	}),
	computed: {
	},
	created(){
	},
	mounted(){
	},
	methods:{
        ...mapMutations([
            'USER_MU_AS_SELECT'
        ]),
		onClick(){
			// this.$emit('submit', this.menu)
            this.USER_MU_AS_SELECT(this.menu)
            this.$router.push(`/user/listDetail/2`)
		},
	}
}
</script>

<style scoped lang="scss">
.card_type{
	width:190px;
	height:120px;
	border-radius:10px;
	box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 5%), 0px 2px 2px 0px rgb(0 0 0 / 5%), 0px 1px 5px 0px rgb(0 0 0 / 10%) !important;
}
.product{
	font-family: 'NotoSansKR-Bold' !important;
	font-size:15px !important;
	color:#262626;
}
.date{ 
	font-family: 'NotoSansKR-Regular' !important;
	font-size:14px !important;
	color:#262626;
}
.state{
	font-family: 'NotoSansKR-Regular' !important;
	font-size:14px !important;
	color:#f97729;
}

</style>
