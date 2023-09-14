import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  description: string;
  isChecked: boolean;
}

export interface TabState {
  activeTab: number;
  tasks: Task[];
  followers: { [email: string]: { [platform: string]: number } };
  lastUpdated: string;
  followerHistory: FollowerHistory[];
}

export interface UpdateFollowerCountActionPayload {
  platform: string;
  count: number;
}

export interface FollowerHistory {
  platform: string;
  prevCount: number;
  count: number;
  timestamp: string;
}

export interface AddSocialMediaActionPayload {
  platform: string;
  count: number;
}

export interface UpdateFollowersActionPayload {
  UserID: string;
  count: number;
  email: string;
  newValue: number;
  platform: string;
  lastUpdated?: string;
}

const initialState: TabState = {
  activeTab: 0,
  tasks: [],
  followers: {},
  lastUpdated: "",
  followerHistory: [],
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },

    updateFollowerCount: (state, action: PayloadAction<UpdateFollowerCountActionPayload>) => {
      const { platform, count } = action.payload;

      // Check if the platform already exists in followers
      if (state.followers[state.lastUpdated]) {
        state.followers[state.lastUpdated][platform] = count;
        state.lastUpdated = new Date().toLocaleString();

        // Create a new FollowerHistory entry
        const newFollowerHistoryEntry: FollowerHistory = {
          platform,
          prevCount: state.followers[state.lastUpdated][platform],
          count,
          timestamp: state.lastUpdated,
        };

        // Push the new object into the followerHistory array
        state.followerHistory.push(newFollowerHistoryEntry);
      }
    },

    updateFollowers: (state, action: PayloadAction<UpdateFollowersActionPayload>) => {
      const { email, count, platform, newValue, lastUpdated } = action.payload;
    
      // Check if the platform already exists in state.followers
      if (state.followers[platform]) {
        // Update the platform's count and other properties, preserving the rest of the data
        state.followers[platform] = {
          ...state.followers[platform],
          count,
          // other properties you want to keep intact
        };
      } else {
        // Create a new entry for the platform if it doesn't exist
        state.followers[platform] = {
          count,
          // other properties you want to keep intact
        };
      }
    
      // You can also update other properties in state here if needed
      state.lastUpdated = lastUpdated || new Date().toLocaleString();
    },
    

    toggleTaskChecked: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.isChecked = !task.isChecked;
      }
    },
    addSocialMedia: (
      state,
      action: PayloadAction<AddSocialMediaActionPayload>
    ) => {
      const { platform, count } = action.payload;

      // Check if the platform already exists in followers
      if (state.followers[state.lastUpdated]) {
        // Update the count for the existing platform
        state.followers[state.lastUpdated][platform] = count;
        state.lastUpdated = new Date().toLocaleString();
      } else {
        // Create a new follower entry if the platform doesn't exist
        state.followers[state.lastUpdated] = {
          [platform]: count,
        };
      }
    },

    deleteSocialMedia: (state, action: PayloadAction<string>) => {
      const platformToDelete = action.payload;
      delete state.followers[state.lastUpdated][platformToDelete];
      state.lastUpdated = new Date().toLocaleString();
    },

    updateTasks: (state, action: PayloadAction<Task[]>) => {
      console.log("tasks:", state.tasks); // Add this line before the mapping operation

      state.tasks = action.payload;
    },
  },
});

export const {
  setActiveTab,
  updateFollowerCount,
  toggleTaskChecked,
  addSocialMedia,
  deleteSocialMedia,
  updateTasks,
  updateFollowers,
} = tabSlice.actions;

export default tabSlice.reducer;
