<template>
	<v-container class="py-0 fill-height">
		<!--        <v-col
            cols="12"
            align-self="start"
        ></v-col>
        <v-col
            cols="12"
            align-self="center"
            align="center"
        >
            <v-img
                :src="require('@/assets/logo.svg')"
                width="165"
                height="160"
                aspect-ratio="0"
                contain
            />
            <p>문제가 발생하였습니다.</p>
            <p>서비스 접근 경로를 다시 한번 확인 바랍니다.</p>
            <p>새로고침을 해주세요.</p>
        </v-col>
        <v-col
            cols="12"
            align-self="end"
            class="pa-4"
        >
            <v-btn
                dark
                block
                x-large
                color="primary"
                rounded
                to="/"
            >
                새로 고침
            </v-btn>
        </v-col>-->
	</v-container>
</template>

<script>
export default {
	name: 'Error',
	created() {
		// 잘못된 경로일 경우 main페이지로
		this.$router.push('/').catch(() => {})
	},
}
</script>

<style scoped></style>
