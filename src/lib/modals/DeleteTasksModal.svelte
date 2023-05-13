<script lang="ts">
  import { deleteTasksModal } from "../../store/modals.store";
  import { tasks } from "../../store/tasks.store";
  import Modal from "./Modal.svelte";

  export let deleteAllCompletedButtonIsClicked = false;
</script>

<Modal
  handleCancel={() => {
    deleteTasksModal.closeModal();
  }}
  handleConfirm={() => {
    if (deleteAllCompletedButtonIsClicked) {
      tasks.deleteAllCompleted();
    } else {
      tasks.clear();
    }

    deleteTasksModal.closeModal();
  }}
  title="Confirmation"
  message="Are you sure you want to delete all the {deleteAllCompletedButtonIsClicked
    ? 'completed'
    : ''} tasks?"
  confirmButtonText="Delete"
  cancelButtonText="Cancel"
  showModal={$deleteTasksModal.isOpen}
/>
