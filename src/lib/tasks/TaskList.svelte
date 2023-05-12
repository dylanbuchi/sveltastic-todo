<script lang="ts">
  import { filteredTasks } from "../../store/tasks.store";
  import TaskItem from "./TaskItem.svelte";
  import autoAnimate from "@formkit/auto-animate";
</script>

<ul use:autoAnimate>
  {#each $filteredTasks as task (task.id)}
    <li>
      <TaskItem {task} />
    </li>
  {/each}
</ul>
