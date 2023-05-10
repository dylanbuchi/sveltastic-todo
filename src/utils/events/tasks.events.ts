import type { Task } from "../../models/task.model";

export interface TaskEvent {
  toggleComplete: { id: string };
  removeTask: { id: string };
  editTask: Partial<Task>;
  addTask: Task;
}

export function dispatchHelper<T extends keyof TaskEvent>(
  dispatch: (name: T, data: TaskEvent[T]) => void,
  name: T,
  values: TaskEvent[T]
) {
  dispatch(name, values);
}

export function createTaskEventHandlers<EventKey extends keyof TaskEvent>(
  dispatch: (event: keyof TaskEvent, detail?: TaskEvent[EventKey]) => void
) {
  return {
    handleToggleCompleteTask(task: Task) {
      dispatchHelper(dispatch, "toggleComplete", { id: task.id });
    },
    handleRemoveTask(task: Task) {
      dispatchHelper(dispatch, "removeTask", { id: task.id });
    },

    handleEditTask(task: Task, editedTitle: string, editedDueDate: string) {
      const data: Partial<Task> = {
        ...task,
        dueDate: new Date(editedDueDate),
        title: editedTitle,
      };
      dispatchHelper(dispatch, "editTask", data);
    },

    handleAddTask(task: Task) {
      dispatchHelper(dispatch, "addTask", task);
    },
  };
}
