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
