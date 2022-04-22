import { Role, Status } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  role?: Role | null;
  status?: Status | null;
}

const initialState: IUserState = {
  role: null,
  status: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, { payload }: PayloadAction<IUserState>) => {
      return payload;
    },
    logout: () => {
      return initialState;
    },
    setStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload;
    },
    setRole: (state, { payload }: PayloadAction<Role>) => {
      state.role = payload;
    },
  },
});

export const { login, logout, setStatus, setRole } = userSlice.actions;
export default userSlice.reducer;
