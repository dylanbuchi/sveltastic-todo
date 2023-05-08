<script lang="ts">
  import TaskForm from "./lib/tasks/TaskForm.svelte";
  import TaskList from "./lib/tasks/TaskList.svelte";
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

  function handleEditTask(event: CustomEvent) {
    const { taskId, title } = event.detail;
    tasks = tasks.map((item) =>
      item.id === taskId
        ? { ...item, title: title.length ? title : item.title }
        : item
    );
  }
</script>

<main class="container is-centered">
  <div class="card-content">
    <h1 class="title has-text-centered">{APP_NAME}</h1>
    <TaskForm on:addTask={handleAddTask} />
    <TaskList
      onEditTask={handleEditTask}
      onRemoveTask={handleRemoveTask}
      onToggleComplete={handleToggleComplete}
      {tasks}
    />
  </div>
</main>
