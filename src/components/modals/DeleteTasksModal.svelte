<script lang="ts">
	import { deleteTasksModal } from '../../store/modals.store';
	import Modal from './Modal.svelte';

	export let deleteAllCompletedButtonIsClicked: boolean;
	export let handleConfirm: () => void;
	export let handleCancel: () => void;
</script>

<Modal
	{handleCancel}
	{handleConfirm}
	title="Confirmation"
	message="Are you sure you want to delete all the {deleteAllCompletedButtonIsClicked
		? 'completed'
		: ''} tasks?"
	confirmButtonText="Delete"
	cancelButtonText="Cancel"
	showModal={$deleteTasksModal.isOpen}
/>
