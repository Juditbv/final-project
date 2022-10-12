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
	const errorMsgTitle = ref("");
	const updateContTask = () => {
		if (taskTitle.value === "") {
			errorMsgTitle.value = "The title can't be empty!";
			setTimeout(() => {
				errorMsgTitle.value = null;
			}, 3000);
		} else {
			emit(
				"updateContTask",
				props.task.id,
				taskTitle.value,
				taskDescription.value,
				taskPriority.value
			);
			editingTask.value = false;
		}
	};

	const editingTask = ref(false);

	const taskTitle = ref(props.task.title);
	const taskDescription = ref(props.task.description);
	const taskPriority = ref(props.task.priority);

	const onlyDate = ref("");

	const getDate = () => {
		const timestamp = props.task.inserted_at;
		const date = timestamp.substr(0, 10);
		const dateReverse = date.split("-").reverse().join("-");
		onlyDate.value = dateReverse;
	};
	getDate();
</script>

<template>
	<div class="card" :class="task.is_complete ? 'complete' : ''">
		<div class="mr-4 flex flex-col justify-start">
			<h3 v-show="!editingTask" class="font-semibold text-lg mb-2">
				{{ taskTitle }}
			</h3>
			<input
				type="text"
				id="taskTitle"
				class="input-edit font-semibold text-lg"
				v-show="editingTask"
				v-model="taskTitle"
			/>
			<div v-if="errorMsgTitle" class="notification">
				<p>
					<span
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="#EF6F6C"
							class="w-6 h-6 inline"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
							/>
						</svg>
					</span>
					{{ errorMsgTitle }}
				</p>
			</div>
			<p v-show="!editingTask">{{ taskDescription }}</p>
			<input
				type="text"
				id="newTaskDescription"
				class="input-edit"
				v-show="editingTask"
				v-model="taskDescription"
			/>
			<div class="grow flex items-end mt-3">
				<div class="text-xs flex items-center">
					<p
						class="py-1 px-2 text-[white] max-w-max rounded-xl justify-end mr-2"
						:class="
							taskPriority === 3
								? 'bg-red'
								: taskPriority === 2
								? 'bg-blue'
								: 'bg-green'
						"
						v-text="
							taskPriority === 3
								? 'High'
								: taskPriority === 2
								? 'Medium'
								: 'Low'
						"
						v-show="!editingTask && taskPriority"
					></p>
					<p>Added on {{ onlyDate }}</p>
				</div>
			</div>
			<select
				name="priority"
				id="priority"
				class="input-edit"
				v-model="taskPriority"
				v-show="editingTask"
			>
				<option value="1">Low</option>
				<option value="2">Medium</option>
				<option value="3">High</option>
			</select>
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
					max-w-xl
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
		@apply px-3 py-1 mb-2 border border-neutral outline-neutral rounded-xl w-full max-w-xl;
	}

	.notification {
		@apply bg-red bg-opacity-20 border border-red mb-4 rounded-lg text-left p-2 text-sm;
	}
</style>