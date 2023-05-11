<script lang="ts">
  import type { Task } from "../../models/task.model";

  import TaskItem from "./TaskItem.svelte";
  import autoAnimate from "@formkit/auto-animate";

  export let tasks: Task[];
</script>

<ul use:autoAnimate>
  {#each tasks as task (task.id)}
    <li>
      <TaskItem on:editTask on:toggleComplete on:removeTask {task} />
    </li>
  {/each}
</ul>
