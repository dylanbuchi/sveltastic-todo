<script lang="ts">
	import { isDarkMode } from '@/store/theme.store';

	export let title: string;
	export let message: string;

	export let confirmButtonText = 'Confirm';
	export let cancelButtonText = 'Cancel';

	export let showModal: boolean;

	export let handleConfirm: () => void;
	export let handleCancel: () => void;
</script>

{#if showModal}
	<div class="modal is-active p-6">
		<div class="modal-background" />
		<div class:card-dark={$isDarkMode} class="modal-content box">
			<h2 class:text-dark={$isDarkMode} class="title is-4">{title}</h2>
			<p>{message}</p>
			<div class="buttons mt-5">
				<button
					class="button {confirmButtonText === 'Delete' ? 'is-danger' : 'is-link'} mr-2"
					on:click={handleConfirm}>{confirmButtonText}</button
				>
				<button class:is-dark={$isDarkMode} class="button is-light" on:click={handleCancel}
					>{cancelButtonText}</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.modal-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(5px);
	}
</style>
