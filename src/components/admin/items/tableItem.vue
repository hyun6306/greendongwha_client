<template>
	<v-row
		align="center"
		class="ma-0 table"
		:class="
			textarea !== undefined ||
			fileMulti !== undefined ||
			tagInput !== undefined ||
			textareaButton !== undefined ||
			tagChips !== undefined ||
			toggleButton !== undefined ||
			inputMulti !== undefined ||
			text !== undefined
				? 'fill-height'
				: ''
		"
	>
		<v-col
			:cols="left"
			align="center"
			class="table_title"
			:class="
				textarea !== undefined ||
				fileMulti !== undefined ||
				tagInput !== undefined ||
				textareaButton !== undefined ||
				tagChips !== undefined ||
				toggleButton !== undefined ||
				inputMulti !== undefined ||
				text !== undefined
					? 'fill-height'
					: ''
			"
		>
			{{ title }}
		</v-col>
		<v-col
			:cols="right"
			align="start"
			class="table_text pa-0 px-3"
		>
			<p
				v-if="text"
				v-html="common_textEnter(text)"
			/>

			<CommonInputsInput03
				v-if="input !== undefined"
				v-model="model"
				:readonly="readonly"
				:disabled="disabled"
				:type="inputType"
				:input-check="inputCheck"
				:label="label"
			/>

			<CommonInputsInputFile01
				v-if="file !== undefined"
				v-model="model"
				:placeholder="placeholder ?? 'jpg / png / gif 이미지'"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<CommonInputsInputFile02
				v-if="fileMulti !== undefined"
				v-model="model"
				placeholder="jpg / png / gif 이미지"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<v-textarea
				v-if="textarea !== undefined"
				v-model="model"
				outlined
				hide-details
				class="py-2"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<CommonInputsInputDate01
				v-if="datePicker !== undefined"
				v-model="model"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<CommonInputsInputDate02
				v-if="datePickerOne !== undefined"
				v-model="model"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<CommonSelectsSelect01
				v-if="select !== undefined"
				v-model="model"
				:items="select"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<CommonRadiosRadio01
				v-if="radio !== undefined"
				v-model="model"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<CommonRadiosRadio02
				v-if="radioGroup !== undefined"
				v-model="model"
				:items="radioGroup"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<CommonButtonsButton01
				v-if="button !== undefined && button.link !== undefined"
				height="48"
				outlined
				:name="button.text"
				:color="button.color"
				:disabled="disabled"
				@click="common_onLink(button.link)"
			/>

			<v-row
				v-if="textButton !== undefined"
				class="ma-0 d-flex"
				align="center"
			>
				<v-col
					cols="8"
					class="pa-0 pr-3 hidden-md-and-down table_text_link"
				>
					{{ textButton.text }}
				</v-col>
				<v-col
					cols="12"
					md="4"
					class="pa-0"
				>
					<CommonButtonsButton01
						v-if="textButton.button !== undefined"
						height="40"
						:name="textButton.button.text"
						:color="textButton.button.color"
						:disabled="disabled"
						:href="textButton.button.link"
						class-name="edge"
						target="_blank"
						@click="$emit('click')"
					/>
				</v-col>
			</v-row>

			<CommonButtonsToggleButton01
				v-if="toggleButton !== undefined"
				v-model="model"
				:items="toggleButton"
				:readonly="readonly"
				:disabled="disabled"
			/>

			<v-row
				v-if="inputButton !== undefined"
				class="ma-0 d-flex"
				align="center"
			>
				<v-col
					cols="12"
					md="8"
					class="pa-0 pr-0 pr-md-3 table_text_link"
				>
					<CommonInputsInput03
						v-model="model"
						:readonly="readonly"
						:disabled="disabled"
						:type="inputType"
					/>
				</v-col>
				<v-col
					cols="12"
					md="4"
					class="pa-0"
				>
					<CommonButtonsButton01
						v-if="inputButton.button !== undefined"
						height="42"
						:name="inputButton.button.text"
						:color="inputButton.button.color"
						:disabled="disabled"
						:href="inputButton.button.link"
						class-name="edge"
						target="_blank"
						@click="$emit('click')"
					/>
				</v-col>
			</v-row>

			<v-row
				v-if="textareaButton !== undefined"
				class="ma-0 d-flex"
				align="center"
			>
				<v-col
					cols="12"
					md="10"
					class="pa-0 pr-0 pr-md-3 table_text_link"
				>
					<v-textarea
						v-model="model"
						outlined
						hide-details
						class="py-2"
						height="80"
						:readonly="readonly"
						:disabled="disabled"
					/>
				</v-col>
				<v-col
					cols="12"
					md="2"
					class="pa-0"
				>
					<CommonButtonsButton01
						v-if="textareaButton.button !== undefined"
						height="80"
						:name="textareaButton.button.text"
						:color="textareaButton.button.color"
						:disabled="disabled"
						:href="textareaButton.button.link"
						class-name="edge"
						target="_blank"
						@click="$emit('click')"
					/>
				</v-col>
			</v-row>

			<v-col
				v-if="tagInput !== undefined"
				class="pa-0"
			>
				<v-row
					class="ma-0 pt-1"
					align="center"
				>
					<v-col
						cols="12"
						sm="5"
						md="4"
						class="pa-0 pr-2"
					>
						<CommonSelectsSelect01
							v-model="tagInputGroupSelect"
							:items="filterTagGroup"
							:readonly="readonly"
							:disabled="disabled"
						/>
					</v-col>
					<v-col
						cols="12"
						sm="5"
						md="4"
						class="pa-0 pr-2"
					>
						<CommonSelectsSelect01
							v-model="tagInputItemSelect"
							:items="filterTagItems"
							:readonly="readonly"
							:disabled="disabled"
						/>
					</v-col>
					<v-col
						cols="12"
						sm="2"
						lg="1"
						class="pa-0"
					>
						<v-btn
							dark
							block
							height="40"
							color="olive"
							tile
							elevation="0"
							@click="registerTags()"
						>
							등록
						</v-btn>
					</v-col>
				</v-row>
				<v-col
					v-if="model !== null && model !== []"
					class="pa-0"
				>
					<v-chip-group
						active-class="primary--text"
						column
					>
						<v-chip
							v-for="(item, i) in model"
							:key="i"
							close
							@click:close="removeTags(item)"
						>
							<span v-if="typeof item === 'string'">
								{{ item }}
							</span>
							<span v-else> {{ item.group.text }}_{{ item.tag.text }} </span>
						</v-chip>
					</v-chip-group>
				</v-col>
			</v-col>

			<v-col
				v-if="tagChips !== undefined"
				class="pa-0"
			>
				<v-col
					v-if="model !== null && model !== []"
					class="pa-0"
				>
					<v-chip-group
						active-class="primary--text"
						column
					>
						<v-chip
							v-for="(item, i) in model"
							:key="i"
						>
							<span v-if="typeof item === 'string'">
								{{ item }}
							</span>
							<span v-else> {{ item.group.text }}_{{ item.tag.text }} </span>
						</v-chip>
					</v-chip-group>
				</v-col>
			</v-col>

			<v-col
				v-if="inputSelectItems !== undefined"
				class="pa-0"
			>
				<v-row
					class="ma-0 pt-1"
					align="center"
				>
					<v-col class="pa-0">
						<CommonSelectsSelect02
							v-model="model"
							:items="inputSelectItems"
							label="시공범위"
						/>
					</v-col>
				</v-row>
			</v-col>

			<v-col
				v-if="inputMulti !== undefined"
				class="pa-0"
			>
				<v-row
					class="ma-0 pt-1"
					align="center"
				>
					<v-col
						cols="12"
						sm="5"
						md="4"
						class="pa-0 pr-2"
					>
						<CommonSelectsSelect01
							v-model="inputMultiGroupSelect"
							:items="inputMultiGroup"
						/>
					</v-col>
					<v-col
						cols="12"
						sm="5"
						md="4"
						class="pa-0 pr-2"
					>
						<CommonSelectsSelect01
							v-model="inputMultiItemSelect"
							:items="inputMultiItem"
						/>
					</v-col>
					<v-col
						cols="12"
						sm="2"
						lg="1"
						class="pa-0"
					>
						<v-btn
							dark
							block
							height="40"
							color="olive"
							tile
							elevation="0"
							@click="registerInputMulti()"
						>
							등록
						</v-btn>
					</v-col>
				</v-row>
				<v-col
					v-if="model !== null && model !== []"
					class="pa-0"
				>
					<v-chip-group
						active-class="primary--text"
						column
					>
						<v-chip
							v-for="(item, i) in model"
							:key="i"
							close
							@click:close="removeInputMulti(item)"
						>
							<span v-if="item.product === null">
								{{ item.brand.text }}
							</span>
							<span v-else> {{ item.brand.brand_name }}_{{ item.product.goods_name }} </span>
						</v-chip>
					</v-chip-group>
				</v-col>
			</v-col>
			<v-col
				v-if="inputSelectChips !== undefined"
				class="pa-0"
			>
				<v-col class="pa-0">
					<v-chip-group
						active-class="primary--text"
						column
					>
						<v-chip
							v-for="(item, i) in inputSelectChips"
							:key="i"
						>
							<span v-if="item.product === null">
								{{ item.brand.text }}
							</span>
							<span v-else> {{ item.brand.brand_name }}_{{ item.product.goods_name }} </span>
						</v-chip>
					</v-chip-group>
				</v-col>
			</v-col>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import imageResize from '@/mixins/imageResize'

