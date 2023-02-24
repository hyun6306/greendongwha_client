<template>
	<v-col
		v-if="html !== null"
		class="pa-0"
	>
		<v-card
			class="quill-viewer pa-5"
			elevation="0"
			color="transparent"
		>
			<div v-html="html"></div>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: 'CommonQuillViewerTile',
	props: ['html'],
	data: () => ({}),
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss">
:deep(.quill-viewer) {
	max-width: 800px;

	h1,
	h2,
	p {
		text-align: left;
	}
	img {
		width: 100%;
	}
	iframe,
	video {
		width: 100%;
	}
	.ql-align-left {
		text-align: left;
	}
	.ql-align-right {
		text-align: right;
	}
	.ql-align-center {
		text-align: center;
	}
	.ql-align-justify {
		text-align: justify;
	}
}
</style>
