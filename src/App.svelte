<script lang="ts">
  import { onMount } from "svelte";
  import TaskForm from "./lib/tasks/TaskForm.svelte";
  import TaskList from "./lib/tasks/TaskList.svelte";
  import type { Task } from "./models/task.model";
  import { APP_NAME } from "./utils/constants/app.constants";

  import { loadTasksFromLocalStorage } from "./utils/helpers/local-storage.helpers";
  import TaskFilterPanel from "./lib/tasks/TaskFilterPanel.svelte";

  let tasks: Task[] = [];

  onMount(() => {
    tasks = loadTasksFromLocalStorage();
  });
</script>

<main class="container is-centered">
  <div class="card-content">
    <h1 class="title has-text-centered">{APP_NAME}</h1>
    <TaskForm />
    <TaskFilterPanel />
    <TaskList />
  </div>
</main>
