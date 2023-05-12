<script lang="ts">
  import { tasks, taskFilterOption, taskSearch } from "../../store/tasks.store";

  let sortOption: string = "date-asc";

  $: {
    tasks.sort(sortOption);
  }
</script>

<section class="box p-5 mt-5">
  <h2 class="title is-4 has-text-centered">Filter Tasks</h2>
  <div class="is-flex is-justify-content-space-between is-flex-wrap-wrap">
    <div>
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
    <div>
      <label for="tasks-sort" class="label">Sort by</label>
      <div class="select">
        <select name="tasks-sort" bind:value={sortOption}>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="date-asc">Due Date (Newest)</option>
          <option value="date-desc">Due Date (Oldest)</option>
        </select>
      </div>
    </div>
    <div>
      <label for="tasks-filter" class="label">Show</label>
      <div class="select">
        <select name="tasks-filter" bind:value={$taskFilterOption}>
          <option value="all">All tasks</option>
          <option value="completed">Completed tasks</option>
          <option value="active">Active tasks</option>
        </select>
      </div>
    </div>
  </div>
</section>
