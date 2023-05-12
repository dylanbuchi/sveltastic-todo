<script lang="ts">
  import { tasks } from "../../store/tasks.store";
  import { formatTitle } from "../../utils/helpers/string.helpers";
  import { checkIsAllCompleted } from "../../utils/helpers/tasks.helpers";

  let option: "active" | "completed";

  $: {
    option = checkIsAllCompleted($tasks) ? "active" : "completed";
  }
</script>

<section class="box p-5 is-flex is-flex-direction-column">
  <h2 class="title is-5 has-text-centered">Manage Tasks</h2>
  <button
    on:click={() => tasks.transform(option)}
    class="button is-fullwidth is-link"
  >
    Set All {formatTitle(option)}</button
  >
  <button on:click={tasks.clear} class="mt-2 button is-fullwidth is-danger">
    Delete All</button
  >
  {#if option !== "completed"}
    <button
      on:click={tasks.deleteAllCompleted}
      class="mt-2 button is-fullwidth is-danger">Delete All Completed</button
    >
  {/if}
</section>
