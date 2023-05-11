import type { Task } from "../../models/task.model";
import type { TaskEvent } from "../events/tasks.events";
import { saveTasksToLocalStorage } from "../helpers/local-storage.helpers";

export function handleAddTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["addTask"]>
) {
  const task = event.detail;

  const updatedTasks = [task, ...tasks];
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

export function handleRemoveTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["removeTask"]>
) {
  const { id } = event.detail;

  const filteredTasks = tasks.filter((item) => item.id !== id);
  saveTasksToLocalStorage(filteredTasks);
  return filteredTasks;
}

export function handleToggleCompleteTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["toggleComplete"]>
) {
  const { id } = event.detail;

  const updatedTasks = tasks.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
  );
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}

export function handleEditTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["editTask"]>
) {
  const data = event.detail;

  const updatedTasks = tasks.map((item) => {
    if (item.id === data.id) {
      const updatedTask: Partial<Task> = {
        title: data?.title ? data.title : item.title,
        dueDate: data?.dueDate ? data.dueDate : item.dueDate,
      };
      return { ...item, ...updatedTask };
    }
    return item;
  });
  saveTasksToLocalStorage(updatedTasks);
  return updatedTasks;
}
