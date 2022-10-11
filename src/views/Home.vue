<script setup>
	import NavBar from "../components/NavBar.vue";
	import NewTask from "../components/NewTask.vue";
	import TaskItem from "../components/TaskItem.vue";
	import FooterComp from "../components/FooterComp.vue";
	import UserPreferences from "../components/UserPreferences.vue";
	import ScrollToTop from "../components/ScrollToTop.vue";

	import { ref, onMounted, computed } from "vue";
	import { useTaskStore } from "../stores/task";

	const storeTasks = useTaskStore();

	onMounted(() => {
		storeTasks.fetchTasks();
		window.addEventListener("resize", changeViewCols);
	});

	async function pushTaskSup(title, description) {
		try {
			await storeTasks.addTask(title, description);
			await storeTasks.fetchTasks();
		} catch (error) {
			errorMsg.value = "There's been an error creating your task:" + error;
		}
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

	const viewCols = ref(true);

	const changeView = (view) => {
		viewCols.value = view;
	};

	const changeViewCols = () => {
		if (window.innerWidth < 768) {
			viewCols.value = false;
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
			min-height-empty
		"
	>
		<div>
			<UserPreferences
				@toggle-list="changeView"
				@toggle-cols="changeView"
				:view-cols="viewCols"
			/>
			<NewTask @new-task="pushTaskSup" />
		</div>
		<section class="lg:col-span-2">
			<h1 class="font-semibold text-6xl">Your tasks</h1>
			<section
				class="grid gap-10 mt-10"
				:class="viewCols ? 'grid-cols-2' : 'grid-cols-1'"
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
			<section
				class="grid gap-10 mt-10"
				:class="viewCols ? 'grid-cols-2' : 'grid-cols-1'"
			>
				<TaskItem
					v-for="task in tasksCompleted"
					:key="task.id"
					:task="task"
					@delete-task="deleteTask"
					@complete-task="completeTask"
				/>
			</section>
			<div v-if="errorMsg" class="notification">
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
					{{ errorMsg }}
				</p>
			</div>
		</section>
	</main>
	<FooterComp />
	<ScrollToTop />
</template>

<style>
	body {
		@apply bg-neutral bg-opacity-[15%];
	}

	.min-height-empty {
		min-height: calc(100vh - 80px);
	}

	.notification {
		@apply bg-red bg-opacity-20 border border-red mb-4 rounded-lg text-left p-2 text-sm absolute bottom-2 left-2;
	}

	@media (max-width: 767px) {
		.cols-1-mobile {
			grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
		}
	}
</style>