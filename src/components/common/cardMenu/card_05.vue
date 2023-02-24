<template>
	<div class="short_card">
		<div
			class="d-flex"
			@click="onClick"
		>
			<div>
				<v-img
					width="150"
					height="150"
					:src="menu.image"
					eager
				/>
			</div>
			<div align="start">
				<div class="text-box">
					<p
						v-if="menu.features"
						class="menu_type"
					>
						{{ menu.features }}
					</p>
					<p
						v-if="menu.title"
						class="tit pb-3"
					>
						{{ menu.title }}
					</p>
					<p
						v-if="menu.text"
						class="path_text"
					>
						{{ menu.text }}
					</p>
					<p
						v-if="menu.path"
						class="path_text"
					>
						{{ menu.path }}
					</p>
					<p
						v-if="menu.name"
						class="menu_name pt-1"
					>
						{{ menu.name }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CardMenuCard05',
	props: ['menu'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {},
	methods: {
		onClick() {
			this.$emit('submit', this.menu)
		},
	},
}
</script>

<style scoped lang="scss">
@mixin ellipsis {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.short_card {
	position: relative;
	float: left;
	width: 410px;
	cursor: pointer;
	.text-box {
		margin-left: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.menu_type {
		font-family: 'NotoSansKR-Regular';
		font-size: 12px;
		margin-bottom: 5px;
	}
	.tit {
		@include ellipsis;
		max-width: 220px !important;
		font-family: 'NotoSansKR-Regular';
		font-size: 16px;
		margin-bottom: 12px;
	}
	.path_text {
		@include ellipsis;
		max-width: 220px !important;
		font-family: 'NotoSansKR-Regular';
		font-size: 13px;
	}
	.menu_name {
		@include ellipsis;
		max-width: 220px !important;
		font-family: 'NotoSansKR-Bold';
		font-size: 13px;
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.menu_type {
		font-size: 12px !important;
	}
	.tit {
		width: 165px !important;
		font-size: 14px !important;
		margin-bottom: 8px;
	}
	.path_text {
		width: 165px !important;
		font-size: 12px !important;
	}
}
@media all and (max-width: 380px) {
	.menu_type {
		font-size: 12px !important;
	}
	.tit {
		width: 140px !important;
		font-size: 14px !important;
		margin-bottom: 8px !important;
	}
	.path_text {
		width: 140px !important;
		font-size: 12px !important;
	}
}
</style>
