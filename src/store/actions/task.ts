import { tasks_v1 } from 'googleapis';
import { Schema$Task } from '../../typings';
import uuid from 'uuid';

export enum TaskActionTypes {
  GET_ALL_TASKS = 'GET_ALL_TASKS',
  GET_ALL_TASKS_SUCCESS = 'GET_ALL_TASKS_SUCCESS',
  ADD_TASK = 'ADD_TASK',
  ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS',
  UPDATE_TASK = 'UPDATE_TASK',
  UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS',
  DELETE_TASK = 'DELETE_TASK',
  DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS',
  MOVE_TASK = 'MOVE_TASK',
  MOVE_TASK_SUCCESS = 'MOVE_TASK_SUCCESS',
  DELETE_COMPLETED_TASKS = 'DELETE_COMPLETED_TASKS',
  DELETE_COMPLETED_TASKS_SUCCESS = 'DELETE_COMPLETED_TASKS_SUCCESS'
}

interface Payload$AddTask {
  uuid: string;
  params: tasks_v1.Params$Resource$Tasks$Insert;
}

interface Payload$AddTaskSuccess {
  uuid: string;
  task: tasks_v1.Schema$Task;
}

interface Payload$DeleteTask extends Schema$Task {
  taskListId: string;
}

export interface GetAllTasks {
  type: TaskActionTypes.GET_ALL_TASKS;
  payload: tasks_v1.Params$Resource$Tasks$List;
}

export interface GetAllTasksSuccess {
  type: TaskActionTypes.GET_ALL_TASKS_SUCCESS;
  payload: tasks_v1.Schema$Task[];
}

export interface AddTask {
  type: TaskActionTypes.ADD_TASK;
  payload: Payload$AddTask;
}

export interface AddTaskSuccess {
  type: TaskActionTypes.ADD_TASK_SUCCESS;
  payload: Payload$AddTaskSuccess;
}

export interface UpdateTask {
  type: TaskActionTypes.UPDATE_TASK;
  payload: tasks_v1.Params$Resource$Tasks$Update;
}

export interface UpdateTaskSuccess {
  type: TaskActionTypes.UPDATE_TASK_SUCCESS;
  payload: tasks_v1.Schema$Task;
}

export interface DeleteTask {
  type: TaskActionTypes.DELETE_TASK;
  payload: Payload$DeleteTask;
}

export interface DeleteTaskSuccess {
  type: TaskActionTypes.DELETE_TASK_SUCCESS;
}

export interface MoveTask {
  type: TaskActionTypes.MOVE_TASK;
}

export interface MoveTaskSuccess {
  type: TaskActionTypes.MOVE_TASK_SUCCESS;
}

export interface DeleteCompletedTasks {
  type: TaskActionTypes.DELETE_COMPLETED_TASKS;
  payload: Schema$Task[];
}

export interface DeleteCompletedTasksSuccess {
  type: TaskActionTypes.DELETE_COMPLETED_TASKS_SUCCESS;
}

export type TaskActions =
  | GetAllTasks
  | GetAllTasksSuccess
  | AddTask
  | AddTaskSuccess
  | UpdateTask
  | UpdateTaskSuccess
  | DeleteTask
  | DeleteTaskSuccess
  | MoveTask
  | MoveTaskSuccess
  | DeleteCompletedTasks
  | DeleteCompletedTasksSuccess;
export const TaskActionCreators = {
  getAllTasks(payload: tasks_v1.Params$Resource$Tasks$List): GetAllTasks {
    return {
      type: TaskActionTypes.GET_ALL_TASKS,
      payload
    };
  },
  addTask(params: tasks_v1.Params$Resource$Tasks$Insert): AddTask {
    return {
      type: TaskActionTypes.ADD_TASK,
      payload: {
        uuid: uuid.v4(),
        params
      }
    };
  },
  deleteTask(payload: Payload$DeleteTask): DeleteTask {
    return {
      type: TaskActionTypes.DELETE_TASK,
      payload
    };
  },
  updateTask(payload: tasks_v1.Params$Resource$Tasks$Update): UpdateTask {
    return {
      type: TaskActionTypes.UPDATE_TASK,
      payload
    };
  },
  deleteCompletedTasks(payload: Schema$Task[]): DeleteCompletedTasks {
    return {
      type: TaskActionTypes.DELETE_COMPLETED_TASKS,
      payload
    };
  }
};
