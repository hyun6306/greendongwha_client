<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="650"
	>
		<v-card>
			<v-col
				class="pa-0"
				align="center"
			>
				<v-card
					width="100%"
					height="60"
					color="primary"
					class="dialog_title_area"
				>
					<h3 class="py-4 color_white">{{ title }}</h3>
				</v-card>
			</v-col>
			<v-row class="ma-0 table_area">
				<v-col
					cols="12"
					class="pa-0"
					align="center"
				>
					<table class="table table-striped">
						<thead class="thead-dark">
							<tr>
								<th
									v-for="(item, i) in headers"
									:key="i"
									scope="col"
									:style="`max-width:${item.width}px`"
								>
									{{ item.name }}
								</th>
							</tr>
						</thead>
						<draggable
							v-model="list"
							tag="tbody"
							class="contents"
						>
							<tr
								v-for="(item, i) in list"
								:key="i"
							>
								<td>{{ i + 1 }}</td>
								<td v-if="headers.some(x => x.value === 'title')">
									<p
										v-if="item.title"
										class="contents_title"
										:style="`max-width:${titleItem('title').width}px`"
									>
										{{ item.title }}
									</p>
								</td>
								<td v-if="headers.some(x => x.value === 'text')">
									<p
										v-if="item.text"
										class="contents_title"
										:style="`max-width:${titleItem('text').width}px`"
									>
										{{ item.text }}
									</p>
								</td>

								<!-- 베스트 제품 Title -->
								<td v-if="headers.some(x => x.value === 'product_name')">
									<p
										v-if="item.product_name"
										class="contents_title"
										:style="`max-width:${titleItem('product_name').width}px`"
									>
										{{ item.product_name }}
									</p>
								</td>

								<!-- 추천 제품 -->
								<td v-if="headers.some(x => x.value === 'concat_name')">
									<p
										v-if="item.concat_name"
										class="contents_title"
										:style="`max-width:${titleItem('concat_name').width}px`"
									>
										{{ item.concat_name }}
									</p>
								</td>

								<!-- 추천 검색어 -->
								<td v-if="headers.some(x => x.value === 'search_name')">
									<p
										v-if="item.search_name"
										class="contents_title"
										:style="`max-width:${titleItem('search_name').width}px`"
									>
										{{ item.search_name }}
									</p>
								</td>

								<!-- 상태 -->
								<td v-if="headers.some(x => x.value === 'state')">
									<p v-if="item.state">ON</p>
									<p v-else>OFF</p>
								</td>

								<!-- 이미지 -->
								<td v-if="headers.some(x => x.value === 'image')">
									<v-btn
										v-if="item.image"
										:href="item.image"
										target="_blank"
										dark
										color="#509467"
									>
										이미지 확인
									</v-btn>
								</td>

								<!-- 조회수 -->
								<td v-if="headers.some(x => x.value === 'hits')">
									<p>{{ item.hits }}</p>
								</td>

								<!-- hendle icon -->
								<td v-if="headers.some(x => x.value === 'hendle-icon')">
									<v-icon>mdi-arrow-all</v-icon>
								</td>
							</tr>
						</draggable>
					</table>
				</v-col>
			</v-row>
			<v-card-actions class="pa-0">
				<v-row class="ma-0">
					<v-btn
						width="50%"
						height="5%"
						class="pa-4 confirm_btn"
						color="secondary lighten-1"
						@click.stop="closePopup"
					>
						취소
					</v-btn>
					<v-btn
						width="50%"
						height="5%"
						class="pa-4 confirm_btn"
						color="primary lighten-2"
						@click.stop="confirmPopup"
					>
						<b>확인</b>
					</v-btn>
				</v-row>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import model from '@/mixins/model'

// vueDragAble
import draggable from 'vuedraggable'

export default {
	name: 'GridTypeDrag01',
	components: {
		draggable: draggable,
	},
	mixins: [model],
	props: {
		title: {
			type: String,
			default: '',
		},
		dialog: {
			type: Boolean,
			default: false,
		},
		headers: {
			type: Array,
			default: () => [],
		},
		desserts: {
			type: Array,
			default: () => [],
		},
		showAll: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		list: [],
		dragging: false,
	}),
	computed: {},
	watch: {
		list(val) {
			console.log('list', val)
		},
		createDialog(val) {
			if (!val) this.model = []
		},
	},
	created() {
		if (!this.showAll) {
			// state > true filter Data List push
			this.desserts.filter(x => x.state).forEach(element => this.list.push(element))
		} else {
			// filter없이 item 모두 보여줌
			this.list = this.desserts
		}
	},
	mounted() {
		console.log('desserts', this.desserts)
	},
	methods: {
		closePopup() {
			this.$emit('close')
		},
		titleItem(item) {
			return this.headers.find(x => x.value === item)
		},
		confirmPopup() {
			// 순서를 바꾼 정보 push
			this.list.map((x, i) => (x.priority = i + 1))

			if (!this.showAll) {
				// 노출되지 않는 베너
				// state > false filter Data List push
				this.desserts.filter(x => !x.state).map(x => (x.priority = null))
				this.desserts.filter(x => !x.state).forEach(element => this.list.push(element))
			}

			this.model = this.list
			this.$emit('submit', this.list)
			this.$emit('close')
		},
	},
}
</script>
<style scoped lang="scss">
.dialog_title_area {
	border-radius: 0;
}
.table_area {
	height: 600px;
	overflow-y: scroll;
}
.table {
	width: 100%;
	border: 1px solid #ccc;
	border-spacing: 0;

	thead tr {
		padding: 0;
		margin: 0;
		th {
			font-size: 1rem;
			padding: 1rem 1.5rem;
			border-bottom: 1px solid #ccc;
			background-color: #ededed;
		}
	}
	.contents {
		tr {
			&:hover {
				background-color: #64ba81;
				color: white;
			}

			&:active {
				background-color: $color-olive;
				color: white;
			}

			td {
				text-align: center;
				padding: 1rem;
				border-bottom: 1px solid #ccc;

				&:active {
					background-color: #57a250;
					color: white;
				}
			}
		}
	}
	.contents {
		&_title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 140px;
			float: left;
		}
	}
}
.table-striped {
	border-bottom: 1px solid #ccc;
	&:last-child {
		border-bottom: none;
	}
}
.confirm_btn {
	border-radius: 0 !important;
}
::-webkit-scrollbar {
	z-index: 10000;
	-webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
	width: 10px;
}
::-webkit-scrollbar:horizontal {
	height: 10px;
}
::-webkit-scrollbar-track {
	background: #ededed;
	border-radius: 0;
}
::-webkit-scrollbar-thumb {
	background: #92a99b;
	border-radius: 5px;
}
</style>
