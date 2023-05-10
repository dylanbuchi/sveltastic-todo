import type { Task } from "../../models/task.model";
import type { TaskEvent } from "../events/tasks.events";

export function handleAddTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["addTask"]>
) {
  const task = event.detail;
  return [task, ...tasks];
}

export function handleRemoveTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["removeTask"]>
) {
  const { id } = event.detail;
  return tasks.filter((item) => item.id !== id);
}

export function handleToggleCompleteTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["toggleComplete"]>
) {
  const { id } = event.detail;
  return tasks.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
  );
}

export function handleEditTask(
  tasks: Task[],
  event: CustomEvent<TaskEvent["editTask"]>
) {
  const data = event.detail;

  return tasks.map((item) => {
    if (item.id === data.id) {
      const updatedTask: Partial<Task> = {
        title: data?.title ? data.title : item.title,
        dueDate: data?.dueDate ? data.dueDate : item.dueDate,
      };
      return { ...item, ...updatedTask };
    }
    return item;
  });
}
