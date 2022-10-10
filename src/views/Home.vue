<script setup>
	import NavBar from "../components/NavBar.vue";
	import NewTask from "../components/NewTask.vue";
	import TaskItem from "../components/TaskItem.vue";

	import { ref, onMounted, computed } from "vue";
	import { useTaskStore } from "../stores/task";
	import { useUserStore } from "../stores/user";

	const storeTasks = useTaskStore();

	onMounted(() => {
		storeTasks.fetchTasks();
		console.log(storeTasks.fetchTasks());
	});

	async function pushTaskSup(title, description) {
		await storeTasks.addTask(title, description);
		await storeTasks.fetchTasks();
	}

	const deleteTask = async (taskId) => {
		try {
			await storeTasks.deleteTask(taskId);
			await storeTasks.fetchTasks();
		} catch (error) {
			errorMsg.value = "There's been an error deleting your task:" + error;
		}
	};

	const completeTask = async (taskId, status) => {
		try {
			await storeTasks.toggleCompleteTask(taskId, status);
			await storeTasks.fetchTasks();
		} catch (error) {
			errorMsg.value = "There's been an error completing your task:" + error;
		}
	};

	const updateTask = async (taskId, taskTitle, taskDescription) => {
		try {
			await storeTasks.updateTask(taskId, taskTitle, taskDescription);
			await storeTasks.fetchTasks();
		} catch (error) {
			errorMsg.value = "There's been an error whilte updating your task:" + error;
		}
	};

	const tasksCompleted = computed(() => {
		return storeTasks.tasks.filter((task) => task.is_complete);
	});

	const tasksPending = computed(() => {
		return storeTasks.tasks.filter((task) => !task.is_complete);
	});

	const errorMsg = ref("");
</script>

<template>
	<nav>
		<NavBar />
	</nav>
	<main
		class="
			p-8
			grid grid-cols-1
			gap-10
			auto-rows-max
			lg:auto-rows-fr lg:grid-cols-3
		"
	>
		<NewTask @new-task="pushTaskSup" />
		<section class="lg:col-span-2">
			<h1 class="font-semibold text-6xl">Your tasks</h1>
			<section
				class="grid grid-cols-1 gap-10 lg:grid-cols-2 auto-rows-max mt-10"
			>
				<TaskItem
					v-for="task in tasksPending"
					:key="task.id"
					:task="task"
					@delete-task="deleteTask"
					@complete-task="completeTask"
					@updateContTask="updateTask"
				/>
			</section>
			<h5 class="font-semibold text-2xl mt-10">All you've done so far!</h5>
			<section class="grid grid-cols-1 gap-10 lg:grid-cols-2 mt-10">
				<TaskItem
					v-for="task in tasksCompleted"
					:key="task.id"
					:task="task"
					@delete-task="deleteTask"
					@complete-task="completeTask"
				/>
			</section>
			{{ errorMsg }}
		</section>
	</main>
</template>

<style>
	body {
		@apply bg-neutral bg-opacity-[15%];
	}
</style>