<script setup>
	import { ref, computed } from "vue";
	import PersonalRouter from "./PersonalRouter.vue";
	import { supabase } from "../supabase";
	import { useRouter } from "vue-router";
	import { useUserStore } from "../stores/user";
	import { storeToRefs } from "pinia";

	// Route Variables
	const route = "/auth/sign-up";
	const buttonText = "Sign up here";

	// Input Fields
	const email = ref("");
	const password = ref("");

	// Error Message
	const errorMsg = ref("");

	//Show hide password variables
	const passwordFieldType = computed(() =>
		hidePassword.value ? "password" : "text"
	);
	const hidePassword = ref(true);

	// Router to push user once SignedIn to the HomeView
	const redirect = useRouter();

	// Arrow function to Signin user to supaBase
	const signIn = async () => {
		try {
			// calls the user store and send the users info to backend to logIn
			await useUserStore().signIn(email.value, password.value);
			// redirects user to the homeView
			redirect.push({ path: "/" });
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
	<div class="container-full h-screen flex flex-col">
		<main>
			<div class="container-left">
				<img
					src="../assets/img/todo-logo.svg"
					alt="logo Todo"
					class="w-32 pb-10"
				/>
				<h3 class="font-semibold pb-1 text-xl">Welcome back!</h3>
				<p class="font-light pb-10 text-xl">Sign in to your account</p>

				<form @submit.prevent="signIn">
					<div class="text-left">
						<label for="email">Email</label>
						<div>
							<input
								class=""
								type="email"
								placeholder="youremail@hello.com"
								v-model="email"
								id="email"
							/>
						</div>
					</div>
					<div class="text-left">
						<label class="" for="password">Password</label>
						<div>
							<input
								class=""
								:type="passwordFieldType"
								onpaste="return false"
								placeholder="**********"
								v-model="password"
								id="password"
							/>
							<!-- <span class="">
					<EyeIcon
						:class="[passwordFieldIcon]"
						@click.prevent="hidePassword = !hidePassword"
					/>
				</span> -->
						</div>
					</div>
					<button class="" type="submit">Sign In</button>

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

					<p class="text-sm">
						<span class="">Don’t have an account yet? </span>

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
	.container-full {
		background: url(../assets/img/bg-login-desktop-left.svg) left top no-repeat,
			url(../assets/img/bg-login-desktop-right.svg) right center no-repeat;
	}

	main {
		@apply max-w-5xl flex gap-5 bg-[white] drop-shadow-2xl rounded-3xl m-auto overflow-hidden;
	}

	.container-left {
		@apply w-1/2 p-11 flex flex-col justify-center text-center items-center;
	}

	.container-right {
		@apply overflow-hidden w-1/2 flex flex-col items-center justify-center;
	}

	label {
		@apply font-semibold;
	}

	form {
		@apply w-full max-w-full;
	}

	input {
		@apply pt-3 pb-1 mb-7 max-w-full w-full border-b text-neutral text-opacity-70 focus:outline-none;
	}

	button {
		@apply mb-4 max-w-full w-full bg-red rounded-lg p-3 font-semibold text-[white] hover:bg-green;
	}

	.notification {
		@apply bg-red bg-opacity-20 border border-red mb-4 rounded-lg p-2 text-left;
	}
</style>
