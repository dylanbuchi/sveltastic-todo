import type { Task } from '@prisma/client';
import type { TaskCompletedOrActive, TaskSortOption } from '@/types/tasks.types';

import { formatDateISO, isDateOlderThanOneDay } from './date.helpers';

export function exportTasksAsJSON(tasks: Task[]) {
	const tasksToExport = tasks.map(({ title, completed, dueDate, createdAt, updatedAt }) => {
		return {
			title,
			completed,
			dueDate: dueDate && formatDateISO(dueDate),
			createdAt: createdAt && formatDateISO(createdAt),
			updatedAt: updatedAt && formatDateISO(updatedAt)
		};
	});

	const data = JSON.stringify(tasksToExport);
	const blob = new Blob([data], { type: 'application/json' });

	const url = window?.URL.createObjectURL(blob);
	const aElement = document.createElement('a');

	aElement.href = url;
	aElement.download = 'my-tasks.json';
	aElement.click();

	window.URL.revokeObjectURL(url);
}

export function checkIsAllCompleted(tasks: Task[]) {
	return tasks?.length > 0 && tasks.every((task) => task.completed);
}

export function checkSomeAreCompleted(tasks: Task[]) {
	return tasks?.length > 0 && tasks.some((task) => task.completed);
}

export function setAllTasks(tasks: Task[], option: TaskCompletedOrActive) {
	const lowerOption = option.toLowerCase();
	if (lowerOption === 'completed') {
		return tasks.map((task) => ({ ...task, completed: true }));
	}
	if (lowerOption === 'active') {
		return tasks.map((task) => ({ ...task, completed: false }));
	}
	return tasks;
}

export function deleteAllCompleted(tasks: Task[]) {
	return tasks.filter((task) => !task.completed);
}

export function deleteAllExpired(tasks: Task[]) {
	return tasks.filter((task) => {
		if (task?.dueDate) {
			return !isDateOlderThanOneDay(task.dueDate);
		}
		return task;
	});
}

export function checkHasExpiredTasks(tasks: Task[]) {
	return tasks.some((task) => {
		if (task?.dueDate) {
			return isDateOlderThanOneDay(task.dueDate);
		}
	});
}

export function sortByDateUI(order: TaskSortOption) {
	let sortOrder = 1;

	if (
		order === 'created-date-desc' ||
		order === 'modified-date-desc' ||
		order === 'due-date-desc'
	) {
		sortOrder = -1;
	}

	let dateProperty: keyof Task = 'createdAt';

	if (order === 'modified-date-asc' || order === 'modified-date-desc') {
		dateProperty = 'updatedAt';
	} else if (order === 'due-date-asc' || order === 'due-date-desc') {
		dateProperty = 'dueDate';
	}

	return (a: Task, b: Task) => {
		const dateA = a?.[dateProperty];
		const dateB = b?.[dateProperty];

		if (dateA instanceof Date && dateB instanceof Date) {
			return sortOrder * (dateA.getTime() - dateB.getTime());
		}

		return 0;
	};
}

export function getSortOptions(order: TaskSortOption) {
	let column = 'createdAt';
	let sort: 'asc' | 'desc' = 'asc';

	switch (order) {
		case 'created-date-asc':
			column = 'createdAt';
			sort = 'asc';
			break;
		case 'created-date-desc':
			column = 'createdAt';
			sort = 'desc';
			break;
		case 'modified-date-asc':
			column = 'updatedAt';
			sort = 'asc';
			break;
		case 'modified-date-desc':
			column = 'updatedAt';
			sort = 'desc';
			break;
		case 'due-date-asc':
			column = 'dueDate';
			sort = 'asc';
			break;
		case 'due-date-desc':
			column = 'dueDate';
			sort = 'desc';
			break;

		case 'name-asc':
			column = 'title';
			sort = 'asc';
			break;
		case 'name-desc':
			column = 'title';
			sort = 'desc';
			break;
		default:
			column = 'createdAt';
			sort = 'asc';
			break;
	}

	return { column, sort };
}

export function filterTasksBySearch(tasks: Task[], search: string) {
	if (search === '') return tasks;
	return tasks.filter((task) =>
		task.title.trim().toLowerCase().includes(search.toLowerCase().trim())
	);
}

export function sortByName(order: TaskSortOption) {
	const sortOrder = order === 'name-desc' ? -1 : 1;
	return (a: Task, b: Task) => {
		if (a?.title == null || b?.title == null) return 0;

		return sortOrder * a.title.localeCompare(b.title);
	};
}
