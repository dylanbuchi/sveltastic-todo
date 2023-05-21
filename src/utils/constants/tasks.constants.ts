import type { TaskFilterOption, TaskSortOption } from '../../types/tasks.types';

export const taskSortOptionToName: Record<TaskSortOption, string> = {
	'date-asc': 'Due Date (Newest)',
	'date-desc': 'Due Date (Oldest)',
	'name-asc': 'Name (A-Z)',
	'name-desc': 'Name (Z-A)'
};

export const taskFilterOptionToName: Record<TaskFilterOption, string> = {
	all: 'All tasks',
	active: 'Active tasks',
	completed: 'Completed tasks',
	expired: 'Expired tasks'
};
