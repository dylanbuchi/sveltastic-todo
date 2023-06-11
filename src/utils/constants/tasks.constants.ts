import type { TaskFilterOption, TaskSortOption } from '@/types/tasks.types';

export const taskSortOptionToName: Record<TaskSortOption, string> = {
	'created-date-desc': 'Created (Newest)',
	'created-date-asc': 'Created (Oldest)',

	'modified-date-desc': 'Modified (Newest)',
	'modified-date-asc': 'Modified (Oldest)',

	'due-date-desc': 'Due (Later)',
	'due-date-asc': 'Due (Soon)',

	'name-asc': 'Name (A-Z)',
	'name-desc': 'Name (Z-A)'
};

export const taskFilterOptionToName: Record<TaskFilterOption, string> = {
	all: 'All tasks',
	active: 'Active tasks',
	completed: 'Completed tasks',
	expired: 'Expired tasks'
};
