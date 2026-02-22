import { User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User[] = [];

const connectionSlice = createSlice({
  name: "connection",
  initialState: initialState,
  reducers: {
    setConnections: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      const updatedConnections = state.filter((req) => req._id !== action.payload._id);
      return updatedConnections;
    },
  },
});

export const { setConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
