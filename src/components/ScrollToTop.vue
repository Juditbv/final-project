<script setup>
	import { onMounted } from "vue";

	onMounted(() => {
		window.addEventListener("scroll");
	});
</script>

<template>
	<div
		class="sticky w-full flex justify-end bottom-0 pb-3 pr-5 transition"
		:class="window.scrollY > 600 ? '' : 'inivisble'"
	>
		<div class="text-gray-400 hover:text-blue-400 transition">
			<button>Scroll to top</button>
		</div>
	</div>
</template>

<style scoped>
</style>