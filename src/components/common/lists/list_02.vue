<template>
    <div>
	    <v-row class="ma-0 list_header">
		    <v-col cols="12" align="center" class="list_header_title">
                <v-row class="ma-0" align="center">
                    <v-col cols="8" align="start" class="list_count pa-0">
                        <span class="list_title">{{ title }}</span> ({{count}})
                        <v-btn
                            icon
                            @click="$emit('callCreate')"
                        >
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            :disabled="!checkRemoveModel"
                            @click="$emit('callConfirmRemove')"
                        >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="4" align="end" class="list_count pa-0">
                        <v-btn
                            icon
                            :disabled="count === 0"
                            @click="$emit('callOpenOrder')"
                        >
                            <v-icon>mdi-swap-vertical-bold</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
		    </v-col>
	    </v-row>
        <v-card :height="listHeight || 330" class="list_bg " elevation="1">
            <v-list class="pa-0" >
                <v-list-item-group
	                v-model="checkItem"
                    active-class="pink--text"
	                multiple
                >
                    <template v-for="(item, i) in items">
                        <v-list-item :key="i" class="list_item">
	                        <template v-slot:default="{ active }">
                                <v-col class="pa-0" cols="12">
                                    <v-row class="ma-0" align="center">
	                                    <v-col cols="2" align="center" justify="center" class="pa-0">
	                                        <v-checkbox
		                                        :input-value="active"
	                                            hide-details
	                                            color="primary"
	                                            class="ma-0"
	                                        ></v-checkbox>
	                                    </v-col>
	                                    <v-col cols="2" align="start" class="list_value_title pa-0">
	                                        {{ i+1 }}
	                                    </v-col>
	                                    <v-col cols="4" align="start" class="list_value_title pa-0">
	                                        {{ item.title }}
	                                    </v-col>
	                                    <v-col cols="2" align="end" class="pa-0">
	                                        <v-btn
	                                            icon
	                                            @click="$emit('open', item)"
	                                        >
	                                            <v-icon>mdi-eye-settings</v-icon>
	                                        </v-btn>
	                                    </v-col>
	                                    <v-col cols="2" align="end" class="pa-0">
	                                        <v-btn
	                                            icon
	                                            @click="$emit('edit', item)"
	                                        >
	                                            <v-icon>mdi-pencil</v-icon>
	                                        </v-btn>
	                                    </v-col>
	                                </v-row>
                                </v-col>
	                        </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import model from '@/mixins/model'

export default {
    name: 'List_02',
	data: ()=>({
		listItemModel: null,
		checkItem: []
	}),
    props:[
        'title',
        'link',
	    'listHeight',
        'items',
    ],
    mixins:[
        model
    ],
    components: {
    },
	computed: {
        count(){
            return this.items.length
        },
		checkRemoveModel(){
			return this.model !== null ? this.model.length: false
		},
	},
	watch: {
		model(val){
			console.log('model', val)
		},
		checkItem(val){
			let filterItems = []
			val.forEach(element => filterItems.push(this.items[element]))
			this.model = filterItems
		}
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
.list{
    &_bg {
        overflow: hidden;
        overflow-y: auto;
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
.list_border_top{
    border-top:1px solid #ccc;
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

