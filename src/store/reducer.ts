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
  lastUpdated: string; 
  followerHistory: FollowerHistory[];
}
interface FollowerHistory {
  platform: string;
  count: number;
  timestamp: string;
}

interface SocialMediaFollowers {
  [platform: string]: number;
}



const initialState: TabState = {
  activeTab: 0,
  tasks: [
    { id: "instaStory", description: "Make an Instagram Story", isChecked: false },
    { id: "instaPost", description: "Make an Instagram Post", isChecked: false },
    { id: "twitterPost", description: "Make a Twitter Post", isChecked: false },
    { id: "YoutubeShort", description: "Make a Youtube Short", isChecked: false },
    { id: "InstagramReel", description: "Make an Instagram Reel", isChecked: false },
    { id: "YoutubeVideo", description: "Make a Youtube Video", isChecked: false },
    { id: "TwitchStream", description: "Make a Twitch Stream", isChecked: false },
    { id: "FacebookPost", description: "Make a Facebook Post", isChecked: false },
    { id: "LinkedinPost", description: "Make a Linkedin Post", isChecked: false },
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
  followerHistory: []
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
      state.followers[platform] = count;
      state.lastUpdated = new Date().toLocaleString();
    
      // Add the follower count change to history
      state.followerHistory.push({ platform, count, timestamp: state.lastUpdated });
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
    
  },
});

export interface UpdateFollowerActionPayload {
  platform: string;
  count: number;
}

export const { setActiveTab, updateFollowerCount, toggleTaskChecked, addSocialMedia, deleteSocialMedia } = tabSlice.actions;

export default tabSlice.reducer;
