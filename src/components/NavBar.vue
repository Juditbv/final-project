<script setup>
	import { useRouter } from "vue-router";
	import { useUserStore } from "../stores/user";
	import { ref, computed } from "vue";

	const logoTodo = ref(
		"<svg width='55' height='25' viewBox='0 0 120 55' fill='none' xmlns='http://www.w3.org/2000.svg'><path d='M120 35.2258C120 45.2738 111.854 53.4193 101.806 53.4193C91.7583 53.4193 83.6128 45.2738 83.6128 35.2258C83.6128 25.1778 91.7583 17.0322 101.806 17.0322C111.854 17.0322 120 25.1778 120 35.2258Z' fill='#91C7B1'/><path d='M44.129 36C44.129 46.048 35.9835 54.1936 25.9355 54.1936C15.8875 54.1936 7.74194 46.048 7.74194 36C7.74194 25.952 15.8875 17.8065 25.9355 17.8065C35.9835 17.8065 44.129 25.952 44.129 36Z' fill='#EF6F6C'/><path d='M11.6639 15.5519V42.4503C11.6639 45.0952 12.1664 46.9201 13.1715 47.9252C14.1765 48.9302 15.9486 49.4328 18.4877 49.4328H23.5659V54.1936H17.6149C13.7005 54.1936 10.7911 53.2943 8.88679 51.4958C6.98248 49.6444 6.03032 46.6292 6.03032 42.4503V15.5519H0V10.8705H6.03032V0H11.6639V10.8705H23.5659V15.5519H11.6639Z' fill='#54494B'/><path d='M44.1292 33.7623C44.1292 29.705 44.9503 26.1549 46.5925 23.112C48.2347 20.0207 50.4807 17.654 53.3305 16.0117C56.2285 14.3212 59.4888 13.4759 63.1114 13.4759C66.589 13.4759 69.7286 14.3212 72.53 16.0117C75.3315 17.7023 77.3843 19.8999 78.6884 22.6048V0H83.76V53.6139H78.6884V44.7749C77.4809 47.528 75.5005 49.7982 72.7474 51.5853C69.9943 53.3241 66.7581 54.1936 63.0389 54.1936C59.4164 54.1936 56.1561 53.3483 53.258 51.6577C50.4083 49.9672 48.1623 47.5763 46.52 44.4851C44.9261 41.3938 44.1292 37.8196 44.1292 33.7623ZM78.6884 33.8347C78.6884 30.6469 78.0363 27.8454 76.7322 25.4304C75.4281 23.0154 73.641 21.1558 71.3708 19.8516C69.149 18.5475 66.6856 17.8955 63.9808 17.8955C61.1793 17.8955 58.6677 18.5234 56.4459 19.7792C54.224 21.035 52.461 22.8704 51.1569 25.2855C49.9011 27.6522 49.2732 30.4778 49.2732 33.7623C49.2732 36.9984 49.9011 39.8482 51.1569 42.3115C52.461 44.7266 54.224 46.5862 56.4459 47.8903C58.6677 49.1461 61.1793 49.774 63.9808 49.774C66.6856 49.774 69.149 49.122 71.3708 47.8178C73.641 46.5137 75.4281 44.6541 76.7322 42.2391C78.0363 39.824 78.6884 37.0226 78.6884 33.8347Z' fill='#54494B'/></svg>"
	);
	//constant to save a variable that will hold the use router method
	const router = useRouter();

	// constant to save a variable that will get the user from store with a computed function imported from vue
	const userStore = computed(() => {
		return useUserStore();
	});
	// constant that calls user email from the useUserStore
	const userEmail = ref(userStore.value.user.email);

	// constant that saves the user email and cleans out the @client from the user
	const arr = userEmail.value.indexOf("@");
	const nameEmail = ref(userEmail.value.slice(0, arr));

	// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
	const errorMsg = ref("");
	const logOut = async () => {
		try {
			// calls the user store and send the users info to backend to logIn
			await useUserStore().signOut();
			// redirects user to the homeView
			router.push({ path: "/auth/login" });
		} catch (error) {
			// displays error message
			errorMsg.value = `Error: ${error.message}`;
			// hides error message
			setTimeout(() => {
				errorMsg.value = null;
			}, 5000);
		}
	};
</script>

<template>
	<div
		class="flex py-5 px-6 md:px-12 justify-between content-center bg-[white]"
	>
		<p class="flex gap-1 items-baseline text-base md:text-xl">
			<span class="hidden md:inline-flex">The</span>
			<span v-html="logoTodo"></span> of {{ nameEmail }}
		</p>
		<button class="hidden md:inline-flex" @click="logOut">Log out</button>
		<button class="md:hidden" @click="logOut">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="white"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
				/>
			</svg>
		</button>
	</div>
</template>

<style scoped>
	button {
		@apply bg-red rounded-lg font-semibold text-base text-[white] hover:bg-green py-2 px-6;
	}
</style>