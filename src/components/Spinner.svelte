<div class="loader-overlay">
	<div class="loader" />
</div>

<style>
	.loader-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.loader {
		border: 20px solid #eaf0f6;
		border-radius: 50%;
		border-top: 20px solid #66d7b3;
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
