<script lang="ts">
	import { isDarkMode } from '@/store/theme.store';
	import { tasks, taskFilterOption, taskSearch } from '@/store/tasks.store';
	import type { TaskFilterOption, TaskSortOption } from '@/types/tasks.types';
	import { taskFilterOptionToName, taskSortOptionToName } from '@/utils/constants/tasks.constants';
	import { checkHasExpiredTasks } from '@/utils/helpers/tasks.helpers';

	let sortOption: TaskSortOption = 'created-date-desc';

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
	<section
		class:card-dark={$isDarkMode}
		class="box p-5 my-0 mb-2 is-flex is-flex-direction-column is-fullwidth"
	>
		<h2 class:text-dark={$isDarkMode} class="title is-5 has-text-centered">Filter Tasks</h2>
		<div class="is-flex is-justify-content-space-between is-flex-wrap-wrap">
			<div class:dark={$isDarkMode} class="card p-3 is-fullwidth is-flex-grow-1">
				<label class:text-dark={$isDarkMode} for="tasks-search" class="label">Search</label>
				<div class="field has-addons control is-expanded">
					<input
						class:input-dark={$isDarkMode}
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
			<div class:dark={$isDarkMode} class="mt-2 card p-3 is-fullwidth is-flex-grow-1">
				<label class:text-dark={$isDarkMode} for="tasks-sort" class="label">Sort by</label>
				<div class:is-dark={$isDarkMode} class="select is-fullwidth">
					<select
						class:has-background-black-ter={$isDarkMode}
						class:has-text-light={$isDarkMode}
						id="tasks-sort"
						name="tasks-sort"
						class="is-fullwidth"
						aria-label="Sort tasks by"
						bind:value={sortOption}
					>
						{#each Object.entries(taskSortOptionToName) as [key, value]}
							<option class:input-dark={$isDarkMode} value={key}>{value}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class:dark={$isDarkMode} class="mt-2 card p-3 is-fullwidth is-flex-grow-1">
				<label class:text-dark={$isDarkMode} for="tasks-filter" class="label">Show</label>
				<div class:is-dark={$isDarkMode} class="select is-fullwidth">
					<select
						class:has-background-black-ter={$isDarkMode}
						class:has-text-light={$isDarkMode}
						class="is-fullwidth"
						id="tasks-filter"
						name="tasks-filter"
						aria-label="Filter tasks by"
						bind:value={$taskFilterOption}
					>
						{#each taskFilterOptions as { key, value }}
							{#if key === 'expired'}
								<option class:input-dark={$isDarkMode} bind:this={expiredOption} value={key}
									>{value}</option
								>
							{:else}
								<option class:input-dark={$isDarkMode} value={key}>{value}</option>
							{/if}
						{/each}
					</select>
				</div>
			</div>
		</div>
	</section>
{/if}
