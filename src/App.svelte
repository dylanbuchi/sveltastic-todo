<script lang="ts">
  import TaskForm from "./lib/tasks/TaskForm.svelte";
  import TaskList from "./lib/tasks/TaskList.svelte";
  import { APP_NAME } from "./utils/constants/app.constants";

  import TaskFilterPanel from "./lib/tasks/TaskFilterPanel.svelte";
  import TaskActions from "./lib/tasks/TaskActions.svelte";
  import { tasks } from "./store/tasks.store";
</script>

<main class="container mx-auto">
  <h1 class="mt-4 title has-text-centered">{APP_NAME}</h1>
  <div class="columns">
    {#if $tasks.length}
      <div class="column is-one-quarter">
        <TaskFilterPanel />
      </div>
    {/if}
    <div class="column">
      <div class={$tasks.length ? "card" : undefined}>
        <div class="pt-5 px-5">
          <TaskForm />
        </div>
        {#if $tasks.length}
          <div class="card-content">
            <h2 class="title is-4">Tasks</h2>
            <TaskList />
          </div>
        {/if}
      </div>
    </div>
    {#if $tasks.length}
      <div class="column is-one-quarter">
        <TaskActions />
      </div>
    {/if}
  </div>
</main>
