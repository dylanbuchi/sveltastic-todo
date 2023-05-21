import { derived, writable } from 'svelte/store';
import type { Task } from '../models/task.model';
import { deleteAllCompleted, deleteAllExpired, setAllTasks } from '../utils/helpers/tasks.helpers';
import { isDateOlderThanOneDay } from '../utils/helpers/date.helpers';
import type { TaskCompletedOrActive, TaskFilterOption, TaskSortOption } from '../types/tasks.types';

function sortByDate(order: TaskSortOption) {
	const sortOrder = order === 'date-desc' ? -1 : 1;
	return (a: Task, b: Task) => {
		if (a?.dueDate == null || b?.dueDate == null) return 1;

		return sortOrder * (b.dueDate.getTime() - a.dueDate.getTime());
	};
}

function filterTasksBySearch(tasks: Task[], search: string) {
	if (search === '') return tasks;
	return tasks.filter((task) =>
		task.title.trim().toLowerCase().includes(search.toLowerCase().trim())
	);
}

function sortByName(order: TaskSortOption) {
	const sortOrder = order === 'name-desc' ? -1 : 1;
	return (a: Task, b: Task) => {
		if (a?.title == null || b?.title == null) return 0;

		return sortOrder * a.title.localeCompare(b.title);
	};
}

function createTasks() {
	const { subscribe, set, update } = writable<Task[]>([]);

	return {
		subscribe,
		add: (task: Task) =>
			update((tasks) => {
				const newTasks = [task, ...tasks];
				return newTasks;
			}),
		remove: (id: string) =>
			update((tasks) => {
				const newTasks = tasks.filter((task) => task.id !== id);
				return newTasks;
			}),
		update: (id: string, data: Partial<Task>) =>
			update((tasks) => {
				const newTasks = tasks.map((item) => {
					if (item.id === id) {
						return {
							...item,
							...data
						};
					}
					return item;
				});
				return newTasks;
			}),
		clear: () => {
			set([]);
		},
		sort: (order: TaskSortOption) => {
			update((tasks) => {
				const newTasks = [...tasks];
				if (order === 'name-asc' || order === 'name-desc') {
					newTasks.sort(sortByName(order));
				} else {
					newTasks.sort(sortByDate(order));
				}
				return newTasks;
			});
		},
		transform: (option: TaskCompletedOrActive) => {
			update((tasks) => {
				const newTasks = setAllTasks(tasks, option);
				return newTasks;
			});
		},
		deleteAllCompleted: () => {
			update((tasks) => {
				const newTasks = deleteAllCompleted(tasks);
				return newTasks;
			});
		},

		deleteAllExpired: () => {
			update((tasks) => {
				const newTasks = deleteAllExpired(tasks);
				return newTasks;
			});
		}
	};
}

export const tasks = createTasks();

export const taskFilterOption = writable<TaskFilterOption>('all');
export const taskSearch = writable('');

export const filteredTasks = derived(
	[tasks, taskFilterOption, taskSearch],
	([$tasks, $option, $taskSearch]) =>
		filterTasksBySearch($tasks, $taskSearch).filter((item: Task) => {
			if ($option === 'all') {
				return item;
			}
			if ($option === 'completed') {
				return item.completed;
			}
			if ($option === 'active') return !item.completed;
			if ($option === 'expired') return item?.dueDate && isDateOlderThanOneDay(item.dueDate);
		})
);
