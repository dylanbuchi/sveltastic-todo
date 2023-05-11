<script lang="ts">
  import TaskForm from "./lib/tasks/TaskForm.svelte";
  import TaskList from "./lib/tasks/TaskList.svelte";
  import type { Task } from "./models/task.model";
  import { APP_NAME } from "./utils/constants/app.constants";
  import {
    handleAddTask,
    handleEditTask,
    handleRemoveTask,
    handleToggleCompleteTask,
  } from "./utils/handlers/tasks.handlers";

  let tasks: Task[] = [];
</script>

<main class="container is-centered">
  <div class="card-content">
    <h1 class="title has-text-centered">{APP_NAME}</h1>
    <TaskForm on:addTask={(event) => (tasks = handleAddTask(tasks, event))} />
    <TaskList
      on:editTask={(event) => (tasks = handleEditTask(tasks, event))}
      on:toggleComplete={(event) =>
        (tasks = handleToggleCompleteTask(tasks, event))}
      on:removeTask={(event) => (tasks = handleRemoveTask(tasks, event))}
      {tasks}
    />
  </div>
</main>
