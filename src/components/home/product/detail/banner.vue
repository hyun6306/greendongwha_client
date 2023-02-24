<template>
    <v-col cols="12" class="pa-0 product_banner" align="center">
        <v-img
            :src="items.mainImage"
            height="200"
            eager
        >
            <div class="text">
                <span class="pt-10">{{items.slogan}}</span>
                <h4>{{items.title}}</h4>
                <p> {{items.description}} </p>
            </div>
        </v-img>
    </v-col>
</template>

<script>
export default {
    name: 'HomeProductDetailBanner',
	data: ()=>({
	}),
    props:[
        'items',
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
.mo_only{display:none !important;}

.product_banner{
    position:relative;
    width:100%;
    height:200px !important;
    background-position: center;
    span{
        display:inline-block;
        font-family:'NotoSansKR-Regular' !important;
        font-size: 15px !important;
        color:#4e4e4e !important;
        opacity: 1 !important;
    }
    h4{
        font-family: 'NotoSansKR-Bold' !important;
        font-size:30px !important;
        opacity: 1 !important;
    }
    p{
        font-family:'NotoSansKR-Regular' !important;
        font-size: 16px !important;
        opacity: 1 !important;
    }
    .opacity{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:#fff !important;
        opacity:0.8;
    }
}
@media all and (min-width:380px) and (max-width:768px){
    .product_banner{
        background-position: right 0;
        text-align:left;
        span{
            padding-left:20px !important;
            font-size:12px !important;
        }
        h4{
            padding-left:20px !important;
            font-size:20px !important;
        }
        p{ 	padding-left:20px !important;
            font-size: 13px !important;
        }
    }
}
@media all and (max-width:380px) {
    .pc_only{display:none !important;}
    .mo_only{display:block !important;}

    .product_banner{
        background-position: right 0;
        text-align:left;
        span{
            padding-left:20px !important;
            font-size:12px !important;
        }
        h4{
            padding-left:20px !important;
            font-size:20px !important;
        }
        p{ 	padding-left:20px !important;
            font-size: 13px !important;
        }
    }
}
</style>

