// src/store/actions.js
import { Action } from 'redux';

// Define action types
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const TOGGLE_TASK_STATE = 'TOGGLE_TASK_STATE';
export const DELETE_SOCIAL_MEDIA = 'DELETE_SOCIAL_MEDIA'; // Add this line
export const UPDATE_FOLLOWER_COUNT = 'UPDATE_FOLLOWER_COUNT'; // Add this line

// Define action interfaces
interface SetActiveTabAction extends Action<typeof SET_ACTIVE_TAB> {
  payload: number;
}

interface ToggleTaskStateAction extends Action<typeof TOGGLE_TASK_STATE> {
  payload: string; // Assuming taskId is of type string
}

// Action creators
export const setActiveTab = (index: number): SetActiveTabAction => {
  return { type: SET_ACTIVE_TAB, payload: index };
};

export const toggleTaskState = (taskId: string): ToggleTaskStateAction => {
  return { type: TOGGLE_TASK_STATE, payload: taskId };
};


export const updateFollowerCount = (platform: string, count: number) => {
  return { type: 'UPDATE_FOLLOWER_COUNT', payload: { platform, count } };
};


export type ActionTypes = SetActiveTabAction | ToggleTaskStateAction;
