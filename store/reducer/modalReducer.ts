import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "confirmTimer" | "userRecordEdit";

interface IModalState {
  [key: string]: boolean;
}

const initialState: IModalState = {
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
