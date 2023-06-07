export type TaskCompletedOrActive = 'completed' | 'active';
export type TaskFilterOption = 'expired' | 'all' | TaskCompletedOrActive;
export type TaskSortOption =
	| 'name-asc'
	| 'name-desc'
	| 'due-date-asc'
	| 'due-date-desc'
	| 'created-date-asc'
	| 'created-date-desc'
	| 'modified-date-asc'
	| 'modified-date-desc';
