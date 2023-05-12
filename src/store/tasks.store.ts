import { derived, writable } from "svelte/store";
import type { Task } from "../models/task.model";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helpers/local-storage.helpers";

const initialTasks = loadTasksFromLocalStorage();

function sortByDate(order: string) {
  const sortOrder = order === "date-desc" ? -1 : 1;
  return (a: Task, b: Task) => {
    if (a?.dueDate == null || b?.dueDate == null) return 1;

    return sortOrder * (b.dueDate.getTime() - a.dueDate.getTime());
  };
}

function sortByName(order: string) {
  const sortOrder = order === "name-desc" ? -1 : 1;
  return (a: Task, b: Task) => {
    if (a?.title == null || b?.title == null) return 0;

    return sortOrder * a.title.localeCompare(b.title);
  };
}

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
    sort: (order: string) => {
      update((tasks) => {
        const newTasks = [...tasks];
        if (order === "name-asc" || order === "name-desc") {
          newTasks.sort(sortByName(order));
        } else {
          newTasks.sort(sortByDate(order));
        }

        return newTasks;
      });
    },
  };
}

export const tasks = createTasks();
export const taskFilterOption = writable("all");

export const filteredTasks = derived(
  [tasks, taskFilterOption],
  ([$tasks, $option]) =>
    $tasks.filter((item: Task) => {
      if ($option === "all") {
        return item;
      }
      if ($option === "completed") {
        return item.completed;
      }
      if ($option === "active") return !item.completed;
    })
);
