import gravatar from "gravatar";
import { Role } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  role: Role | null;
  avatar?: string;
  name?: string;
};

const initialState: UserState = {
  role: null,
  avatar: `http://${gravatar.url("name", {
    s: "32",
    d: "retro",
  })}`,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, { payload }: PayloadAction<Role>) => {
      state.role = payload;
    },
    setAvatar: (state, { payload }: PayloadAction<string>) => {
      state.avatar = payload;
    },
  },
});
export const { setRole, setAvatar } = userSlice.actions;
export default userSlice.reducer;
