<script lang="ts">
  import type { Task } from "../../models/task.model";
  import TaskItem from "./TaskItem.svelte";
  import autoAnimate from "@formkit/auto-animate";

  export let tasks: Task[];

  export let onRemoveTask: (event: CustomEvent) => void;
  export let onToggleComplete: (event: CustomEvent) => void;
  export let onEditTask: (event: CustomEvent) => void;
</script>

<ul use:autoAnimate>
  {#each tasks as task (task.id)}
    <li>
      <TaskItem
        on:editTask={onEditTask}
        on:toggleComplete={onToggleComplete}
        on:removeTask={onRemoveTask}
        {task}
      />
    </li>
  {/each}
</ul>
