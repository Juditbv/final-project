<script setup>
	import { ref } from "vue";

	const emit = defineEmits(["toggleCols", "toggleList"]);
	const props = defineProps({
		viewCols: Boolean,
	});

	const toggleCols = () => {
		emit("toggleCols", true);
	};

	const toggleList = () => {
		emit("toggleList", false);
	};
</script>

<template>
	<div
		class="
			w-full
			bg-neutral
			p-4
			rounded-3xl
			h-fit
			lg:sticky lg:top-24
			mb-6
			text-[white]
			hidden
			md:flex
			content-center
			items-center
			justify-between
		"
	>
		<h5 class="font-semibold text-lg">How to see your tasks</h5>
		<div class="flex flex-nowrap">
			<button
				id="list"
				@click="toggleList"
				class="
					px-3
					py-2
					bg-[white]
					rounded-l-xl
					hover:stroke-[white] hover:bg-yellow
				"
				:class="
					!viewCols ? 'bg-yellow stroke-[white]' : 'bg-[white] stroke-neutral'
				"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
			</button>
			<button
				id="cols"
				@click="toggleCols"
				class="px-3 py-2 rounded-r-xl hover:stroke-[white] hover:bg-yellow"
				:class="
					viewCols ? 'bg-yellow stroke-[white]' : 'bg-[white] stroke-neutral'
				"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<style scoped>
</style>