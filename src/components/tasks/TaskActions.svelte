<script lang="ts">
	import { deleteTasksModal } from '../../store/modals.store';
	import { tasks } from '../../store/tasks.store';
	import {
		checkHasExpiredTasks,
		checkIsAllCompleted,
		checkSomeAreCompleted
	} from '../../utils/helpers/tasks.helpers';
	import DeleteTasksModal from '../modals/DeleteTasksModal.svelte';

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

<section class="box p-5 is-flex is-flex-direction-column">
	<h2 class="title is-5 has-text-centered">Manage Tasks</h2>
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
</section>
