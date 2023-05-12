import { writable } from "svelte/store";
import type { Task } from "../models/task.model";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helpers/local-storage.helpers";

const initialTasks = loadTasksFromLocalStorage();

function createTasks() {
  const { subscribe, set, update } = writable<Task[]>(initialTasks);

  return {
    subscribe,
    add: (task: Task) =>
      update((tasks) => {
        const newTasks = [task, ...tasks];
        saveTasksToLocalStorage(newTasks);
        return newTasks;
      }),
    remove: (id: string) =>
      update((tasks) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        saveTasksToLocalStorage(newTasks);
        return newTasks;
      }),
    update: (id: string, data: Partial<Task>) =>
      update((tasks) => {
        const newTasks = tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
            };
          }
          return item;
        });
        saveTasksToLocalStorage(newTasks);
        return newTasks;
      }),
    clear: () => {
      set([]);
      saveTasksToLocalStorage([]);
    },
  };
}

export const tasks = createTasks();
