<template>
    <div>
	    <v-row class="ma-0" align="center">
		    <v-col cols="6" align="start" class="list_title">
			    {{title}}
			    <v-btn
				    class="pa-0"
				    icon
				    :to="link"
			    >
				    <v-icon>mdi-dock-window</v-icon>
			    </v-btn>
		    </v-col>
		    <v-col cols="6" align="end" class="list_count">
			    {{countTitle}}: {{count}}{{countUnit}}
		    </v-col>
	    </v-row>
	    <v-row class="ma-0 list_header" v-if="headerTitleLeft || headerTitleRight">
		    <v-col :cols="left" align="center" class="list_header_title" v-show="headerTitleLeft">
			    {{ headerTitleLeft }}
		    </v-col>
		    <v-col :cols="right" align="center" class="list_header_title" v-show="headerTitleRight">
			    {{ headerTitleRight }}
		    </v-col>
	    </v-row>
        <v-card :height="listHeight || 330" class="list_bg" elevation="1">
            <v-list>
                <v-list-item-group
                    v-model="model"
                    active-class="pink--text"
                >
                    <template v-for="(item, i) in items">
                        <v-list-item :key="i" class="list_item">
                            <v-col class="pa-0" cols="12">
                                <v-row class="ma-0">
                                    <v-col :cols="left" align="start" class="list_value_title">
                                        {{ item.title }}
                                    </v-col>
                                    <v-col :cols="right" align="start" class="list_value_text">
                                        {{ item.value }}
                                    </v-col>
                                </v-row>
                            </v-col>
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
    name: 'List_01',
	data: ()=>({
	}),
    props:[
        'title',
        'countTitle',
        'countUnit',
        'link',
	    'headerTitleLeft',
	    'headerTitleRight',
	    'left',
	    'right',
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
        }
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

