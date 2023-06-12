import { browser } from '$app/environment';
import type { Task } from '@/models/task.model';
import { DARK_MODE_LOCAL_STORAGE_KEY, TASKS_LOCAL_STORAGE_KEY } from '../constants/app.constants';
import { taskJsonSchema } from '../validators/tasks.validators';

export function loadTasksFromLocalStorage() {
	if (browser) {
		const tasksJSON = localStorage?.getItem(TASKS_LOCAL_STORAGE_KEY);
		const tasks: Task[] = tasksJSON ? taskJsonSchema.array().parse(JSON.parse(tasksJSON)) : [];
		return tasks;
	}
}

export function loadDarkModeFromLocalStorage() {
	if (browser) {
		const isDarkMode = localStorage?.getItem(DARK_MODE_LOCAL_STORAGE_KEY);
		return isDarkMode === 'true';
	}
	return false;
}

export function saveDarkModeToLocalStorage(isDarkMode: boolean) {
	if (browser) {
		const darkModeStr = JSON.stringify(isDarkMode);
		localStorage?.setItem(DARK_MODE_LOCAL_STORAGE_KEY, darkModeStr);
	}
}

export function saveTasksToLocalStorage(tasks: Task[]) {
	if (browser) {
		const tasksJSON = JSON.stringify(tasks);
		localStorage?.setItem(TASKS_LOCAL_STORAGE_KEY, tasksJSON);
	}
}
