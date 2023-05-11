import type { Task } from "../../models/task.model";
import { TASKS_LOCAL_STORAGE_KEY } from "../constants/app.constants";
import { taskJsonSchema } from "../validators/tasks.validators";

export function loadTasksFromLocalStorage(): Task[] {
  const tasksJSON = localStorage.getItem(TASKS_LOCAL_STORAGE_KEY);
  const tasks: Task[] = tasksJSON
    ? taskJsonSchema.array().parse(JSON.parse(tasksJSON))
    : [];
  return tasks;
}

export function saveTasksToLocalStorage(tasks: Task[]) {
  const tasksJSON = JSON.stringify(tasks);
  localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, tasksJSON);
}
