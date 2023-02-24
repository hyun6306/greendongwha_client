<template>
    <v-card width="100%" class="title_bg" color="#D6DCD8" elevation="0">
	    <v-row align="center" class="ma-0">
		    <v-col align="start" class="title_title ml-5">
			    {{title}}
		    </v-col>
		    <v-spacer/>
		    <v-col align="end" class="mr-1">
			    <v-btn icon @click="$emit('close')">
				    <v-icon>clear</v-icon>
			    </v-btn>
		    </v-col>
	    </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'AdminTitle',
	data: ()=>({
	}),
    props:[
        'title',
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
.title {
	&_bg {
		border-radius: 0;
	}

	&_title {
		line-height: 3rem;
		font-size: 1.2rem;
		font-family: 'NotoSansKR-Bold';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
}
</style>

