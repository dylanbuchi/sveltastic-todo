<script lang="ts">
	import { deleteTasksModal } from '@/store/modals.store';
	import { tasks } from '@/store/tasks.store';

	import {
		checkHasExpiredTasks,
		checkIsAllCompleted,
		checkSomeAreCompleted,
		exportTasksAsJSON
	} from '@/utils/helpers/tasks.helpers';
	import DeleteTasksModal from '../modals/DeleteTasksModal.svelte';
	import { isDarkMode } from '@/store/theme.store';

	let option: 'active' | 'completed';

	$: deleteAllCompletedButtonIsClicked = false;
	$: hasExpiredTasks = checkHasExpiredTasks($tasks);

	$: {
		option = checkIsAllCompleted($tasks) ? 'active' : 'completed';
	}

	function handleConfirm() {
		if (deleteAllCompletedButtonIsClicked) {
			tasks.deleteAllCompleted();
			deleteAllCompletedButtonIsClicked = false;
		} else {
			tasks.clear();
		}
		deleteTasksModal.closeModal();
	}

	function handleCancel() {
		deleteAllCompletedButtonIsClicked = false;
		deleteTasksModal.closeModal();
	}
</script>

<section class:card-dark={$isDarkMode} class="box p-5 is-flex is-flex-direction-column">
	<h2 class:text-dark={$isDarkMode} class="title is-5 has-text-centered">Manage Tasks</h2>
	<button on:click={deleteTasksModal.openModal} class="mt-2 button is-fullwidth is-danger">
		Delete All</button
	>
	{#if checkSomeAreCompleted($tasks)}
		<button
			on:click={() => {
				deleteAllCompletedButtonIsClicked = true;
				deleteTasksModal.openModal();
			}}
			class="mt-2 button is-fullwidth is-danger">Delete All Completed</button
		>
	{/if}

	{#if hasExpiredTasks}
		<button
			on:click={() => {
				tasks.deleteAllExpired();
			}}
			class="mt-2 button is-fullwidth is-danger">Delete All Expired</button
		>
	{/if}
	<DeleteTasksModal {deleteAllCompletedButtonIsClicked} {handleCancel} {handleConfirm} />
	<button class="mt-2 button is-fullwidth is-link" on:click={() => exportTasksAsJSON($tasks)}
		>Download tasks</button
	>
</section>
