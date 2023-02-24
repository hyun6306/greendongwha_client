<template>
	<v-row class="ma-0" align="center">
		<v-col cols="10" sm="6" md="4" xl="3" class="pl-0">
			<v-row class="ma-0">
				<v-col cols="4" class="pa-0 pr-2" v-if="hide !== '등록'">
					<v-btn
						color="primary"
						block
						tile
						elevation="0"
						@click="$emit('callCreate')"
                        :disabled="selectCreate !== undefined ? selectModel.length !== 1: false"
					>
						<v-icon>add</v-icon>
						<span class="hidden-md-and-down ml-2">등록</span>
					</v-btn>
				</v-col>
				<v-col cols="4" class="pa-0" v-if="hide !== '삭제'">
					<v-btn
						color="error"
						block
						tile
						elevation="0"
						:disabled="!checkRemoveModel"
						@click="$emit('callConfirmRemove')"
					>
						<v-icon>delete</v-icon>
						<span class="hidden-md-and-down ml-2">삭제</span>
					</v-btn>
				</v-col>
			</v-row>
		</v-col>
		<v-spacer/>
		<v-col cols="2" class="pa-0" v-if="hide !== '노출순서'">
            <v-row class="ma-0" justify="end">
                <v-col cols="12" md="8" class="pa-0">
                    <v-btn
                        color="olive"
                        dark
                        block
                        tile
                        elevation="0"
                        :disabled="dessertsLength === 0"
                        @click="$emit('callOpenOrder')"
                    >
                        <v-icon>mdi-swap-vertical-bold</v-icon>
                        <span class="hidden-md-and-down ml-2">노출순서</span>
                    </v-btn>
                </v-col>
            </v-row>
		</v-col>
	</v-row>
</template>

<script>
export default {
    name: 'AdminTableTopBar',
	data: ()=>({
	}),
    props:[
        'selectModel',
        'checkRemoveModel',
        'dessertsLength',
        'hide',
        'selectCreate',
    ],
    components: {
    },
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
.title {
	&_bg {
		border-radius: 0;
	}

	&_title {
		line-height: 3rem;
		font-size: 1.2rem;
		font-family: 'NotoSansKR-Bold';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
}
</style>

