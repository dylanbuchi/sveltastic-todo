<script lang="ts">
  import { nanoid } from "nanoid";
  import { createEventDispatcher, onMount } from "svelte";

  let taskTitle = "";
  let taskTitleInputElement: HTMLInputElement = undefined;

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    if (!taskTitle) return;

    const newTask = {
      id: nanoid(),
      title: taskTitle,
      completed: false,
    };

    dispatch("addTask", { task: newTask });
    taskTitle = "";
    focusInput();
  }

  function focusInput() {
    taskTitleInputElement.focus();
  }

  onMount(focusInput);
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="field">
    <div class="control">
      <input
        class="input"
        type="text"
        placeholder="Enter task"
        bind:this={taskTitleInputElement}
        bind:value={taskTitle}
      />
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-link" type="submit">Add Task</button>
    </div>
  </div>
</form>
