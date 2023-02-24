<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="800"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="title"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							v-for="(item, i) in items"
							:key="i"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								:title="`${item.title}`"
								:text="`${item.contents}`"
							/>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'CommonDialogTableDialog',
	props: ['title', 'dialog', 'items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	async mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss"></style>
