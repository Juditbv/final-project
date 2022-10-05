<template>
	<div class="h-screen flex flex-col">
		<main>
			<div class="container-left">
				<img
					src="../assets/img/todo-logo.svg"
					alt="logo Todo"
					class="w-32 pb-10"
				/>
				<h3 class="font-semibold pb-1">Welcome back!</h3>
				<p class="font-light pb-10">Sign in to your account</p>

				<form @submit.prevent="signIn">
					<div class="text-left">
						<label for="email">Email</label>
						<div class="w-full">
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
						<div class="w-full">
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

					<p v-if="errorMsg" class="">
						{{ errorMsg }}
					</p>

					<p class="">
						<span class="">Don’t have an account yet? </span>

						<PersonalRouter :route="route" :buttonText="buttonText" />
					</p>
				</form>
			</div>
			<div class="container-right">
				<img
					src="../assets/img/login-concept-img.jpg"
					alt="task list concept image"
					class="object-contain"
				/>
			</div>
		</main>
	</div>
</template>

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

<style scoped>
	main {
		@apply max-w-5xl flex gap-5 bg-[white] drop-shadow-2xl rounded-3xl m-auto overflow-hidden;
	}

	h3,
	p {
		@apply text-xl;
	}
	.container-left {
		@apply w-1/2 p-8 flex flex-col justify-center text-center items-center;
	}
	.container-right {
		@apply overflow-hidden w-1/2;
	}

	label {
		@apply font-semibold mb-4;
	}
</style>
