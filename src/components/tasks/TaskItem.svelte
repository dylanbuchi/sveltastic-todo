<script lang="ts">
	import { afterUpdate } from 'svelte';
	import type { Task } from '../../models/task.model';
	import { Edit2Icon, SaveIcon, Trash2, XIcon } from 'lucide-svelte';

	import {
		formatDate,
		formatDateISO,
		isDateOlderThanOneDay
	} from '../../utils/helpers/date.helpers';
	import { tasks } from '../../store/tasks.store';
	import TaskIcons from './TaskIcons.svelte';

	export let task: Task;

	let isEditingTask = false;
	let editedTitle = task.title;

	const expiredTask = (task?.dueDate && isDateOlderThanOneDay(task?.dueDate)) ?? false;

	let editedDueDate = task.dueDate?.toISOString().slice(0, 10) ?? new Date().toISOString();

	let editInput: HTMLInputElement;

	function handleEditClick() {
		isEditingTask = true;
	}

	function handleCancelClick() {
		isEditingTask = false;
	}

	function handleSaveTaskWrapper() {
		tasks.update(task.id, {
			title: editedTitle,
			dueDate: new Date(editedDueDate)
		});
		isEditingTask = false;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSaveTaskWrapper();
		} else if (event.key === 'Escape') {
			handleCancelClick();
		}
	}

	afterUpdate(() => {
		if (isEditingTask && editInput) editInput.focus();
	});
</script>

<div
	class="mt-5 box {task.completed && !isEditingTask
		? 'has-background-grey-lighter'
		: ''} {expiredTask ? 'expired' : ''}"
>
	<div class="columns is-mobile is-flex is-align-items-center">
		{#if !isEditingTask}
			<div class="column is-flex is-align-items-center">
				<div class="column is-narrow is-flex is-align-items-center">
					<input
						id={task.id}
						class="css-checkbox"
						name="title"
						type="checkbox"
						on:change={() => tasks.update(task.id, { completed: !task.completed })}
						bind:checked={task.completed}
					/>
					<label class="checkbox" for={task.id} />
				</div>
				<div class="content title is-5" class:checked={task.completed}>
					<span class:crossed={task.completed}>{task.title}</span>
				</div>
			</div>
			<TaskIcons
				action={handleEditClick}
				icon={Edit2Icon}
				secondaryAction={() => tasks.remove(task.id)}
				secondaryIcon={Trash2}
			/>
		{:else}
			<div class="column is-flex is-align-items-center">
				<div class="field">
					<div class="control">
						<input
							class="input"
							type="text"
							bind:this={editInput}
							bind:value={editedTitle}
							on:keydown={handleKeyDown}
						/>
					</div>
				</div>
			</div>
			<TaskIcons
				action={handleSaveTaskWrapper}
				icon={SaveIcon}
				secondaryAction={handleCancelClick}
				secondaryIcon={XIcon}
			/>
		{/if}
	</div>
	<div>
		{#if isEditingTask && task.dueDate}
			<div class="control">
				<input
					class="input session-date"
					type="date"
					min={formatDateISO(new Date())}
					bind:value={editedDueDate}
					on:keydown={handleKeyDown}
				/>
			</div>
		{:else}
			<span class="has-text-grey" class:crossed={task.completed}
				>Due: {task?.dueDate && formatDate(task.dueDate)}</span
			>
		{/if}
	</div>
</div>

<style>
	.checked {
		color: gray;
	}

	.crossed {
		text-decoration: 3px rgb(41, 41, 41) line-through;
	}

	.css-checkbox {
		position: absolute;
		overflow: hidden;
		clip: rect(0 0 0 0);
		height: 1px;
		width: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
	}

	.css-checkbox + label {
		position: relative;
		font-size: 16px;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		height: 36px;
		color: rgb(0, 0, 0);
	}

	.css-checkbox + label::before {
		content: ' ';
		display: inline-block;
		vertical-align: middle;
		margin-right: 3px;
		width: 30px;
		height: 30px;
		background-color: white;
		border-width: 3px;
		border-style: solid;
		border-radius: 8px;
		box-shadow: none;
	}
	.css-checkbox:checked + label::after {
		content: '';
		background-image: url('https://www.drupal.org/files/project-images/Very-Basic-Checked-checkbox-icon.png');
		background-repeat: no-repeat;
		background-size: 20px 20px;
		background-position: center center;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 0px;
		left: -3px;
		top: 0px;
		text-align: center;
		background-color: transparent;
		font-size: 10px;
		height: 36px;
		width: 36px;
	}
	.expired {
		border: 2px solid rgb(147, 12, 12);
		background-color: rgb(239, 214, 214);
	}
</style>
