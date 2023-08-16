import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  description: string;
  isChecked: boolean;
}

interface TabState {
  activeTab: number;
  tasks: Task[];
  followers: SocialMediaFollowers;
  lastUpdated: string; // Add the lastUpdated property
}

interface SocialMediaFollowers {
  [platform: string]: number;
}

const initialState: TabState = {
  activeTab: 0,
  tasks: [{ id: "instaStory", description: "Make an Instagram Story", isChecked: false }],
  followers: {
    Facebook: 45,
    Instagram: 10,
    Youtube: 35,
    Linkedin: 15,
    Twitter: 15,
    Twitch: 15,
  },
  lastUpdated: '', // Initialize lastUpdated as an empty string
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
      state.followers[platform] = count;
      state.lastUpdated = new Date().toLocaleString(); // Update lastUpdated when follower count is updated
    },
    toggleTaskChecked: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.isChecked = !task.isChecked;
      }
    },
  },
});

export interface UpdateFollowerActionPayload {
  platform: string;
  count: number;
}

export const { setActiveTab, updateFollowerCount, toggleTaskChecked } = tabSlice.actions;

export default tabSlice.reducer;
