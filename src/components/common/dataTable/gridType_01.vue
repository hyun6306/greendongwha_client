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
			v-model="model"
			:headers="headers"
			:items="desserts"
			:page.sync="page"
			:items-per-page="itemsPerPage"
			:search="search"
			:expanded.sync="expanded"
			:show-expand="showExpand"
			single-expand
			item-key="id"
			:show-select="showSelect"
			hide-default-footer
			elevation="0"
			class="grid_type"
			@page-count="pageCount = $event"
		>
			<template v-slot:item.showDate="{ item, header }">
				<td
					class="admin_grid_text"
					:style="`max-width:${header.width}`"
				>
					{{ item.showDate.join('~') }}
				</td>
			</template>

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
					<p v-if="item.use_yn">ON</p>
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

			<template v-slot:item.data-status="{ item }">
				<CommonSelectsSelect01
					v-model="item.status"
					:items="admin_quality_statusItems"
				/>
			</template>

			<!-- 제품상세 -->
			<template v-slot:item.data-advantage="{ item }">
				<v-btn
					icon
					@click="$emit('advantage', item)"
				>
					<v-icon>mdi-eye-settings</v-icon>
				</v-btn>
			</template>

			<template v-slot:item.data-structure="{ item }">
				<v-btn
					icon
					@click="$emit('structure', item)"
				>
					<v-icon>mdi-eye-settings</v-icon>
				</v-btn>
			</template>

			<template v-slot:item.data-cert="{ item }">
				<v-btn
					icon
					@click="$emit('cert', item)"
				>
					<v-icon>mdi-eye-settings</v-icon>
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

			<template v-slot:item.data-link="{ item }">
				<v-btn
					icon
					@click="$emit('link', item)"
				>
					<v-icon>mdi-link</v-icon>
				</v-btn>
			</template>

			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<h4><b>- 제목 -</b></h4>
					<p v-html="item.title" />
					<br />
					<h4><b>- 내용 -</b></h4>
					<p v-html="item.contents" />
				</td>
			</template>

			<template v-slot:item.searchShow="{ item, header }">
				<td
					class="admin_grid_text"
					:style="`max-width:${header.width}`"
				>
					<p v-if="item.searchShow">ON</p>
					<p v-else>OFF</p>
				</td>
			</template>

			<template v-slot:no-data> NO DATA HERE! </template>
		</v-data-table>
		<div class="text-center pt-2">
			<v-pagination
				v-model="page"
				:length="pageCount"
			></v-pagination>
		</div>
	</div>
</template>

<script>
import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'GridType01',
	mixins: [model, common],
	props: ['headers', 'desserts', 'showExpand', 'singleSelect', 'itemsPerPage', 'readonly'],
	data: () => ({
		search: '',
		page: 1,
		pageCount: 0,
		expanded: [],
		statusModel: null,
	}),
	computed: {
		showSelect() {
			return this.readonly === undefined
		},
	},
	watch: {},
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
	},
}
</script>
<style scoped lang="scss">
:deep(.v-data-table-header) {
	background-color: #ededed;
}
:deep(.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th) {
	color: #000 !important;
	font-size: 1rem;
}
:deep(.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content) {
	box-shadow: none;
	background-color: #f1f8f3;
}
.v-data-table {
	border-radius: 0 !important;
	border: 1px solid #ccc;
}
</style>
