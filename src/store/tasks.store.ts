import { derived, writable } from 'svelte/store';
import {
	deleteAllCompleted,
	deleteAllExpired,
	filterTasksBySearch,
	setAllTasks,
	sortByDateUI,
	sortByName
} from '../utils/helpers/tasks.helpers';
import { isDateOlderThanOneDay } from '../utils/helpers/date.helpers';
import type { TaskCompletedOrActive, TaskFilterOption, TaskSortOption } from '../types/tasks.types';

import type { Task } from '@prisma/client';
import { generateRandomString } from 'lucia/utils';

function createTasks() {
	const { subscribe, set, update } = writable<Task[]>([]);

	return {
		set,
		subscribe,
		add: async (title: string, dueDate: Date) => {
			let originalTasks: Task[] = [];
			let task: Task = {
				id: generateRandomString(6),
				userId: null,
				title,
				dueDate,
				updatedAt: new Date(),
				createdAt: new Date(),
				completed: false
			};
			try {
				update((tasks) => {
					originalTasks = tasks;
					const newTasks = [task, ...tasks];
					return newTasks;
				});

				const response = await fetch('/tasks', {
					method: 'POST',
					body: JSON.stringify({ title, dueDate })
				});

				if (!response.ok) {
					throw new Error(`${response.status} - ${response.statusText}`);
				}

				const data = await response.json();
				task = {
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
				set(originalTasks);
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
					console.log(response);

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
		sort: async (order: TaskSortOption) => {
			let originalTasks: Task[] = [];
			update((tasks) => {
				originalTasks = tasks;
				const newTasks = [...tasks];

				if (order === 'name-asc' || order === 'name-desc') {
					newTasks.sort(sortByName(order));
				} else {
					newTasks.sort(sortByDateUI(order));
				}
				return newTasks;
			});
			try {
				const response = await fetch(`/tasks?${order}`, {
					method: 'GET'
				});

				const data = await response.json();

				const tasks: Task[] = data.map((item: any) => {
					return {
						...item,
						dueDate: new Date(item.dueDate),
						createdAt: new Date(item.createdAt),
						updatedAt: new Date(item.updatedAt)
					};
				});

				set(tasks);
			} catch (error) {
				set(originalTasks);
			}
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
