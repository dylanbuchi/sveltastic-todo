<script lang="ts">
  import type { Task } from "../../models/task.model";
  import type { TaskEvent } from "../../utils/events/tasks.events";
  import TaskItem from "./TaskItem.svelte";
  import autoAnimate from "@formkit/auto-animate";

  export let tasks: Task[];

  export let onRemoveTask: (
    event: CustomEvent<TaskEvent["removeTask"]>
  ) => void;
  export let onToggleComplete: (
    event: CustomEvent<TaskEvent["toggleComplete"]>
  ) => void;
  export let onEditTask: (event: CustomEvent<TaskEvent["editTask"]>) => void;
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
