import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  description: string;
  isChecked: boolean;
}

export interface TabState {
  activeTab: number;
  tasks: Task[];
  followers: SocialMediaFollowers;
  lastUpdated: string;
  followerHistory: FollowerHistory[];
}
export interface FollowerHistory {
  platform: string;
  prevCount: number;
  count: number;
  timestamp: string;
}

export interface SocialMediaFollowers {
  [platform: string]: number;
}

const initialState: TabState = {
  activeTab: 0,
  tasks: [
  ],
  followers: {
    Facebook: 45,
    Instagram: 10,
    Youtube: 35,
    Linkedin: 15,
    Twitter: 15,
    Twitch: 15,
  },
  lastUpdated: '',
  followerHistory: [
    {
      platform: "Facebook",
      prevCount: 0,
      count: 0,
      timestamp: "6/5/2023, 11:52:55 AM",
    },
    {
      platform: "Facebook",
      prevCount: 0,
      count: 47,
      timestamp: "7/5/2023, 11:52:55 AM",
    },
    {
      platform: "Facebook",
      prevCount: 47,
      count: 37,
      timestamp: "7/5/2023, 12:52:55 AM",
    },
    {
      platform: "Instagram",
      prevCount: 0,
      count: 0,
      timestamp: "5/10/2023, 13:52:55 AM",
    },
    {
      platform: "Instagram",
      prevCount: 20,
      count: 27,
      timestamp: "8/10/2023, 13:52:55 AM",
    },
    {
      platform: "Twitter",
      prevCount: 0,
      count: 0,
      timestamp: "7/18/2023, 14:52:55 AM",
    },
    {
      platform: "Twitter",
      prevCount: 50,
      count: 57,
      timestamp: "8/18/2023, 14:52:55 AM",
    },
  ],
};

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    updateFollowerCount: (state, action: PayloadAction<UpdateFollowerActionPayload>) => {
      const { platform, count } = action.payload;
      const prevCount = state.followers[platform];

      if (prevCount !== count) {
        state.followers[platform] = count;
        state.lastUpdated = new Date().toLocaleString();

        // Create a new object with prevCount and other properties
        const newFollowerHistoryEntry: FollowerHistory = {
          platform,
          prevCount, // Add the previous count here
          count,
          timestamp: state.lastUpdated,
        };

        // Push the new object into the followerHistory array
        state.followerHistory.push(newFollowerHistoryEntry);
      }
    },
    toggleTaskChecked: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.isChecked = !task.isChecked;
      }
    },
    addSocialMedia: (state, action: PayloadAction<{ platform: string; count: number }>) => {
      const { platform, count } = action.payload;
      state.followers[platform] = count;
      state.lastUpdated = new Date().toLocaleString();
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

export interface UpdateFollowerActionPayload {
  platform: string;
  count: number;
}

export const { setActiveTab, updateFollowerCount, toggleTaskChecked, addSocialMedia, deleteSocialMedia, updateTasks } = tabSlice.actions;

export default tabSlice.reducer;
