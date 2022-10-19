<script setup>
	import { ref } from "vue";

	const emit = defineEmits([
		"toggleCols",
		"toggleList",
		"orderPriority",
		"orderDate",
		"showCompleted",
		"dontShowCompleted",
	]);
	const props = defineProps({
		viewCols: Boolean,
		order: String,
		completed: Boolean,
	});

	const toggleCols = () => {
		emit("toggleCols", true);
	};

	const toggleList = () => {
		emit("toggleList", false);
	};

	const orderPriority = () => {
		emit("orderPriority");
	};

	const orderDate = () => {
		emit("orderDate");
	};

	const showCompleted = () => {
		emit("showCompleted", true);
	};
	const dontShowCompleted = () => {
		emit("dontShowCompleted", false);
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
			mb-6
			text-[white]
			flex flex-col
		"
	>
		<div class="content-center items-center justify-between hidden md:flex">
			<h5 class="font-semibold">View tasks in</h5>
			<div class="flex flex-nowrap text-sm w-2/4">
				<button
					id="list"
					@click="toggleList"
					class="
						px-3
						py-2
						bg-[white]
						rounded-l-xl
						hover:text-[white] hover:bg-yellow
						w-1/2
					"
					:class="
						!viewCols ? 'bg-yellow text-[white]' : 'bg-[white] text-neutral'
					"
				>
					List
				</button>
				<button
					id="cols"
					@click="toggleCols"
					class="
						px-3
						py-2
						rounded-r-xl
						hover:text-[white] hover:bg-yellow
						w-1/2
					"
					:class="
						viewCols ? 'bg-yellow text-[white]' : 'bg-[white] text-neutral'
					"
				>
					Cols
				</button>
			</div>
		</div>
		<div class="content-center items-center justify-between flex mt-0 md:mt-3">
			<h5 class="font-semibold">Order tasks by</h5>
			<div class="flex flex-nowrap text-sm w-2/4">
				<button
					id="date"
					@click="orderDate"
					class="
						px-3
						py-2
						bg-[white]
						rounded-l-xl
						hover:text-[white] hover:bg-yellow
						w-1/2
					"
					:class="
						order === 'inserted_at'
							? 'bg-yellow text-[white]'
							: 'bg-[white] text-neutral'
					"
				>
					Date
				</button>
				<button
					id="priority"
					@click="orderPriority"
					class="
						px-3
						py-2
						rounded-r-xl
						hover:text-[white] hover:bg-yellow
						w-1/2
					"
					:class="
						order === 'priority'
							? 'bg-yellow text-[white]'
							: 'bg-[white] text-neutral'
					"
				>
					Priority
				</button>
			</div>
		</div>
		<div class="content-center items-center justify-between flex mt-0 md:mt-3">
			<h5 class="font-semibold">Show completed?</h5>
			<div class="flex flex-nowrap text-sm w-2/4">
				<button
					id="yes"
					@click="showCompleted"
					class="
						px-3
						py-2
						bg-[white]
						rounded-l-xl
						hover:text-[white] hover:bg-yellow
						w-1/2
					"
					:class="
						completed ? 'bg-yellow text-[white]' : 'bg-[white] text-neutral'
					"
				>
					Yes
				</button>
				<button
					id="no"
					@click="dontShowCompleted"
					class="
						px-3
						py-2
						rounded-r-xl
						hover:text-[white] hover:bg-yellow
						w-1/2
					"
					:class="
						!completed ? 'bg-yellow text-[white]' : 'bg-[white] text-neutral'
					"
				>
					No
				</button>
			</div>
		</div>
	</div>
</template>