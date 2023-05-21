<script lang="ts">
	import { tasks, taskFilterOption, taskSearch } from '../../store/tasks.store';
	import type { TaskFilterOption, TaskSortOption } from '../../types/tasks.types';
	import {
		taskFilterOptionToName,
		taskSortOptionToName
	} from '../../utils/constants/tasks.constants';
	import { checkHasExpiredTasks } from '../../utils/helpers/tasks.helpers';

	let sortOption: TaskSortOption = 'date-asc';

	let expiredOption: HTMLOptionElement;

	let taskFilterOptions = Object.entries(taskFilterOptionToName).map(([key, value]) => ({
		key: key as TaskFilterOption,
		value
	}));

	$: if (expiredOption) {
		expiredOption.hidden = !checkHasExpiredTasks($tasks);
	}

	$: {
		tasks.sort(sortOption);
	}
</script>

{#if $tasks.length}
	<section class="box p-5 my-0 mb-2 is-flex is-flex-direction-column is-fullwidth">
		<h2 class="title is-5 has-text-centered">Filter Tasks</h2>
		<div class="is-flex is-justify-content-space-between is-flex-wrap-wrap">
			<div class="card p-3 is-fullwidth is-flex-grow-1">
				<label for="tasks-search" class="label">Search</label>
				<div class="field has-addons control is-expanded">
					<input
						bind:value={$taskSearch}
						id="tasks-search"
						name="tasks-search"
						class="input"
						type="text"
						placeholder="Search tasks..."
						aria-label="Search tasks"
					/>
					{#if $taskSearch}
						<button on:click={() => ($taskSearch = '')} class="ml-2 button is-info">Clear</button>
					{/if}
				</div>
			</div>
			<div class="mt-2 card p-3 is-fullwidth is-flex-grow-1">
				<label for="tasks-sort" class="label">Sort by</label>
				<div class="select is-fullwidth">
					<select
						id="tasks-sort"
						name="tasks-sort"
						class="is-fullwidth"
						aria-label="Sort tasks by"
						bind:value={sortOption}
					>
						{#each Object.entries(taskSortOptionToName) as [key, value]}
							<option value={key}>{value}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="mt-2 card p-3 is-fullwidth is-flex-grow-1">
				<label for="tasks-filter" class="label">Show</label>
				<div class="select is-fullwidth">
					<select
						id="tasks-filter"
						name="tasks-filter"
						aria-label="Filter tasks by"
						bind:value={$taskFilterOption}
					>
						{#each taskFilterOptions as { key, value }}
							{#if key === 'expired'}
								<option bind:this={expiredOption} value={key}>{value}</option>
							{:else}
								<option value={key}>{value}</option>
							{/if}
						{/each}
					</select>
				</div>
			</div>
		</div>
	</section>
{/if}
