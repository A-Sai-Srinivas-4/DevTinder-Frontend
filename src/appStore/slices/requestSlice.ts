import { ConnectionRequest, User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ConnectionRequest[] = [];

const requestSlice = createSlice({
  name: "request",
  initialState: initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<ConnectionRequest[]>) => {
      return action.payload;
    },
    removeRequests: (state, action) => [],
  },
});

export const { setRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
