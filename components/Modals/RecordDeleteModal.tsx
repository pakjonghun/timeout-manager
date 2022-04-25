import { NextPage } from "next";
import Modal from "@components/Modal";
import ModalTitle from "@components/ModalTitle";
import ModalButtons from "@components/Modals/ModalButtons";
import { AnimatePresence } from "framer-motion";

interface props {
  isShow: boolean;
  selectedDataCount: number;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onConfirm: () => void;
}

const RecordDeleteModal: NextPage<props> = ({
  isShow,
  selectedDataCount,
  onClose,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isShow && (
        <Modal onClose={onClose}>
          <ModalTitle
            title="확인"
            role="warning"
            indicator={
              <svg
                className="w-5 h-5 fill-amber-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
              </svg>
            }
          />

          <main className="mt-7 space-y-8">
            <h4 className="mb-1 font-medium text-md text-gray-600">
              선택된 초과근무를 삭제하겠습니까?
            </h4>
            <span className="text-gray-400 text-sm">
              총 {selectedDataCount}건이 삭제됩니다.
            </span>

            <ModalButtons onConfirm={onConfirm} onClose={onClose} />
          </main>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default RecordDeleteModal;
