<template>
    <v-menu offset-y>
	    <template v-slot:activator="{ on, attrs }">
		    <v-btn
			    color="primary"
			    dark
			    v-bind="attrs"
			    v-on="on"
			    text
		    >
			    <v-icon>{{icon}}</v-icon>
		    </v-btn>
	    </template>
	    <v-list
		    elevation="0"
	    >
		    <v-list-item
			    v-for="(item, i) in items"
			    :key="i"
			    dense
			    class="menu_list"
			    @click="$emit('submit', item)"
		    >
			    <v-list-item-title>{{ item.text }}</v-list-item-title>
		    </v-list-item>
	    </v-list>
    </v-menu>
</template>

<script>
import model from '@/mixins/model'
import share from '@/mixins/share'

export default {
    name: 'Menu_01',
	data: ()=>({
	}),
    props:[
        'icon',
        'items',
    ],
    mixins:[ model, share ],
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
.v-btn{
	box-shadow:none !important;
	min-width:40px !important;
	height:40px !important;
	padding:0 !important;
	background-color:transparent !important;
	.v-icon {
		color: #414141 !important;
	}
	&:hover{
		background-color:#42883d !important;
		.v-icon {
			color: #fff !important;
		}
	}
}

</style>

