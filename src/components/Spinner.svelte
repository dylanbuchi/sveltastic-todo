<script lang="ts">
	import { isDarkMode } from '@/store/theme.store';
</script>

<div class:card-dark={$isDarkMode} class:bg={!$isDarkMode} class="loader-overlay">
	<div class="loader" />
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
