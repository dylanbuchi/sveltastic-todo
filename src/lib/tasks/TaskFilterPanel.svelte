<script lang="ts">
  import { tasks, taskFilterOption, taskSearch } from "../../store/tasks.store";
  import { checkHasExpiredTasks } from "../../utils/helpers/tasks.helpers";

  let sortOption: string = "date-asc";

  $: {
    tasks.sort(sortOption);
  }
</script>

{#if $tasks.length}
  <section
    class="box p-5 my-0 mb-2 is-flex is-flex-direction-column is-fullwidth"
  >
    <h2 class="title is-5 has-text-centered">Filter Tasks</h2>
    <div class="is-flex is-justify-content-space-between is-flex-wrap-wrap">
      <div class="card p-3 is-fullwidth is-flex-grow-1">
        <label for="tasks-search" class="label">Search</label>
        <div class="field has-addons control is-expanded">
          <input
            bind:value={$taskSearch}
            name="tasks-search"
            class="input"
            type="text"
            placeholder="Search tasks..."
          />
          {#if $taskSearch}
            <button
              on:click={() => ($taskSearch = "")}
              class="ml-2 button is-info">Clear</button
            >
          {/if}
        </div>
      </div>
      <div class="mt-2 card p-3 is-fullwidth is-flex-grow-1">
        <label for="tasks-sort" class="label">Sort by</label>
        <div class="select is-fullwidth">
          <select
            class="is-fullwidth"
            name="tasks-sort"
            bind:value={sortOption}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="date-asc">Due Date (Newest)</option>
            <option value="date-desc">Due Date (Oldest)</option>
          </select>
        </div>
      </div>
      <div class="mt-2 card p-3 is-fullwidth is-flex-grow-1">
        <label for="tasks-filter" class="label">Show</label>
        <div class="select is-fullwidth">
          <select name="tasks-filter" bind:value={$taskFilterOption}>
            <option value="all">All tasks</option>
            <option value="completed">Completed tasks</option>
            <option value="active">Active tasks</option>
            {#if checkHasExpiredTasks($tasks)}
              <option value="expired">Expired tasks</option>
            {/if}
          </select>
        </div>
      </div>
    </div>
  </section>
{/if}
