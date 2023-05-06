<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Task } from "../models/task.model";
  import { Trash2 } from "lucide-svelte";

  const dispatch = createEventDispatcher();

  export let task: Task;

  function handleCheckboxClick() {
    dispatch("toggleComplete", { taskId: task.id });
  }

  function handleDeleteClick() {
    dispatch("removeTask", { taskId: task.id });
  }
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
  <div class="column is-flex is-align-items-center">
    <div class="content title is-5" class:checked={task.completed}>
      <span class:crossed={task.completed}>{task.title}</span>
    </div>
  </div>
  <div class="column is-narrow is-flex is-align-items-center">
    <button class="button is-danger is-small" on:click={handleDeleteClick}>
      <span class="icon is-small">
        <Trash2 />
      </span>
    </button>
  </div>
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
