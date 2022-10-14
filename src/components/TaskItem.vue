<script setup>
	import { ref, computed } from "vue";

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
		if (formData.value.title === "") {
			errorMsgTitle.value = "The title can't be empty!";
			setTimeout(() => {
				errorMsgTitle.value = null;
			}, 3000);
		} else {
			emit("updateContTask", props.task.id, formData.value);
			editingTask.value = false;
		}
	};

	const editingTask = ref(false);
	const formData = ref({
		title: props.task.title,
		description: props.task.description,
		priority: props.task.priority,
	});

	const textBadge = computed(() => {
		if (props.task.priority === 3) {
			return "High";
		} else if (props.task.priority === 2) {
			return "Medium";
		} else {
			return "Low";
		}
	});

	const bgBadge = computed(() => {
		if (props.task.priority === 3) {
			return "bg-red";
		} else if (props.task.priority === 2) {
			return "bg-blue";
		} else {
			return "bg-green";
		}
	});
</script>

<template>
	<div class="card" :class="task.is_complete ? 'complete' : ''">
		<div class="mr-4 flex">
			<div v-show="!editingTask" class="flex flex-col justify-start">
				<h3 class="font-semibold text-lg mb-2">
					{{ formData.title }}
				</h3>
				<p>{{ formData.description }}</p>
				<div class="grow flex items-end mt-3">
					<div class="text-xs flex items-center">
						<p
							v-if="formData.priority"
							class="py-1 px-2 text-[white] max-w-max rounded-xl mr-2"
							:class="bgBadge"
							v-text="textBadge"
						></p>
						<p>Added on {{ task.date_plain }}</p>
					</div>
				</div>
			</div>
			<div v-show="editingTask">
				<input
					type="text"
					id="taskTitle"
					class="input-edit font-semibold text-lg"
					v-model="formData.title"
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

				<input
					type="text"
					id="taskDescription"
					class="input-edit"
					v-model="formData.description"
				/>

				<select
					name="priority"
					id="priority"
					class="input-edit"
					v-model="formData.priority"
				>
					<option value="1">Low</option>
					<option value="2">Medium</option>
					<option value="3">High</option>
				</select>
				<button
					@click="updateContTask"
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
		</div>
		<div class="flex flex-col gap-2">
			<button
				@click="completeTask"
				class="rounded-full"
				:class="
					task.is_complete
						? 'bg-green p-2'
						: 'border border-green border-opacity-10 bg-green bg-opacity-40 hover:bg-green p-[7px]'
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
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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