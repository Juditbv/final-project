<template>
	<router-view></router-view>
</template>

<script setup></script>

<style>
	.container-full {
		background-image: url(../assets/img/bg-login-mobile.svg);
		background-size: cover;
	}

	@media (min-width: 768px) {
		.container-full {
			background: url(../assets/img/bg-login-desktop-left.svg) left top no-repeat,
				url(../assets/img/bg-login-desktop-right.svg) right 20% no-repeat;
		}
	}
</style>

<!-- 
**noHints**
-->
