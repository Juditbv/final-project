<script setup>
	import { useRouter } from "vue-router";
	import { useUserStore } from "../stores/user";
	import { ref, computed } from "vue";
	//constant to save a variable that will hold the use router method
	const router = useRouter();

	// constant to save a variable that will get the user from store with a computed function imported from vue
	const userStore = computed(() => {
		return useUserStore();
	});
	// constant that calls user email from the useUSerStore
	const userEmail = ref(userStore.value.$state.user.email);

	// constant that saves the user email and cleans out the @client from the user
	const arr = userEmail.value.indexOf("@");
	const nameEmail = ref(userEmail.value.slice(0, arr));

	// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<template>
	<div>
		<p>
			The
			<img
				src="../assets/img/todo-logo.svg"
				alt="Todo logo"
				class="max-h-[30px]"
			/>
			of {{ nameEmail }}
		</p>
		<button>Log out</button>
	</div>
</template>

<style scoped>
</style>
