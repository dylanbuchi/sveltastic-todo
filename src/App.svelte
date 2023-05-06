<script lang="ts">
  import TaskForm from "./lib/TaskForm.svelte";
  import TaskList from "./lib/TaskList.svelte";
  import type { Task } from "./models/task.model";
  import { APP_NAME } from "./utils/constants/app.constants";

  let tasks: Task[] = [];

  function handleAddTask(event: CustomEvent) {
    const { task } = event.detail;
    tasks = [task, ...tasks];
  }

  function handleRemoveTask(event: CustomEvent) {
    const { taskId } = event.detail;
    tasks = tasks.filter((item) => item.id !== taskId);
  }

  function handleToggleComplete(event: CustomEvent) {
    const { taskId } = event.detail;
    tasks = tasks.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
  }
</script>

<main class="container is-centered">
  <div class="card-content">
    <h1 class="title has-text-centered">{APP_NAME}</h1>
    <TaskForm on:addTask={handleAddTask} />
    <TaskList
      onRemoveTask={handleRemoveTask}
      onToggleComplete={handleToggleComplete}
      {tasks}
    />
  </div>
</main>
