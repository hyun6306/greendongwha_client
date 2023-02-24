<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="800"
	>
		<v-card>
			<v-col>
				<v-row
					class="ma-0 pt-2 mx-3"
					align="center"
				>
					<h3>Viewer</h3>
					<v-spacer />
					<v-btn
						icon
						fab
						small
						@click="$emit('close')"
					>
						<v-icon>close</v-icon>
					</v-btn>
				</v-row>
			</v-col>
			<v-col v-if="html !== null">
				<v-card class="quill-viewer pa-5">
					<div v-html="html"></div>
				</v-card>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script>
import common from '@/mixins/common'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
	name: 'CommonQuillViewerDialog',
	mixins: [common],
	props: ['dialog', 'html'],
	data: () => ({}),
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss">
//:deep() .ql-font ql-picker ql-expanded [data-label="Roboto"]::before{
//  font-family: 'Roboto';
//}
//
//:deep() #toolbar-container .ql-font span[data-label="Roboto"]::before {
//  font-family: "Roboto";
//}

:deep(.quill-viewer) {
	width: 100%;
	height: 100%;
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
