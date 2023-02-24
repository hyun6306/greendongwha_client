<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		persistent
		transition="dialog-bottom-transition"
	>
		<v-card
			v-if="loading"
			class="fill-height"
		>
			<v-row
				class="ma-0 fill-height"
				align="center"
				justify="center"
			>
				<v-col
					cols="12"
					class="px-0"
					align="center"
				>
					<h3>내용을 저장하고 있습니다.</h3>
					<h3 class="pb-5">잠시만 기다려주세요.</h3>
					<CommonLoaderCircle01 color="primary" />
				</v-col>
			</v-row>
		</v-card>
		<v-card v-else>
			<v-container class="pa-0 editor_wrap">
				<v-row class="ma-0">
					<v-col
						cols="12"
						class="px-0"
					>
						<v-col class="px-0 pt-3 editor_topbar">
							<v-row class="ma-0">
								<v-btn
									color="primary"
									@click="dialogViewer = true"
								>
									viewer
								</v-btn>
								<v-spacer />
								<v-btn
									class="mr-2"
									color="error"
									@click="cancelEditor"
								>
									취소
								</v-btn>
								<v-btn
									color="secondary"
									@click="saveEditor"
								>
									저장
								</v-btn>
							</v-row>
						</v-col>
						<v-col
							cols="12"
							justify="center"
							class="px-0"
						>
							<quill-editor
								ref="myQuillEditor"
								v-model="contents"
								:options="editorOption"
								@blur="onEditorBlur($event)"
								@focus="onEditorFocus($event)"
								@ready="onEditorReady($event)"
							/>
						</v-col>
					</v-col>
				</v-row>
				<CommonEditorQuillViewerDialog
					:dialog="dialogViewer"
					:html="contents"
					@close="dialogViewer = false"
				/>
				<CommonConfirm
					:dialog="confirmRemove"
					:title="'작업물 삭제'"
					:text="`저장하지 않고 나가게 되시면 지금까지 작업했던 모든 내용이 삭제 됩니다. <br/> 그래도 나가시겠습니까?`"
					@close="confirmRemove = false"
					@submit="$emit('close')"
				/>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'CommonQuillEditorDialog',
	props: ['dialog', 'editContents'],
	data: () => ({
		loading: false,
		dialogViewer: false,
		confirmRemove: false,
		contents: '',
		editorOption: {
			modules: {
				VideoResize: {
					modules: ['Resize'],
					tagName: 'iframe', // iframe | video
					toolbarButtonStyles: {
						borderRadius: '5px',
					},
				},
				imageCompress: {
					quality: 0.8, // default
					maxWidth: 1000, // default
					maxHeight: 2400, // default
					imageType: 'image/jpeg', // default
					debug: true, // default
					suppressErrorLogging: false, // default
				},
				toolbar: [
					// [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					[{ header: 1 }, { header: 2 }],
					['bold', 'italic', 'underline'],
					// ['blockquote', 'code-block'],
					// [{ 'list': 'ordered'}, { 'list': 'bullet' }],
					// [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
					// [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
					// [{ 'direction': 'rtl' }],                         // text direction

					// [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

					[{ color: [] }, { background: [] }], // dropdown with defaults from theme
					// [{ 'font': fontNames }],
					['link', 'image', 'video'],
					[{ align: [] }],

					// ['clean']                                         // remove formatting button
				],
			},
			theme: 'snow',
		},
		viewer: null,
	}),
	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill
		},
	},
	watch: {
		contents(val) {
			console.log('contents', val)
		},
	},
	mounted() {
		console.log('this is current quill instance object', this.editor)

		// ql-editor inner height / window innerHeight size에 맞게 수정
		if (this.editContents) this.contents = this.editContents
		let editorContens = document.querySelector('.ql-editor')
		editorContens.style.height = `${window.innerHeight - 150}px`
	},
	destroyed() {},
	methods: {
		onEditorBlur(quill) {
			console.log('editor blur!', quill)
		},
		onEditorFocus(quill) {
			console.log('editor focus!', quill)
		},
		onEditorReady(quill) {
			console.log('editor ready!', quill)
		},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text)
			this.contents = html
		},
		saveEditor() {
			this.loading = true
			this.$emit('save', this.contents)
			this.$emit('close')
		},
		cancelEditor() {
			if (this.contents.length) return (this.confirmRemove = true)
			this.$emit('close')
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.quill-editor iframe),
:deep(.quill-editor video) {
	pointer-events: none;
	width: 100%;
}
:deep(.quill-editor) {
	margin: 0 auto;
	width: 800px;
	//min-height: 600px;
	margin-top: 75px;

	img {
		width: 100%;
	}
}
:deep(.quill-editor .ql-toolbar) {
	position: fixed;
	z-index: 100;
	background: white;
	top: 60px;
	width: 800px;
}
:deep(.quill-editor .ql-editor) {
	//height: 800px;
	overflow: auto;
}
.editor_wrap {
	max-width: 800px;
}
.editor_topbar {
	position: fixed;
	z-index: 100;
	background: white;
	top: 0;
	width: 800px;
}
</style>
