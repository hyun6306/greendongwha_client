<template>
    <div class="board_list mt-5">
        <v-row class="ma-0">
            <v-col cols="3" sm="2" md="1" class="pa-0 arrow tac" align-self="center">이전</v-col>
            <v-col cols="9" sm="9" md="11" class="pa-0 pr-5 title" align-self="center">
                <span class="clickCursor" v-if="prevItem.title" @click="$emit('submit', prevItem)">
                    {{ prevItem.title }}
                </span>
                <span v-else>공지사항은 없습니다.</span>
            </v-col>
        </v-row>
        <v-row class="ma-0">
            <v-col cols="3" sm="2" md="1" class="pa-0 arrow tac" align-self="center">다음</v-col>
            <v-col cols="9" sm="9" md="11" class="pa-0 pr-5 title" align-self="center">
                <span class="clickCursor" v-if="nextItem.title" @click="$emit('submit', nextItem)">
                    {{ nextItem.title }}
                </span>
                <span v-else>공지사항은 없습니다.</span>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'CustomNoticePrevNext',
    props:['prevItem', 'nextItem'],
	data: ()=>({
	}),
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
@mixin ellipsis {
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}

.board_list{
    border-top:1px solid #262626;
    border-bottom:1px solid #262626;
    .row{
        padding:15px 0;
        &:first-child{border-bottom:1px solid #ccc;}
        .arrow{
            font-family:'NotoSansKR-Bold' !important;
            font-size:15px !important;
            color:#262626;
        }
        .title{
            @include ellipsis;
            font-family: 'NotoSansKR-Regular' !important;
            font-size:15px !important;
            color:#5f6062;
        }
    }
}
</style> 