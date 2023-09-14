import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  description: string;
  isChecked: boolean;
}

export interface TabState {
  activeTab: number;
  tasks: Task[];
  followers: { [platform: string]: UpdateFollowersActionPayload };
  lastUpdated: string;
  followerHistory: FollowerHistory[];
}

export interface UpdateFollowerCountActionPayload {
  platform: string;
  count: number;
}

export type UpdateFollowersActionPayload = {
  email: string;
  followers: { [platform: string]: number };
  lastUpdated: string;
};

export interface FollowerHistory {
  platform: string;
  prevCount: number;
  count: number;
  timestamp: string;
}

const initialState: TabState = {
  activeTab: 0,
  tasks: [],
  followers: {},
  lastUpdated: "",
  followerHistory: [],
};

export interface AddSocialMediaActionPayload {
  platform: string;
  count: number;
}

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
      if (state.followers[platform]) {
        state.followers[platform].followers[platform] = count;
        state.followers[platform].lastUpdated = new Date().toLocaleString();

        // Create a new FollowerHistory entry
        const newFollowerHistoryEntry: FollowerHistory = {
          platform,
          prevCount: state.followers[platform].followers[platform],
          count,
          timestamp: state.followers[platform].lastUpdated,
        };

        // Push the new object into the followerHistory array
        state.followerHistory.push(newFollowerHistoryEntry);
      }
    },

    updateFollowers: (state, action: PayloadAction<UpdateFollowersActionPayload>) => {
      const { email, followers, lastUpdated  } = action.payload;
    
      // Update the entire followers object with the new values
      state.followers = {
        ...state.followers, // Copy the existing followers
        [email]: {
          email,
          followers,
          lastUpdated: new Date().toLocaleString(),
        },
      };
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
    
      // Explicitly specify the type of followers object
      const followersObject: { [platform: string]: UpdateFollowersActionPayload } = state.followers;
    
      // Check if the platform already exists in followers
      if (followersObject[platform]) {
        // Update the count for the existing platform
        followersObject[platform].followers[platform] = count;
        followersObject[platform].lastUpdated = new Date().toLocaleString();
      } else {
        // Create a new follower entry if the platform doesn't exist
        followersObject[platform] = {
          email: "", // Set appropriate values here
          followers: { [platform]: count },
          lastUpdated: new Date().toLocaleString(),
        };
      }
    
      state.followers = followersObject; // Update the state with the modified followers object
    },
    
    deleteSocialMedia: (state, action: PayloadAction<string>) => {
      const platformToDelete = action.payload;
      delete state.followers[platformToDelete];
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
