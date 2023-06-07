import { derived, writable } from 'svelte/store';
import { deleteAllCompleted, deleteAllExpired, setAllTasks } from '../utils/helpers/tasks.helpers';
import { isDateOlderThanOneDay } from '../utils/helpers/date.helpers';
import type { TaskCompletedOrActive, TaskFilterOption, TaskSortOption } from '../types/tasks.types';

import type { Task } from '@prisma/client';

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
export const userId = writable('');

function createTasks() {
	const { subscribe, set, update } = writable<Task[]>([]);

	return {
		set,
		subscribe,
		add: async (title: string, dueDate: Date) => {
			try {
				const response = await fetch('/tasks', {
					method: 'POST',
					body: JSON.stringify({ title, dueDate })
				});

				if (!response.ok) {
					throw new Error(`${response.status} - ${response.statusText}`);
				}

				const data = await response.json();
				const task: Task = {
					...data,
					dueDate: new Date(data.dueDate),
					createdAt: new Date(data.createdAt),
					updatedAt: new Date(data.updatedAt)
				};

				update((tasks) => {
					let newTasks = tasks.filter((item) => item.userId);
					newTasks = [task, ...newTasks];
					return newTasks;
				});
			} catch (error) {
				console.error(error);
			}
		},
		remove: async (id: string) => {
			let originalTasks: Task[] = [];

			update((tasks) => {
				originalTasks = tasks;
				const newTasks = tasks.filter((task) => task.id !== id);

				return newTasks;
			});

			try {
				const response = await fetch(`/tasks/${id}`, {
					method: 'DELETE'
				});

				if (!response.ok) {
					throw new Error(`${response.status} - ${response.statusText}`);
				}
			} catch (error) {
				set(originalTasks);
				console.error(error);
			}
		},
		update: async (id: string, data: Partial<Task>) => {
			let originalTasks: Task[] = [];

			update((tasks) => {
				originalTasks = tasks;
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
			});

			try {
				const response = await fetch(`/tasks/${id}`, {
					method: 'PATCH',
					body: JSON.stringify(data)
				});

				if (!response.ok) {
					throw new Error(`${response.status} - ${response.statusText}`);
				}
			} catch (error) {
				set(originalTasks);
				console.error(error);
			}
		},
		clear: async () => {
			let originalTasks: Task[] = [];

			update((tasks) => (originalTasks = tasks));

			set([]);
			try {
				const response = await fetch('/tasks', {
					method: 'DELETE'
				});

				if (!response.ok) {
					throw new Error(`${response.status} - ${response.statusText}`);
				}
			} catch (error) {
				set(originalTasks);

				console.error(error);
			}
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
		deleteAllCompleted: async () => {
			let originalTasks: Task[] = [];
			update((tasks) => {
				originalTasks = tasks;
				const newTasks = deleteAllCompleted(tasks);
				return newTasks;
			});
			try {
				await fetch('/tasks?completed=true', {
					method: 'DELETE'
				});
			} catch (error) {
				set(originalTasks);

				console.error(error);
			}
		},

		deleteAllExpired: async () => {
			let originalTasks: Task[] = [];

			update((tasks) => {
				originalTasks = tasks;
				const newTasks = deleteAllExpired(tasks);
				return newTasks;
			});

			try {
				await fetch('/tasks?expired=true', {
					method: 'DELETE'
				});
			} catch (error) {
				set(originalTasks);
				console.error(error);
			}
		}
	};
}

export const tasks = createTasks();

export const taskFilterOption = writable<TaskFilterOption>('all');
export const taskSearch = writable('');
export const disableAnimation = writable(false);

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
