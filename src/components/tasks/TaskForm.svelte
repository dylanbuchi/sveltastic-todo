<script lang="ts">
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';
	import { formatDateISO } from '../../utils/helpers/date.helpers';
	import { tasks } from '../../store/tasks.store';
	import { scrollWindowToTop } from '../../utils/helpers/dom.helpers';

	export let handleScrollTop: () => void;

	let taskTitle = '';

	let dueDate = new Date();

	let formattedDate = formatDateISO(dueDate);

	let taskTitleInputElement: HTMLInputElement;

	function handleSubmit() {
		handleScrollTop();

		focusInput();

		if (taskTitle.trim().length > 0) {
			const newTask = {
				id: nanoid(),
				title: taskTitle,
				completed: false,
				dueDate: new Date(formattedDate)
			};

			tasks.add(newTask);

			taskTitle = '';
			dueDate = new Date();
		}
	}

	function focusInput() {
		scrollWindowToTop();
		taskTitleInputElement.focus();
	}

	onMount(focusInput);
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="field has-addons">
		<div class="control is-expanded">
			<input
				class="input"
				type="text"
				placeholder="Enter task"
				bind:value={taskTitle}
				bind:this={taskTitleInputElement}
			/>
		</div>
		<div class="control">
			<input
				class="input session-date"
				min={formatDateISO(new Date())}
				type="date"
				bind:value={formattedDate}
			/>
		</div>
		<div class="control">
			<button class="button is-link" type="submit">Add Task</button>
		</div>
	</div>
</form>
