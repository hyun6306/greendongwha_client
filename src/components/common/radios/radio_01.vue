<template>
    <v-col class="pa-0" align="center">
        <v-radio-group
            v-model="model"
            :readonly="readonly"
            :disabled="disabled"
            row
            hide-details
            dense
        >
            <v-radio
                label="ON"
                :value="'Y'"
            ></v-radio>
            <v-radio
                label="OFF"
                :value="'N'"
            ></v-radio>
        </v-radio-group>
    </v-col>
</template>

<script>
import model from '@/mixins/model'

export default {
    name: 'Radio_01',
	props:[
		'readonly',
		'disabled',
	],
	data: ()=>({
	}),
    mixins:[
        model
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
.v-input--selection-controls{
    margin-top: 0;
}
</style>

