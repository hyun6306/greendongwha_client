<template>
	<v-col class="pa-0">
	    <template v-slot:item.showDate="{ item, header }">
	        <td
	            class="grid_text"
	            :style="`max-width:${header.width}`"
	        >
	            {{item.showDate.join('~')}}
	        </td>
	    </template>
	    <template v-slot:item.state="{ item, header }">
	        <td
	            class="grid_text"
	            :style="`max-width:${header.width}`"
	        >
	            <p v-if="item.state">ON</p>
	            <p v-else>OFF</p>
	        </td>
	    </template>
	    <template v-slot:item.title="{ item, header }">
	        <td
	            class="grid_text"
	            :style="`max-width:${header.width}`"
	        >
	            {{item.title}}
	        </td>
	    </template>
	    <template v-slot:item.content="{ item, header}">
	        <td
	            class="admin_grid_contents"
	            :style="`max-width:${header.width};`"
	            @click="expanded=[item]"
	        >
	            <p v-html="item.content"/>
	        </td>
	    </template>
	    <template v-slot:item.thumbnail="{ item }">
	        <v-btn
	            v-if="item.thumbnail"
	            outlined
	            :href="item.thumbnail"
	            target="_blank"
	        >
	            <span class="grid_text">썸네일 확인</span>
	        </v-btn>
	    </template>
	    <template v-slot:item.image="{ item }">
	        <v-btn
	            v-if="item.image"
	            outlined
	            :href="item.image"
	            target="_blank"
	        >
	            <span class="grid_text">이미지 확인</span>
	        </v-btn>
	    </template>
	    <template v-slot:item.link="{ item }">
	        <v-btn
	            v-if="item.link"
	            outlined
	            :href="item.link"
	            target="_blank"
	        >
	            <span class="grid_text">링크 확인</span>
	        </v-btn>
	    </template>
        <template v-slot:item.file="{ item }">
            <v-btn
                v-if="item.file"
                outlined
                @click="common_onLink(item.file)"
            >
                <span class="admin_grid_text">파일 확인</span>
            </v-btn>
        </template>
	    <template v-slot:item.data-read="{ item }">
	        <v-btn
	            icon
	            @click="$emit('open', item)"
	        >
	            <v-icon>mdi-eye-settings</v-icon>
	        </v-btn>
	    </template>
	    <template v-slot:item.data-edit="{ item }">
	        <v-btn
	            icon
	            @click="$emit('edit', item)"
	        >
	            <v-icon>mdi-pencil</v-icon>
	        </v-btn>
	    </template>

	    <!-- 베스트 제품 -->
	    <template v-slot:item.data-best="{ item, header }">
		    <v-btn
			    icon
			    @click="$emit('edit', item)"
		    >
			    <v-icon>mdi-pencil</v-icon>
		    </v-btn>
	    </template>

	    <template v-slot:no-data>
	        NO DATA HERE!
	    </template>
	</v-col>
</template>

<script>

export default {
    name: 'GridTypeHeader01',
    props: [
        'item',
        'headers'
    ],
	data: ()=>({
	}),
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
</style>

