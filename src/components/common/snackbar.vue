<template>
    <v-snackbar
        v-model="snackbar"
        color="primary"
    >
        <span class="snackbar_text">{{ APP_GET_SNACKBAR.title }}</span>

        <template v-slot:action="{ attrs }">
            <v-btn
                v-if="APP_GET_SNACKBAR.action"
                color="white"
                text
                v-bind="attrs"
                :to="APP_GET_SNACKBAR.action.link"
            >
                <span class="snackbar_text"s>{{APP_GET_SNACKBAR.action.name}}</span>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Snackbar',
	props:{
	},
	data: ()=>({
        onSnackbar: false
	}),
    components: {
    },
	computed:{
		...mapGetters([
			'APP_GET_SNACKBAR'
		]),
        snackbar(){
            return !this.APP_GET_SNACKBAR ? false : true
        }
	},
	watch: {
        APP_GET_SNACKBAR(value){
			if(value != null && !this.onSnackbar ) {
				this.resetSnackbar()
			}
		}
	},
    created(){
    },
    mounted(){
    },
    methods:{
		...mapMutations([
			'APP_MU_SNACKBAR'
		]),
	    resetSnackbar(){
			this.onSnackbar = true
		    setTimeout(() => {
				this.onSnackbar = false
			    this.APP_MU_SNACKBAR(null)
		    }, 3000)
	    }
    }
}
</script>
<style scoped lang="scss">
.snackbar_text{
	font-size: 1.1rem;
}
</style>

