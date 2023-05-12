import type { Task } from "../../models/task.model";

export function checkIsAllCompleted(tasks: Task[]) {
  return tasks?.length > 0 && tasks.every((task) => task.completed);
}

export function checkSomeAreCompleted(tasks: Task[]) {
  return tasks?.length > 0 && tasks.some((task) => task.completed);
}

export function setAllTasks(tasks: Task[], option: "active" | "completed") {
  const lowerOption = option.toLowerCase();
  if (lowerOption === "completed") {
    return tasks.map((task) => ({ ...task, completed: true }));
  }
  if (lowerOption === "active") {
    return tasks.map((task) => ({ ...task, completed: false }));
  }
  return tasks;
}

export function deleteAllCompleted(tasks: Task[]) {
  return tasks.filter((task) => !task.completed);
}
