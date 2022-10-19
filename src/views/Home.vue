<script setup>
	import NavBar from "../components/NavBar.vue";
	import NewTask from "../components/NewTask.vue";
	import TaskItem from "../components/TaskItem.vue";
	import FooterComp from "../components/FooterComp.vue";
	import UserPreferences from "../components/UserPreferences.vue";
	import ScrollToTop from "../components/ScrollToTop.vue";

	import { ref, onMounted, computed, onBeforeMount } from "vue";
	import { useTaskStore } from "../stores/task";
	import { supabase } from "../supabase";

	const storeTasks = useTaskStore();
	storeTasks.fetchOnlyDates();
	onMounted(() => {
		initialFetch();
		window.addEventListener("resize", changeViewCols);
	});

	async function pushTaskSup(title, description, priority) {
		try {
			await storeTasks.addTask(title, description, priority);
			initialFetch();
		} catch (error) {
			errorMsg.value = "There's been an error creating your task:" + error;
		}
	}

	const deleteTask = async (taskId) => {
		try {
			await storeTasks.deleteTask(taskId);
			initialFetch();
		} catch (error) {
			errorMsg.value = "There's been an error deleting your task:" + error;
		}
	};

	const completeTask = async (taskId, status) => {
		try {
			await storeTasks.toggleCompleteTask(taskId, status);
			initialFetch();
		} catch (error) {
			errorMsg.value = "There's been an error completing your task:" + error;
		}
	};

	const updateTask = async (taskId, payload) => {
		try {
			await storeTasks.updateTask(taskId, payload);
			initialFetch();
		} catch (error) {
			errorMsg.value = "There's been an error while updating your task:" + error;
		}
	};

	const viewCols = ref(false);

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

	const order = ref("");

	// const allTasks =
	const sortPriority = async () => {
		order.value = "priority";
		if (filterNumber.value !== "0" || filterDateValue.value !== "all") {
			await storeTasks.filterTasks(
				filterNumber.value,
				filterDateValue.value,
				order.value
			);
		} else {
			await storeTasks.fetchTasksPriority();
		}
	};

	const sortDate = async () => {
		order.value = "inserted_at";
		if (filterNumber.value !== "0" || filterDateValue.value !== "all") {
			await storeTasks.filterTasks(
				filterNumber.value,
				filterDateValue.value,
				order.value
			);
		} else {
			await storeTasks.fetchTasks();
		}
	};

	const initialFetch = () => {
		if (order.value === "priority") {
			sortPriority();
		} else {
			sortDate();
		}
	};

	const filterNumber = ref("0");
	const filterDateValue = ref("all");

	const filterTasks = async () => {
		await storeTasks.filterTasks(
			filterNumber.value,
			filterDateValue.value,
			order.value
		);
	};
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
			<div class="lg:sticky top-8">
				<UserPreferences
					@toggle-list="changeView"
					@toggle-cols="changeView"
					@order-priority="sortPriority"
					@order-date="sortDate"
					:view-cols="viewCols"
					:order="order"
				/>
				<NewTask @new-task="pushTaskSup" />
			</div>
		</div>
		<section class="lg:col-span-2">
			<div class="flex items-baseline flex-wrap justify-between">
				<h1 class="font-semibold text-6xl">Your tasks</h1>
				<div class="flex flex-wrap mt-3">
					<span class="ml-0 sm:ml-4 font-semibold">Filter by</span>
					<div class="w-full sm:max-w-max mt-2 sm:mt-0">
						<label class="text-sm ml-0 sm:ml-5">Priority</label>
						<select
							name="priority"
							id="priority"
							class="ml-2 mr-5 text-sm min-w-[75%] sm:min-w-max"
							placeholder="Priority"
							@change="filterTasks"
							v-model="filterNumber"
						>
							<option value="0" selected>All</option>
							<option value="1">Low</option>
							<option value="2">Medium</option>
							<option value="3">High</option>
						</select>
					</div>
					<span class="mx-2 mt-2 sm:mt-0">or</span>
					<div class="w-full sm:max-w-max mt-2 sm:mt-0">
						<label class="text-sm ml-0 sm:ml-5">Date</label>
						<select
							name="date"
							id="date"
							class="ml-2 text-sm min-w-[80%] sm:min-w-max"
							@change="filterTasks"
							v-model="filterDateValue"
						>
							<option value="all" selected>All</option>
							<option
								v-for="date in storeTasks.dates"
								:key="date"
								:value="date"
							>
								{{ date }}
							</option>
						</select>
					</div>
				</div>
			</div>
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
			<h5 v-if="tasksCompleted.length > 0" class="font-semibold text-2xl mt-10">
				All you've done so far!
			</h5>
			<h5
				v-if="tasksCompleted.length <= 0 && tasksPending.length <= 0"
				class="text-lg mt-10"
			>
				There are no tasks matching your filters. Try with others ;)
			</h5>
			<section
				v-if="tasksCompleted.length > 0"
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
			<div v-if="errorMsg" class="notificationHome">
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

	.notificationHome {
		@apply bg-red bg-opacity-70 border border-red mb-4 rounded-lg text-left p-2 text-sm absolute bottom-2 left-2 max-w-xl;
	}

	select {
		@apply max-w-max w-full border-b bg-neutral bg-opacity-0 text-neutral text-opacity-70 focus:outline-none pt-3 pb-1;
	}
</style>