<template>
	<div>
		<v-col
			cols="12"
			class="pa-0 pb-2"
		>
			<v-row
				class="ma-0"
				align="center"
			>
				<v-col
					cols="6"
					class="pa-0"
				>
					전체: {{ desserts.length }}건
				</v-col>
				<v-spacer />
				<v-col
					cols="6"
					md="3"
					class="pa-0"
				>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						single-line
						hide-details
					></v-text-field>
				</v-col>
			</v-row>
		</v-col>
		<v-data-table
			id="virtual-scroll-table"
			v-model="model"
			v-scroll:#virtual-scroll-table="onScroll"
			:headers="headers"
			:items="dessertsLimited"
			:search="search"
			:show-select="showSelect"
			:class="className"
			:loading="loading"
			item-key="id"
			hide-default-footer
			disable-pagination
			elevation="0"
			:style="`max-height:${height};`"
			:expanded.sync="expanded"
			:show-expand="showExpand"
			single-expand
		>
			<template v-slot:item.state="{ item, header }">
				<td
					class="admin_grid_text"
					:style="`max-width:${header.width}`"
				>
					<p v-if="item.state">ON</p>
					<p v-else>OFF</p>
				</td>
			</template>
			<template v-slot:item.use_yn="{ item, header }">
				<td
					class="admin_grid_text"
					:style="`max-width:${header.width}`"
				>
					<p v-if="item.use_yn === 'Y'">ON</p>
					<p v-else>OFF</p>
				</td>
			</template>
			<template v-slot:item.title="{ item, header }">
				<td
					class="admin_grid_text"
					:style="`max-width:${header.width}`"
				>
					{{ item.title }}
				</td>
			</template>
			<template v-slot:item.contents="{ item, header }">
				<td @click="expanded = [item]">
					<p
						class="admin_grid_contents"
						:style="`max-width:${header.width};`"
						v-html="item.contents"
					/>
				</td>
			</template>
			<template v-slot:item.thumbnail="{ item }">
				<v-btn
					v-if="item.thumbnail"
					outlined
					@click="common_onLink(item.thumbnail)"
				>
					<span class="admin_grid_text">썸네일 확인</span>
				</v-btn>
			</template>
			<template v-slot:item.image="{ item }">
				<v-btn
					v-if="item.image"
					outlined
					@click="common_onLink(item.image)"
				>
					<span class="admin_grid_text">이미지 확인</span>
				</v-btn>
			</template>
			<template v-slot:item.link="{ item }">
				<v-btn
					v-if="item.link"
					outlined
					@click="common_onLink(item.link)"
				>
					<span class="admin_grid_text">링크 확인</span>
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
			<template v-slot:item.data-etc="{ item }">
				<v-btn
					icon
					@click="$emit('etc', item)"
				>
					<v-icon>mdi-wrench</v-icon>
				</v-btn>
			</template>
			<template v-slot:item.data-link="{ item }">
				<v-btn
					icon
					@click="$emit('link', item)"
				>
					<v-icon>mdi-link</v-icon>
				</v-btn>
			</template>

			<!-- 베스트 제품 -->
			<template v-slot:item.best-product="{ item, header }">
				<td
					v-if="item.part"
					class="admin_grid_text"
					:style="`max-width:${header.width}`"
				>
					{{ item.subject_name }} > {{ item.kind_name }} > {{ item.brand_name }} > {{ item.goods_name }} >
					{{ item.pattern_name }}
				</td>
			</template>

			<template v-slot:item.data_status_quality="{ item }">
				<CommonSelectsSelect01
					v-model="item.data_status_quality"
					:items="admin_quality_statusItems"
					:height="40"
					@change="changeStatus(item)"
				/>
			</template>

			<template v-slot:item.data_status_event="{ item }">
				<CommonSelectsSelect01
					v-model="item.status"
					:items="admin_event_winStatusItems"
					:height="40"
					@change="changeStatus(item)"
				/>
			</template>

			<template v-slot:item.data_status_as="{ item }">
				<CommonSelectsSelect01
					v-model="item.data_status_as"
					:items="admin_as_statusItems"
					:height="40"
					@change="changeStatus(item)"
				/>
			</template>

			<!-- 제품상세 -->
			<template v-slot:item.data-advantage="{ item }">
				<v-btn
					icon
					@click="$emit('advantage', item)"
				>
					<v-icon>mdi-star</v-icon>
				</v-btn>
			</template>

			<template v-slot:item.data-structure="{ item }">
				<v-btn
					icon
					@click="$emit('structure', item)"
				>
					<v-icon>mdi-hammer-wrench</v-icon>
				</v-btn>
			</template>

			<template v-slot:item.data-cert="{ item }">
				<v-btn
					icon
					@click="$emit('cert', item)"
				>
					<v-icon>mdi-certificate</v-icon>
				</v-btn>
			</template>

			<!-- expendMenus -->
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<h4><b>- 제목</b></h4>
					<p v-html="item.title" />
					<br />
					<h4><b>- 내용</b></h4>
					<p v-html="item.contents" />
				</td>
			</template>

			<template v-slot:no-data> NO DATA HERE! </template>
			<template
				v-if="start > 0"
				v-slot:body.prepend
			>
				<tr>
					<td
						:colspan="headers.length"
						:style="'padding-top:' + startHeight + 'px'"
					></td>
				</tr>
			</template>
			<template
				v-if="start + perPage < this.desserts.length"
				v-slot:body.append
			>
				<tr>
					<td
						:colspan="headers.length"
						:style="'padding-top:' + endHeight + 'px'"
					></td>
				</tr>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'GridType02',
	mixins: [model, common, admin],
	props: ['headers', 'desserts', 'height', 'readonly', 'className', 'loading', 'showExpand'],
	data: () => ({
		search: '',
		start: 0,
		timeout: null,
		rowHeight: 40,
		expanded: [],
		// perPage: 50,
	}),
	computed: {
		showSelect() {
			return this.readonly === undefined
		},
		dessertsLimited() {
			return this.desserts.slice(this.start, this.perPage + this.start)
		},
		startHeight() {
			return this.start * this.rowHeight - this.perPage
		},
		endHeight() {
			return this.rowHeight * (this.desserts.length - this.start)
		},
		perPage() {
			let page = 0

			if (this.desserts.length > 150) page = 100
			else page = this.desserts.length

			return page
		},
	},
	watch: {
		loading(val) {
			if (!val) {
				// scroll Top push
				this.common_scrollTop('#virtual-scroll-table')
				this.start = 0
			}
		},
	},
	created() {},
	mounted() {},
	methods: {
		selectContent(item) {
			console.log(item, this.expanded)
			// if(event.isExpanded) {
			//     const index = this.expanded.findIndex(i => i === item)
			//     this.expanded.splice(index, 1)
			// }else{
			//     this.expanded.push(item)
			// }
		},
		changeStatus(item) {
			this.$emit('status', item)
		},
		onScroll(e) {
			// debounce if scrolling fast
			this.timeout && clearTimeout(this.timeout)

			this.timeout = setTimeout(() => {
				const { scrollTop } = e.target
				const rows = Math.ceil(scrollTop / this.rowHeight)

				this.start = rows + this.perPage > this.desserts.length ? this.desserts.length - this.perPage : rows

				this.$nextTick(() => {
					e.target.scrollTop = scrollTop
				})
			}, 5)
		},
	},
}
</script>
<style scoped lang="scss">
:deep(.v-data-table-header) {
	background: #ededed !important;
}
:deep(.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th) {
	color: #000 !important;
	font-size: 1rem;
	background: #ededed !important;
}
#virtual-scroll-table {
	overflow: auto;
}
.v-data-table {
	border-radius: 0 !important;
	border: 1px solid #ccc;
}
:deep(.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content) {
	box-shadow: none;
	background-color: #f1f8f3;
}
</style>
