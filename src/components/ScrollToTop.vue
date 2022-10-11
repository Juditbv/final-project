<script setup>
	import { onMounted, ref } from "vue";

	onMounted(() => {
		window.addEventListener("scroll", addClassVisible);
	});
	const addClassVisible = () => {
		if (window.scrollY > 400) {
			classToAdd.value = "";
		} else {
			classToAdd.value = "hidden";
		}
	};
	const classToAdd = ref("hidden");

	const scrollUp = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
</script>

<template>
	<button
		class="fixed bottom-0 right-0 p-2 m-5 transition rounded-full bg-blue"
		:class="classToAdd"
		@click="scrollUp"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="white"
			class="w-5 h-5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</button>
</template>

<style scoped>
</style>