<template>
	<div class="layout-navbars-breadcrumb-index">
		<Breadcrumb />
	</div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
const Breadcrumb = defineAsyncComponent(() => import('/@/layout/navBars/breadcrumb/breadcrumb.vue'));
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 50px;
	display: flex;
	align-items: center;
	background: var(--next-bg-topBar);
	border-bottom: 1px solid var(--next-border-color-light);

	.bell {
		padding-left: 50px;
	}
}
</style>