export default {
	name: 'AdminTableItem',
	mixins: [model, common, imageResize],
	props: [
		'title',
		'text',
		'input',
		'file',
		'fileMulti',
		'textarea',
		'datePicker',
		'datePickerOne',
		'select',
		'radio',
		'radioGroup',
		'button',
		'toggleButton',
		'inputButton',
		'textButton',
		'textareaButton',
		'tagInput',
		'tagInputGroup',
		'tagInputItems',
		'tagChips',
		'inputSelectItems',
		'inputMulti',
		'inputMultiGroup',
		'inputMultiItem',
		'inputSelectChips',
		'fill',
		'readonly',
		'disabled',
		'inputType',
		'inputCheck',
		'label',
		'placeholder',
	],
	data: () => ({
		resetFile: false,
		tagItem: null,
		tagInputGroupSelect: null,
		tagInputItemSelect: null,

		inputMultiGroupSelect: null,
		inputMultiItemSelect: null,
	}),
	computed: {
		...mapGetters(['APP_GET_APP_WIDTH']),
		left() {
			return this.fill ? (this.APP_GET_APP_WIDTH > 960 ? 2 : 4) : 4
		},
		right() {
			return this.fill ? (this.APP_GET_APP_WIDTH > 960 ? 10 : 8) : 8
		},
		// tag filter
		// tag filter
		filterTagGroup() {
			return this.tagInputGroup.map(x => {
				return { text: x.code_name, value: x.code }
			})
		},
		filterTagItems() {
			return this.tagItems.map(x => {
				return { text: x.tag_value, value: x.tag_id }
			})
		},
		tagItems() {
			let tagData = []
			if (this.tagInputGroupSelect !== null) {
				tagData = this.tagInputItems.filter(item => this.tagInputGroupSelect.value === item.tag_group)
			}
			return tagData
		},
	},
	watch: {
		model(val) {
			console.log('tableItems_model', val)
			if (this.file !== undefined && val !== null) this.importImage(val)
		},
		inputMultiGroupSelect(val) {
			if (val) this.$emit('groupSelect', val)
		},
	},
	created() {
		if (this.tagInput !== undefined) this.model = []
	},
	mounted() {},
	methods: {
		async importImage(imageItem) {
			const imageResize = await new Promise(resolve => this.image_resizer_resize(imageItem, resolve))
			if (imageResize === null) return
			// console.log('imageResize', imageResize)
			this.model = await this.image_resizer_create_url(imageResize, imageItem.name)
			// console.log('this.model', this.model)
		},
		registerTags() {
			if (this.model.length < 5) {
				// 등록된 tag 체크
				const check = this.model.some(item => item.tag.value === this.tagInputItemSelect.value)
				if (check) return this.$toastr.error('이미 등록된 tag입니다.', 'tag등록 오류', { timeOut: 2500 })

				// tag등록
				const item = {
					group: this.tagInputGroupSelect,
					tag: this.tagInputItemSelect,
				}
				this.model.push(item)
				this.tagInputItemSelect = null
			} else {
				this.$toastr.error('5개 이상 등록 불가능합니다.', 'tag등록 오류', { timeOut: 2500 })
			}
		},
		removeTags(item) {
			this.model.splice(this.model.indexOf(item), 1)
			this.model = [...this.model]
		},
		registerInputMulti() {
			if (this.inputMultiGroupSelect === null)
				return this.$toastr.error('등록될 아이템이 없습니다.', '등록 오류', { timeOut: 2500 })

			let check = false
			// 제품 등록
			if (this.inputMultiItemSelect !== null) {
				if (this.model.length) {
					this.model.forEach(element => {
						if (element.product !== null) {
							// 등록된 item 체크
							check = this.model.some(item => item.product?.goods_code === this.inputMultiItemSelect.goods_code)
						}
					})
				}

				if (check) {
					this.inputMultiItemSelect = null
					return this.$toastr.error('이미 등록된 아이템 입니다.', '등록 오류', { timeOut: 2500 })
				}

				// 등록
				const item = {
					brand: this.inputMultiGroupSelect,
					product: this.inputMultiItemSelect,
				}
				this.model.push(item)
				this.inputMultiItemSelect = null
			}
			// 브랜드만 등록
			else {
				if (this.model.length) {
					// 등록된 item 체크
					check = this.model.some(item => item.brand?.brand_code === this.inputMultiGroupSelect.brand_code)
				}

				if (check) return this.$toastr.error('이미 등록된 아이템 입니다.', '등록 오류', { timeOut: 2500 })

				// 등록
				const item = {
					brand: this.inputMultiGroupSelect,
					product: null,
				}
				this.model.push(item)
				this.inputMultiGroupSelect = null
				this.inputMultiItemSelect = null
			}
		},
		removeInputMulti(item) {
			this.model.splice(this.model.indexOf(item), 1)
			this.model = [...this.model]
		},
	},
}
</script>
<style scoped lang="scss">
.table {
	border-top: 1px solid #ccc;

	&_title {
		background: #e3eae6;
		line-height: 2.2rem;
		font-size: 0.95rem;
		font-family: 'NotoSansKR-Bold';
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	&_text {
		line-height: 1.5rem;
		font-size: 1rem;
		font-family: 'NotoSansKR-Regular';
		&_link {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
