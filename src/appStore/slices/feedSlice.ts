import { User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User[] = [];

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },

    removeFeed: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
