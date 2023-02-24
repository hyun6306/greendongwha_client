<template>
	<div class="card fill-height">
		<p
			v-if="number"
			class="step_num mb-3"
		>
			{{ number }}
		</p>
		<v-img
			v-if="image"
			class="mt-5 mb-5"
			width="65"
			:src="image"
			eager
		/>
		<p
			v-if="title"
			class="tit mb-2"
		>
			{{ title }}
		</p>
		<span v-if="text">{{ text }}</span>
		<p
			v-if="subText"
			class="time"
		>
			{{ subText }}
		</p>
		<v-col cols="8">
			<CommonButtonsButton01
				v-if="button"
				outlined
				:name="button.name"
				:color="button.color"
				:class-name="button.className"
				:height="button.height"
				class="effect"
				@click="$emit('submit')"
			/>
		</v-col>
	</div>
</template>

<script>
export default {
	name: 'Card02',
	components: {},
	props: ['number', 'image', 'title', 'text', 'subText', 'button', 'link'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.card {
	padding: 22px !important;
	border: 1px solid #ccc !important;
	word-break: keep-all;
	cursor: pointer;

	.step_num {
		font-family: 'Roboto-Bold' !important;
		font-size: 18px !important;
		color: #42883d;
		text-align: center !important;
	}
	.tit {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 16px !important;
		color: #262626;
		text-align: center !important;
	}
	span {
		padding-bottom: 10px !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		color: #555;
	}
	.time {
		text-align: center !important;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 14px !important;
	}
}
@media all and (max-width: 600px) {
	.v-image {
		width: 40px !important;
	}
}
</style>
