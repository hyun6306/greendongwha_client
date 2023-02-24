<template>
    <ul class="flag d-flex pa-0">
        <li class="best" v-if="items.popitem_yn === 'Y'">Best</li>
        <li class="new" v-if="items.new_yn === 'Y'">신제품</li>
    </ul>
</template>

<script>
export default {
    name: 'Flag',
	props:[
        'items'
    ],
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
.flag{
	li{
        width:60px;
        padding:5px 0;
        margin-right:5px;
        text-align:center;
        background-color:#f8f8f8;
        border-radius:18px;
        list-style:none;
        font-family:'NotoSansKR-Regular';
        font-size:13px;
        &.best{color:#262626;}
        &.new{color:#fa2a6f;}
	}
}
</style>

