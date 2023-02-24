<template>
    <v-card height="470" class="find_store pa-5 pa-md-8">
        <div class="head">
            <p class="mb-2 title tac">가까운 인테리어점 찾기</p>
            <p class="mb-5 mb-md-10 subtitle tac">우리동네 인테리어점을 찾아보세요</p>
        </div>
        <v-container class="pa-0">
            <v-col class="pa-0" align="center">
                <v-img
                    width="100%"
                    :src="require('@/assets/img/home/main/img_find_store.png')"
                    eager
                />
            </v-col>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'HomeMainStore',
	props:['items'],
	data: ()=>({

	}),
    components: {
    },
    computed:{
    },
    created(){
    },
    mounted(){
    },
    methods:{
    }
}
</script>



<style lang="scss" scoped>
@mixin ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break:keep-all;
    overflow:hidden;
    text-overflow:ellipsis;
}

.find_store{
    border-radius:0 !important;
    background-color:#f4f4f4;
    box-shadow:none !important;
    .v-card{box-shadow:none !important;}
    .head{
        .title{
            font-family:'NotoSansKR-Bold' !important;
            font-size:22px !important;
        }
        .subtitle{
            font-family:'NotoSansKR-Light' !important;
            font-size:15px !important;
            color:#777 !important;
        }
    }
}

@media all and (min-width:600px) and (max-width:959px){
    .find_store{height:340px !important;}
    .v-image{width:240px !important;}
}
@media all and (max-width:600px){
	.find_store{height:340px !important;}
    .v-image{width:240px !important;}
}
</style>
