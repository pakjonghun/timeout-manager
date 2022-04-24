import { Role } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  role: Role | null;
};

const initialState: UserState = {
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, { payload }: PayloadAction<Role>) => {
      state.role = payload;
    },
  },
});
export const { setRole } = userSlice.actions;
export default userSlice.reducer;
