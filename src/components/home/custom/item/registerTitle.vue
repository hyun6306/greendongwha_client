<template>
    <div class="head py-5 py-sm-7">
        <h3 v-if="title">{{title}}</h3>
        <p v-if="text">{{text}}</p>
        <span v-if="subText">{{subText}}</span>
    </div>
</template>

<script>
export default {
    name: 'CustomRegisterTitle',
	data: ()=>({
	}),
    props:[
        'title',
        'text',
        'subText',
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
.head {
    width: 100% !important;
    word-break: keep-all !important;
    color: #262626 !important;
    line-height: 1.5;
    h3 {
        font-family: 'NotoSansKR-Regular' !important;
        font-size:24px !important;
    }
    p {
        margin-top: 20px !important;
        font-family: 'NotoSansKR-Regular' !important;
        font-size: 16px !important;
        color:#262626;
    }
    span {
        font-family: 'NotoSansKR-Regular' !important; 
        font-size: 16px !important;
        color: #777 !important;
    }
    border-bottom: 2px solid #262626 !important;
}
@media all and (max-width:767px) {
    .head {
        h3 {
            font-size: 18px !important;
            margin-bottom: 10px !important;
        }
        p {font-size: 12px !important;}
        span {
            font-size: 12px !important;
        }
    }
}
</style>

