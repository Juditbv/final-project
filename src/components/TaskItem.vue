<script setup>
	import { ref, watch } from "vue";

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

	const iconComplete = ref(
		"<svg xmlns='http://www.w3.org/2000/svg'fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white' class='w-4 h-4'><path stroke-linecap='round' stroke-linejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'/></svg>"
	);

	const iconNotComplete = ref(
		"<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white' class='w-4 h-4'><path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5'/></svg>"
	);
</script>

<template>
	<div class="card" :class="task.is_complete ? 'complete' : ''">
		<div>
			<h3 class="font-semibold text-lg mb-3 mr-4">{{ task.title }}</h3>
			<p>{{ task.description }}</p>
		</div>
		<div class="flex flex-col gap-2">
			<button
				@click="completeTask"
				class="rounded-full p-2 hover:bg-neutral"
				:class="task.is_complete ? 'bg-blue' : 'bg-green'"
				v-html="task.is_complete ? iconComplete : iconNotComplete"
			></button>
			<button
				@click="updateContTask"
				class="rounded-full bg-yellow p-2 hover:bg-neutral"
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
		@apply bg-neutral bg-opacity-10;
	}
</style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
