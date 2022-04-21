import { useCallback } from "react";
import { useAppDispatch } from "@libs/client/useRedux";
import { useAppSelector } from "./useRedux";
import {
  hideModal,
  ModalType,
  showModal,
} from "./../../store/reducer/modalReducer";

type OnHideModalType = (
  event?: React.MouseEvent<HTMLElement>,
  callback?: Function
) => void;

type OnShowModalType = (callBack?: Function) => void;

type UseModalReturnType = {
  isShowModal: boolean;
  onShowModal: OnShowModalType;
  onHideModal: OnHideModalType;
};

const useModal = (modalType: ModalType): UseModalReturnType => {
  const dispatch = useAppDispatch();
  const isShowModal = useAppSelector((state) => state.modal[modalType]);

  const onHideModal = useCallback(
    (event?: React.MouseEvent<HTMLElement>, callBack?: Function) => {
      if (event && event.target !== event.currentTarget) return;
      dispatch(hideModal(modalType));
      callBack && callBack();
    },
    [modalType, dispatch]
  );

  const onShowModal = useCallback(
    (callBack?: Function) => {
      dispatch(showModal(modalType));
      callBack && callBack();
    },
    [modalType, dispatch]
  );

  return { isShowModal, onShowModal, onHideModal };
};

export default useModal;
