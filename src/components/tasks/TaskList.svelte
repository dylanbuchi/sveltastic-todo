<script lang="ts">
	import { filteredTasks } from '@/store/tasks.store';
	import TaskItem from './TaskItem.svelte';
	import { flip } from 'svelte/animate';
</script>

<ul>
	{#each $filteredTasks as task (task.id)}
		<li animate:flip={{ duration: 500 }}>
			<TaskItem {task} />
		</li>
	{/each}
</ul>
