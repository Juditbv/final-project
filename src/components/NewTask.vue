<script setup>
	import { ref } from "vue";

	const emit = defineEmits(["newTask"]);

	const taskTitle = ref("");

	const taskDescription = ref("");

	const taskPriority = ref(1);

	const errorMsg = ref(false);

	const emptyTitle = ref("You need to add a Title for the task, at least");

	const createNewTask = () => {
		if (!taskTitle.value) {
			errorMsg.value = true;
			setTimeout(() => {
				errorMsg.value = null;
			}, 5000);
		} else {
			emit("newTask", taskTitle.value, taskDescription.value, taskPriority.value);
			taskDescription.value = "";
			taskTitle.value = "";
		}
	};
</script>

<template>
	<div class="new-task-cont">
		<h3 class="font-semibold text-3xl mb-4">Create a new task</h3>
		<p class="mb-14">
			You just need to add the title and description below.
			<br />
			Easy peasy!
		</p>
		<form @submit.prevent="createNewTask">
			<label for="title">Title</label>
			<input
				type="text"
				placeholder="Procrastinate all day"
				id="title"
				v-model="taskTitle"
			/>
			<p v-if="errorMsg" class="notification">
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
				{{ emptyTitle }}
			</p>
			<label for="description">Description</label>
			<input
				type="text"
				placeholder="Just wanna chill in my sofa"
				id="description"
				v-model="taskDescription"
			/>
			<label for="priority">Priority</label>
			<select name="priority" id="priority" v-model="taskPriority">
				<option value="1">Low</option>
				<option value="2">Medium</option>
				<option value="3">High</option>
			</select>
			<button type="submit">Add task to my dashboard</button>
		</form>
	</div>
</template>

<style scoped>
	.new-task-cont {
		@apply flex flex-col w-full bg-[white] p-8 rounded-3xl drop-shadow-2xl h-fit;
	}

	label {
		@apply font-semibold;
	}

	form {
		@apply w-full max-w-full;
	}

	.notification {
		@apply bg-red bg-opacity-20 border border-red mb-4 rounded-lg text-left p-2 text-sm;
	}

	input {
		@apply max-w-full w-full border-b text-neutral text-opacity-70 focus:outline-none pt-3 pb-1 mb-7;
	}

	select {
		@apply max-w-full w-full border-b text-neutral text-opacity-70 focus:outline-none pt-3 pb-1 mb-7;
	}

	button {
		@apply bg-red w-full rounded-lg font-semibold text-[white] hover:bg-green py-2 px-6;
	}
</style>
