<script lang="ts">
  import type { Task } from "../models/task.model";
  import TaskItem from "./TaskItem.svelte";

  export let tasks: Task[];

  export let onRemoveTask: (event: CustomEvent) => void;
  export let onToggleComplete: (event: CustomEvent) => void;
</script>

<ul>
  {#each tasks as task (task.id)}
    <li class="mt-5 box {task.completed ? 'has-background-grey-lighter' : ''}">
      <TaskItem
        on:toggleComplete={onToggleComplete}
        on:removeTask={onRemoveTask}
        {task}
      />
    </li>
  {/each}
</ul>
