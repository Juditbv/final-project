<script setup>
	import { ref } from "vue";

	const emit = defineEmits(["deleteTask", "completeTask", "updateContTask"]);

	const props = defineProps({
		task: Object,
	});

	const deleteTask = () => {
		emit("deleteTask", props.task.id);
	};

	const completeTask = () => {
		emit("completeTask", props.task.id, props.task.is_complete);
	};

	const updateContTask = () => {
		emit("updateContTask", props.task.id, taskTitle.value, taskDescription.value);
		editingTask.value = false;
	};

	const editingTask = ref(false);

	const taskTitle = ref(props.task.title);
	const taskDescription = ref(props.task.description);
</script>

<template>
	<div class="card" :class="task.is_complete ? 'complete' : ''">
		<div class="mr-4">
			<h3 v-show="!editingTask" class="font-semibold text-lg mb-3">
				{{ taskTitle }}
			</h3>
			<input
				type="text"
				id="taskTitle"
				class="input-edit font-semibold text-lg"
				v-show="editingTask"
				v-model="taskTitle"
			/>
			<p v-show="!editingTask">{{ taskDescription }}</p>
			<input
				type="text"
				id="newTaskDescription"
				class="input-edit"
				v-show="editingTask"
				v-model="taskDescription"
			/>
			<button
				@click="updateContTask"
				v-show="editingTask"
				class="
					bg-green
					rounded-lg
					font-semibold
					text-base text-[white]
					hover:bg-neutral
					py-2
					px-6
					w-full
					max-w-xs
				"
			>
				Done
			</button>
		</div>
		<div class="flex flex-col gap-2">
			<button
				@click="completeTask"
				class="rounded-full"
				:class="
					task.is_complete
						? 'bg-green p-2'
						: 'border border-green hover:bg-green p-[7px]'
				"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="w-4 h-4 stroke-[white]"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4.5 12.75l6 6 9-13.5"
					/>
				</svg>
			</button>
			<button
				v-if="!task.is_complete"
				@click="editingTask = !editingTask"
				class="rounded-full p-2 hover:bg-neutral"
				:class="editingTask ? 'bg-neutral' : 'bg-yellow'"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="white"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>
			</button>
			<button
				@click="deleteTask"
				class="rounded-full bg-red p-2 hover:bg-neutral"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="white"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<style scoped>
	.card {
		@apply flex justify-between bg-[white] drop-shadow-md rounded-3xl p-5;
	}

	.complete {
		@apply bg-neutral bg-opacity-20;
	}

	.input-edit {
		@apply px-3 py-1 mb-2 border border-neutral outline-neutral rounded-xl w-full max-w-xs;
	}
</style>