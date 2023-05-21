<script lang="ts">
	import TaskForm from '../components/tasks/TaskForm.svelte';
	import TaskList from '../components/tasks/TaskList.svelte';
	import { APP_NAME } from '../utils/constants/app.constants';

	import TaskFilterPanel from '../components/tasks/TaskFilterPanel.svelte';
	import TaskActions from '../components/tasks/TaskActions.svelte';
	import { taskSearch, tasks, filteredTasks } from '../store/tasks.store';
	import Footer from '../components/Footer.svelte';
	import { scrollWindowToTop } from '../utils/helpers/dom.helpers';
	import { onMount } from 'svelte';

	let taskListDiv: HTMLDivElement;

	function handleScrollTop() {
		if (taskListDiv == null) return;
		taskListDiv.scroll({ behavior: 'smooth', top: 0 });
	}

	onMount(scrollWindowToTop);
</script>

<main class="container mx-auto pb-6" style={!$tasks.length ? 'height: 100vh' : ''}>
	<h1 class="mt-4 title has-text-centered">{APP_NAME}</h1>
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
</main>
<Footer />
