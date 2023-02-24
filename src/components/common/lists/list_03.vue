<template>
    <div>
	    <v-card color="#f3f6f3" elevation="0" tile>
		    <v-row class="ma-0" align="center">
			    <v-col cols="2">
				    <v-checkbox
					    v-model="allCheck"
					    hide-details
					    color="primary"
					    class="ma-0"
					    :style="readonly !== undefined? 'display: none;': ''"
				    />
			    </v-col>
			    <v-col cols="auto" align="start">
				    <p class="list_value_title">{{items.title}}</p>
			    </v-col>
		    </v-row>
	    </v-card>
	    <v-card class="list_bg" elevation="0" tile>
		    <v-list class="pa-0" >
			    <v-row class="ma-0">
				    <v-col cols="12" class="pa-0">
					    <v-list-item-group
						    v-model="model"
						    active-class="primary--text"
						    multiple
					    >
						    <template v-for="(item, i) in items.subMenu">
							    <v-list-item
								    :key="i"
								    :disabled="readonly !== undefined"
								    :class="readonly !== undefined? '': 'list_item'"
							    >
								    <template v-slot:default="{ active }">
									    <v-col class="pa-0">
										    <v-row class="ma-0" align="center">
											    <v-col cols="3" align="center" justify="center" class="pa-0">
												    <v-checkbox
													    :input-value="active"
													    hide-details
													    color="primary"
													    class="ma-0"
													    :style="readonly !== undefined? 'display: none;': ''"
												    />
											    </v-col>
											    <v-col cols="9" align="start" class="list_value_text pa-0">
												    {{ item.title }}
											    </v-col>
										    </v-row>
									    </v-col>
								    </template>
							    </v-list-item>
						    </template>
					    </v-list-item-group>
				    </v-col>
			    </v-row>
		    </v-list>
	    </v-card>
    </div>
</template>

<script>
import model from '@/mixins/model'

export default {
    name: 'List_03',
	data: ()=>({
		allCheck: false
	}),
    props:[
        'items',
        'readonly',
    ],
    mixins:[
        model
    ],
	computed: {
		menuItem(){
			if(this.readonly !== undefined){
				let item = []
				if(this.model.length === 0) return item
				this.model.forEach(element => item.push(this.items.subMenu[element]))
				return item
			}
			return this.items.subMenu
		}
	},
	watch: {
		allCheck(val){
			console.log('allCheck', val)
			console.log('this.model', this.model)
			if(val) {
				// this.model = [0,1,2,3,4]
				console.log(this.items.subMenu)
				for( let i of this.items.subMenu) {
					this.model.push(this.items.subMenu.indexOf(i))
				}
				console.log('this.model', this.model)
			}else{
				this.model = []
			}
		}
	},
    created(){
    },
    mounted(){
    },
	destroyed(){
	},
    methods:{
	    // allCheck(value){
		// 	console.log('value', value)
		// 	let selectItems = []
		//     this.items.subMenu.forEach((element, i) => {
		// 	    this.model.push(element)
		//     })
		// 	this.$emit('select', selectItems)
	    // }
    }
}
</script>
<style scoped lang="scss">
.list{
    &_bg {
        overflow: hidden;
        overflow-y: auto;
	    border-left: 1px solid #dfe3df;
	    border-right: 1px solid #dfe3df;
	    border-bottom: 1px solid #dfe3df;
    }
	&_title {
		font-size: 1.2rem;
		font-family: 'NotoSansKR-Bold';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
	&_text {
		font-size: 1rem;
		font-family: 'NotoSansKR-Regular';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
	&_item{
		border-top:1px solid #ccc;
		&:first-child {
			border-top:none;
		}
	}
    &_value {
        &_title {
            font-family: 'NotoSansKR-Bold';
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
        }

        &_text {
            font-family: 'NotoSansKR-Regular';
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
        }
    }
}
.list_header{
	background-color: #F1F2F3;
	border:1px solid #ccc;
}
::-webkit-scrollbar {
    display: none !important;
	z-index: 10000;
	-webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
	width: 10px;
}
::-webkit-scrollbar:horizontal {
	height: 10px;
}
::-webkit-scrollbar-track {
	background: #ededed;
	border-radius: 0;
}
::-webkit-scrollbar-thumb {
	background: #92a99b;
	border-radius: 5px;
}
</style>

