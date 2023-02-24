<template>
    <v-col cols="12" md="10" class="td" align="start">
        <div class="tit" v-if="item.notice_kind === '2'">
            <span class="tag news">뉴스</span>
            <span v-if="item.title">{{ item.title }}</span>
        </div>
        <div class="tit" v-else>
            <span class="tag alim">공지</span>
            <span v-if="item.title">{{ item.title }}</span>
        </div>
    </v-col>
</template>

<script>
export default {
    name: 'CustomNoticeTag',
    props:['item'],
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
.tit{
    position:relative;
    padding-left:40px;
}
.tag{
    display:inline-block;
    position:absolute;
    left:0;
    height:20px;
    min-width:34px;
    font-family: 'NotoSansKR-Regular' ;
    font-size:12px ;
    text-align:center;
    color: #fff;
    &.news{background-color:#42883d;}
    &.alim{background-color:#0f2e73;}
}
</style> 