<template>
    <v-row class="ma-0" justify="center">
        <v-btn-toggle
            v-model="model"
            mandatory
        >
            <v-col
                v-for="(item, n) in typeItems"
                :key="n"
                cols="6"
                align="center"
                class="pa-0 type_btn_01"
            >
                <v-btn
                    :color="model === n ? 'primary':''"
                    block
                >
                    <v-icon
                        v-if="model === n"
                        color="white"
                    >
                        check
                    </v-icon>
                    <p>{{item.title}}</p>
                </v-btn>
            </v-col>
        </v-btn-toggle>
    </v-row>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'TypeBtn01',
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

<style lang="scss" scoped>
.type_btn_01{
    .v-btn{
        border-radius:0 !important;
        width:100px !important;
        height:30px !important;
        font-family:'NotoSansKR-Regular' !important;
        font-size:16px !important;
        background-color:#a0a1a5 !important;
        color: #fff !important;
    }
    .v-btn.primary{background-color:#00592d !important;}
}
</style>
