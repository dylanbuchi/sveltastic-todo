<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { isDarkMode } from '@/store/theme.store';
	import { loginAsGuestClicked } from '@/store/app.store';

	let secondsElapsed = 0;
	let loadingStatus = 'Setting up your account...';

	let timer: NodeJS.Timer;

	function updateLoadingScreen() {
		switch (secondsElapsed) {
			case 2:
				loadingStatus = 'Loading the guest features...';
				break;
			case 4:
				loadingStatus = 'Building a personalized environment for you...';
				break;
			case 6:
				loadingStatus = 'Getting things ready just for you...';
				break;
			case 8:
				loadingStatus = 'Creating a seamless guest experience...';
				break;
			case 10:
				loadingStatus = 'Setting the stage for your journey...';
				break;
			case 12:
				loadingStatus = 'Loading the necessary resources...';
				break;
			case 14:
				loadingStatus = 'Crafting a unique guest session...';
				break;
			case 16:
				loadingStatus = 'Building the foundation of your visit...';
				break;
		}
	}

	function startGuestLoginLoadingProcess() {
		timer = setInterval(() => {
			secondsElapsed++;
			updateLoadingScreen();
		}, 1000);
	}

	onMount(() => {
		if ($loginAsGuestClicked) startGuestLoginLoadingProcess();
	});

	onDestroy(() => {
		clearInterval(timer);
		$loginAsGuestClicked = false;
	});
</script>

<div
	class:card-dark={$isDarkMode}
	class:bg={!$isDarkMode}
	class="is-flex is-flex-direction-column loader-overlay is-align-content-center is-justify-content-center"
>
	<div class="loader" />
	{#if $loginAsGuestClicked}
		<h1 class:text-dark={$isDarkMode} class="px-4 mt-6 title is-size-5-mobile">
			{loadingStatus}
		</h1>
	{/if}
</div>

<style>
	.bg {
		background-color: rgb(248, 245, 242);
	}

	.loader-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.loader {
		border: 20px solid rgb(217, 217, 217);
		border-radius: 50%;
		border-top: 20px solid #1f1f1f;
		width: 120px;
		height: 120px;
		animation: spinner 1.5s linear infinite;
	}

	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
