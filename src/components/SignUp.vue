<script setup>
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import PersonalRouter from "./PersonalRouter.vue";
	import { useUserStore } from "../stores/user";

	// Route Variables
	const route = "/auth/login";
	const buttonText = "Just sign in";

	// Input Fields
	const email = ref(null);
	const password = ref(null);
	const confirmPassword = ref(null);

	// Error Message
	const errorMsg = ref(null);

	// Router to push user once SignedUp to Log In
	const redirect = useRouter();

	// function to SignUp user to supaBase with a timeOut() method for showing the error
	async function signUp() {
		if (password.value === confirmPassword.value) {
			try {
				await useUserStore().signUp(email.value, password.value);
				// if (error) throw error;
				redirect.push({ path: "/auth/login" });
			} catch (error) {
				errorMsg.value = error.message;
				setTimeout(() => {
					errorMsg.value = null;
				}, 5000);
			}
			return;
		}
		errorMsg.value = "Passwords do not match";
		setTimeout(() => {
			errorMsg.value = null;
		}, 5000);
	}
</script>

<template>
	<div class="container-full h-screen flex flex-col md:px-5 lg:px-0">
		<main>
			<div class="container-left">
				<img
					src="../assets/img/todo-logo.svg"
					alt="logo Todo"
					class="w-32 pb-10"
				/>
				<h3 class="font-semibold pb-1 text-xl">Welcome aboard!</h3>
				<p class="font-light pb-10 text-xl">Create your account here</p>

				<form @submit.prevent="signUp">
					<div class="text-left">
						<label for="email">Email</label>
						<div>
							<input
								type="email"
								placeholder="youremail@hello.com"
								v-model="email"
								id="email"
							/>
						</div>
					</div>
					<div class="text-left">
						<label for="password">Password</label>
						<input
							type="password"
							placeholder="**********"
							v-model="password"
							id="password"
						/>
					</div>
					<div class="text-left">
						<label for="confirmPassword">Confirm Password</label>
						<input
							type="password"
							placeholder="**********"
							v-model="confirmPassword"
							id="confirmPassword"
						/>
					</div>
					<button type="submit">Sign up</button>

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

					<p class="text-sm mb-10 md:mb-0">
						<span> Already have an account? </span>
						<PersonalRouter
							:route="route"
							:buttonText="buttonText"
							class="text-red hover:text-opacity-90"
						/>
					</p>
				</form>
			</div>
			<div class="container-right">
				<img
					src="../assets/img/login-concept-img.jpg"
					alt="task list concept image"
					class="object-contain align-middle"
				/>
			</div>
		</main>
	</div>
</template>

<style scoped>
	main {
		@apply max-w-full md:max-w-5xl flex gap-5 bg-[white] drop-shadow-2xl rounded-t-3xl rounded md:rounded-3xl overflow-hidden mt-auto md:m-auto;
	}

	.container-left {
		@apply w-full md:w-1/2 flex flex-col justify-center text-center items-center p-11;
	}

	.container-right {
		@apply overflow-hidden w-1/2 md:flex flex-col items-center justify-center hidden;
	}

	label {
		@apply font-semibold;
	}

	form {
		@apply w-full max-w-full;
	}

	input {
		@apply max-w-full w-full border-b text-neutral text-opacity-70 focus:outline-none pt-3 pb-1 mb-7;
	}

	button {
		@apply max-w-full w-full bg-red rounded-lg font-semibold text-[white] hover:bg-green mb-4 p-3;
	}

	.notification {
		@apply bg-red bg-opacity-20 border border-red mb-4 rounded-lg text-left p-2 text-sm;
	}
</style>