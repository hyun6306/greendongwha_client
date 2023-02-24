<template>
	<v-col class="pa-0 pt-6 pl-3 pr-3 mb-5">
		<h1 style="font-family: Lucida-Bright">Test</h1>
		<v-row>
			<v-col
				cols="3"
				md="12"
			>
				<v-btn
					block
					@click="OnToastr"
					>toastr action</v-btn
				>
			</v-col>
			<v-col cols="3">
				<v-btn @click="loading = true">loading</v-btn>
				<CommonLoading
					v-if="loading"
					:time="3000"
				/>
			</v-col>
			<v-col cols="3">
				<v-btn @click="confirm = true">confirm</v-btn>
				<CommonConfirm
					:dialog="confirm"
					:title="'confirm test'"
					:text="'text confirm'"
					@close="confirm = false"
					@submit="confirmSubmit"
				/>
			</v-col>
			<v-col cols="3">
				<v-btn @click="dialog = true">dialog</v-btn>
				<CommonDialog
					:dialog="dialog"
					:title="'confirm test'"
					:text="'text confirm'"
					@close="dialog = false"
				/>
			</v-col>
			<v-col></v-col>
		</v-row>

		<v-col
			cols="12"
			class="test_card"
		>
			<v-img
				:src="require('@/assets/img/home/main/img_find.jpg')"
				width="100%"
				height="300"
			>
			</v-img>
		</v-col>
		<v-col cols="12">
			<v-col> startHeight:{{ startHeight }} / endHeight:{{ endHeight }} </v-col>
			<v-data-table
				id="virtual-scroll-table"
				v-scroll:#virtual-scroll-table="onScroll"
				:headers="headers"
				:items="dessertsLimited"
				item-key="name"
				disable-pagination
				hide-default-footer
			>
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
						>
							1212
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-col>
	</v-col>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'Test1',
	data: () => ({
		loading: false,
		confirm: false,
		dialog: false,
		desserts: Array.from({ length: 5000 }).map((v, k) => ({
			name: `#${k}`,
			calories: 518,
			fat: 26.0,
			carbs: 65,
			protein: 7,
			iron: '6%',
		})),
		headers: [
			{
				text: 'Dessert (100g serving)',
				align: 'start',
				sortable: false,
				value: 'name',
			},
			{ text: 'Calories', value: 'calories' },
			{ text: 'Fat (g)', value: 'fat' },
			{ text: 'Carbs (g)', value: 'carbs' },
			{ text: 'Protein (g)', value: 'protein' },
			{ text: 'Iron (%)', value: 'iron' },
		],
		start: 0,
		timeout: null,
		rowHeight: 32,
		perPage: 25,
	}),
	computed: {
		...mapGetters(['APP_GET_PAGE_NAME']),
		dessertsLimited() {
			return this.desserts.slice(this.start, this.perPage + this.start)
		},
		startHeight() {
			return this.start * this.rowHeight - 32
		},
		endHeight() {
			return this.rowHeight * (this.desserts.length - this.start)
		},
	},
	created() {
		this.APP_MU_PAGE_NAME('Test1')
	},
	mounted() {
		console.log(this.APP_GET_PAGE_NAME)
	},
	methods: {
		...mapMutations(['APP_MU_PAGE_NAME']),

		OnToastr() {
			this.$toastr.info('test', 'start', { timeOut: 1000 })
			this.$toastr.success('test', 'start', { timeOut: 1500 })
			this.$toastr.warning('test', 'start', { timeOut: 2000 })
			this.$toastr.error('test', 'start', { timeOut: 2500 })
		},
		confirmSubmit() {
			this.confirm = false
			this.$toastr.info('수락하셨습니다.', '확인 완료', { timeOut: 1000 })
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
			}, 20)
		},
	},
}
</script>

<style lang="scss" scoped>
.test_card {
	width: 200px;
}
#virtual-scroll-table {
	max-height: 400px;
	overflow: auto;
}
</style>
