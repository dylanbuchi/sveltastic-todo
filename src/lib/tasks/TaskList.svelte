<script lang="ts">
  import { tasks } from "../../store/tasks.store";
  import TaskItem from "./TaskItem.svelte";
  import autoAnimate from "@formkit/auto-animate";
</script>

<ul use:autoAnimate>
  {#each $tasks as task (task.id)}
    <li>
      <TaskItem {task} />
    </li>
  {/each}
</ul>
