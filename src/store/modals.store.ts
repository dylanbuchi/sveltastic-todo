import { writable } from 'svelte/store';

interface ModalStore {
	isOpen: boolean;
}

const createModal = () => {
	const { subscribe, update } = writable<ModalStore>({
		isOpen: false
	});

	const openModal = () => {
		update((modalState) => ({ ...modalState, isOpen: true }));
	};

	const closeModal = () => {
		update((modalState) => ({ ...modalState, isOpen: false }));
	};

	return {
		subscribe,
		openModal,
		closeModal
	};
};

export const deleteTasksModal = createModal();
