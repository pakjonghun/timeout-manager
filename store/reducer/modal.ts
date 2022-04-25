import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Modal = "confirmTimer" | "userRecordEdit";

type ModalState = {
  [key: string]: boolean;
};

const initialState: ModalState = {
  confirmTimer: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<string>) => {
      state[payload] = true;
    },
    hideModal: (state, { payload }: PayloadAction<string>) => {
      state[payload] = false;
    },
  },
});
export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
