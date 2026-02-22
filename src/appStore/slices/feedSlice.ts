import { User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User[] = [];

const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<User[]>) => action.payload,
    removeFeed: (state, action) => {
      const newFeed = state.filter((req) => req._id !== action.payload);
      return newFeed;
    },
  },
});

export const { setFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
