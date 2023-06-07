import type { Task } from '@prisma/client';
import type { TaskCompletedOrActive } from '@/types/tasks.types';
import { isDateOlderThanOneDay } from './date.helpers';

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

