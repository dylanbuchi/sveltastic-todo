<script lang="ts">
	import { afterUpdate } from 'svelte';

	import { Edit2Icon, SaveIcon, Trash2, XIcon } from 'lucide-svelte';

	import { formatDate, formatDateISO, isDateOlderThanOneDay } from '@/utils/helpers/date.helpers';
	import { tasks } from '@/store/tasks.store';
	import TaskIcons from './TaskIcons.svelte';
	import type { Task } from '@prisma/client';
	import { isDarkMode } from '@/store/theme.store';

	export let task: Task;

	let isEditingTask = false;
	let editedTitle = task.title;

	$: expiredTask = (task?.dueDate && isDateOlderThanOneDay(task?.dueDate)) ?? false;

	let editedDueDate = task.dueDate?.toISOString().slice(0, 10) ?? new Date().toISOString();

	let editInput: HTMLInputElement;

	function handleEditClick() {
		isEditingTask = true;
	}

	function handleCancelClick() {
		isEditingTask = false;
	}

	function handleSaveClick() {
		tasks.update(task.id, {
			title: editedTitle,
			dueDate: new Date(editedDueDate)
		});
		isEditingTask = false;
	}

	function handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
				handleSaveClick();
				break;
			case 'Escape':
				handleCancelClick();
				break;
		}
	}

	afterUpdate(() => {
		if (isEditingTask && editInput) editInput.focus();
	});
</script>

<div
	class="mt-5 box"
	class:dark={$isDarkMode}
	class:has-background-black-ter={$isDarkMode && task.completed && !isEditingTask}
	class:has-background-grey-lighter={!$isDarkMode && task.completed && !isEditingTask}
	class:expired={expiredTask}
>
	<div class="has-bac columns is-mobile is-flex is-align-items-center">
		{#if !isEditingTask}
			<div class="column is-flex is-align-items-center">
				<div class="column is-narrow is-flex is-align-items-center">
					<input
						id={task.id}
						name="title"
						type="checkbox"
						on:change={() => tasks.update(task.id, { completed: !task.completed })}
						bind:checked={task.completed}
					/>
					<label for={task.id} />
				</div>
				<div
					class="content title is-5"
					class:checked-dark={$isDarkMode && task.completed}
					class:checked={!$isDarkMode && task.completed}
				>
					<span
						class:text-dark={$isDarkMode}
						class:crossed={!$isDarkMode && task.completed}
						class:crossed-dark={$isDarkMode && task.completed}
						>{task.title}
					</span>
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
							class:input-dark={$isDarkMode}
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
				action={handleSaveClick}
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
					class:input-dark={$isDarkMode}
					class="input session-date"
					type="date"
					min={formatDateISO(new Date())}
					bind:value={editedDueDate}
					on:keydown={handleKeyDown}
				/>
			</div>
		{:else}
			<span
				class:text-dark={$isDarkMode}
				class:crossed={!$isDarkMode && task.completed}
				class:crossed-dark={$isDarkMode && task.completed}
				>Due: {task?.dueDate && formatDate(task.dueDate)}</span
			>
		{/if}
	</div>
</div>

<style>
	.checked {
		color: gray;
	}

	.checked-dark {
		color: rgb(24, 24, 24);
	}

	.crossed {
		text-decoration: 3px rgb(41, 41, 41) line-through;
	}

	.crossed-dark {
		text-decoration: 3px rgb(170, 169, 169) line-through;
		color: gray;
	}

	input[type='checkbox'] {
		cursor: pointer;
		appearance: none;
		width: 30px;
		height: 30px;
		border-width: 3px;
		border-style: solid;
		border-radius: 8px;
		box-shadow: none;
		vertical-align: middle;
		margin-right: 3px;
		background-color: white;
	}

	input[type='checkbox']:checked {
		background-image: url('https://www.drupal.org/files/project-images/Very-Basic-Checked-checkbox-icon.png');
		background-repeat: no-repeat;
		background-size: 20px 20px;
		background-position: center center;
	}

	.expired {
		border: 2px solid rgb(147, 12, 12);
		background-color: rgb(239, 214, 214);
	}
</style>
