<script lang="ts">
  import { afterUpdate, createEventDispatcher } from "svelte";
  import type { Task } from "../../models/task.model";
  import { Edit2Icon, SaveIcon, Trash2, XIcon } from "lucide-svelte";
  import TaskButtons from "./TaskButtons.svelte";
  import { formatDate } from "../../utils/helpers/date.helper";

  const dispatch = createEventDispatcher();

  export let task: Task;

  let isEditingTask = false;
  let editedTitle = task.title;
  let editedDueDate = task?.dueDate.toISOString().slice(0, 10);

  let editInput: HTMLInputElement;

  function dispatchHelper(name: string, id: string) {
    dispatch(name, { taskId: id });
  }

  function handleCheckboxClick() {
    dispatchHelper("toggleComplete", task.id);
  }

  function handleDeleteClick() {
    dispatchHelper("removeTask", task.id);
  }

  function handleEditClick() {
    isEditingTask = true;
  }

  function handleSaveTask() {
    const data: Partial<Task> = {
      id: task.id,
      title: editedTitle,
      dueDate: new Date(editedDueDate),
    };
    dispatch("editTask", data);
    isEditingTask = false;
  }

  function handleCancelClick() {
    isEditingTask = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleSaveTask();
    } else if (event.key === "Escape") {
      handleCancelClick();
    }
  }

  afterUpdate(() => {
    if (isEditingTask && editInput) editInput.focus();
  });
</script>

<div class="columns is-mobile is-flex is-align-items-center">
  <div class="column is-narrow is-flex is-align-items-center">
    <input
      id={task.id}
      class="css-checkbox"
      name="title"
      type="checkbox"
      on:change={handleCheckboxClick}
      bind:checked={task.completed}
    />
    <label class="checkbox" for={task.id} />
  </div>

  {#if !isEditingTask}
    <div class="column is-flex is-align-items-center">
      <div class="content title is-5" class:checked={task.completed}>
        <span class:crossed={task.completed}>{task.title}</span>
      </div>
    </div>
    <TaskButtons
      action={handleEditClick}
      secondaryAction={handleDeleteClick}
      icon={Edit2Icon}
      secondaryIcon={Trash2}
    />
  {:else}
    <div class="column is-flex is-align-items-center">
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="text"
            bind:this={editInput}
            bind:value={editedTitle}
            on:keydown={handleKeyDown}
          />
        </div>
      </div>
    </div>
    <TaskButtons
      action={handleSaveTask}
      secondaryAction={handleCancelClick}
      icon={SaveIcon}
      secondaryIcon={XIcon}
    />
  {/if}
</div>
<div>
  {#if isEditingTask && task.dueDate}
    <div class="control">
      <input
        class="input session-date"
        type="date"
        bind:value={editedDueDate}
      />
    </div>
  {:else}
    <span class="has-text-grey">Due: {formatDate(task?.dueDate)}</span>
  {/if}
</div>

<style>
  .checked {
    color: gray;
  }

  .crossed {
    text-decoration: 3px rgb(41, 41, 41) line-through;
  }

  .css-checkbox {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }

  .css-checkbox + label {
    position: relative;
    font-size: 16px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    height: 36px;
    color: rgb(0, 0, 0);
  }

  .css-checkbox + label::before {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    margin-right: 3px;
    width: 30px;
    height: 30px;
    background-color: white;
    border-width: 3px;
    border-style: solid;
    border-radius: 8px;
    box-shadow: none;
  }
  .css-checkbox:checked + label::after {
    content: "";
    background-image: url("https://www.drupal.org/files/project-images/Very-Basic-Checked-checkbox-icon.png");
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center center;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0px;
    left: -3px;
    top: 0px;
    text-align: center;
    background-color: transparent;
    font-size: 10px;
    height: 36px;
    width: 36px;
  }
</style>
