<template>
    <div>
        <v-col class="circle" align="center">
            <p class="step_num" v-if="number">{{number}}</p>
            <v-img
                v-if="image"
                class="mt-5 mt-sm-9"
                width="48"
                :src="image"
                eager
            >
            </v-img>
        </v-col>
        <div class="text">
            <p v-if="title">{{title}}</p>
            <span v-if="text">{{text}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card01',
	props:[
		'number',
        'image',
        'title',
        'text'
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
.circle{
    width:120px;
    height:120px;
    margin:0 auto 8px !important;
    position:relative !important;
    background-color:#f8f8f8 !important;
    border-radius:50%;
    .step_num{
        position:absolute;
        top:10px;
        left:50%;
        transform: translateX(-50%);
        font-family:'Roboto-Bold' !important;
        font-size:18px !important;
        color:#42883d !important;
    }
}
.text{
    display:block;
    word-break:keep-all;
    p{
        font-family:'NotoSansKR-Regular' !important;
        font-size:16px !important;
        color:#262626 !important;
        line-height:1.5 !important;
        text-align:center !important;
        word-break:keep-all;
    }
    span{
        font-family:'NotoSansKR-Regular' !important;
        font-size:14px !important;
        color:#555 !important;
        text-align:center !important;
        word-break:keep-all;
    }
}

@media all and (max-width:600px) {
    .circle {
        width:75px !important;
        height:75px !important;
        .step_num {font-size:14px !important;}
        .v-image{width:30px !important;}
    }
    .text {
        p {font-size:12px !important;}
        span {font-size:12px !important;}
    }
}
</style>

