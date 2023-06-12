import {
	loadDarkModeFromLocalStorage,
	saveDarkModeToLocalStorage
} from '@/utils/helpers/local-storage.helpers';
import { writable } from 'svelte/store';

function createDarkMode() {
	const { update, subscribe, set } = writable(loadDarkModeFromLocalStorage());

	return {
		subscribe,
		set,
		update,
		toggle: () => {
			update((prev) => {
				const value = !prev;
				saveDarkModeToLocalStorage(value);
				return value;
			});
		}
	};
}

export const isDarkMode = createDarkMode();
