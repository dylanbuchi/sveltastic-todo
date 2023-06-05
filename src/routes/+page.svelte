<script lang="ts">
	import TaskForm from '@/components/tasks/TaskForm.svelte';
	import TaskList from '@/components/tasks/TaskList.svelte';

	import TaskFilterPanel from '@/components/tasks/TaskFilterPanel.svelte';
	import TaskActions from '@/components/tasks/TaskActions.svelte';
	import { taskSearch, tasks, filteredTasks } from '@/store/tasks.store';
	import { scrollWindowToTop } from '@/utils/helpers/dom.helpers';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Task } from '@prisma/client';

	let taskListDiv: HTMLDivElement;

	export let data: PageData;
	$: userTasks = data.tasks;

	function handleScrollTop() {
		if (taskListDiv == null) return;
		taskListDiv.scroll({ behavior: 'smooth', top: 0 });
	}

	onMount(() => {
		scrollWindowToTop();
		tasks.set(userTasks ?? ([] as Task[]));
	});
</script>

<div class="app p-4">
	<div class="columns">
		{#if $tasks.length}
			<div
				on:keydown={() => scrollWindowToTop()}
				on:click={() => scrollWindowToTop()}
				class="column is-one-quarter"
			>
				<TaskFilterPanel />
			</div>
		{/if}
		<div class="column">
			<div class={$tasks.length ? 'card' : undefined}>
				<div class="p-5">
					<TaskForm {handleScrollTop} />
				</div>
				{#if $tasks.length}
					<div
						bind:this={taskListDiv}
						on:keydown={() => scrollWindowToTop()}
						on:click={() => scrollWindowToTop()}
						class="card-content"
						style="max-height: 65vh; overflow-y: scroll;"
					>
						<h2 class="title is-4">Tasks</h2>
						<TaskList />
						{#if !$filteredTasks.length && $taskSearch}
							<h3 class="has-text-centered">No Tasks found</h3>
						{/if}
					</div>
				{/if}
			</div>
		</div>
		{#if $tasks.length}
			<div
				on:keydown={() => scrollWindowToTop()}
				on:click={() => scrollWindowToTop()}
				class="column is-one-quarter"
			>
				<TaskActions />
			</div>
		{/if}
	</div>
</div>

<style>
	.app {
		min-height: calc(100vh - 3rem);
	}
</style>
