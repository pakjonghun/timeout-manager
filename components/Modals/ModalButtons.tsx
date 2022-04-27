import { NextPage } from "next";

interface props {
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onConfirm: () => void;
}

const ModalButtons: NextPage<props> = ({ onClose, onConfirm }) => {
  return (
    <div className="pt-2 grid grid-cols-2 gap-5">
      <button
        type="button"
        onClick={onClose}
        className="py-2 px-5 bg-gray-200 roundShadow-md font-medium text-gray-600 text-sm scale"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onConfirm}
        className="py-2 px-5 bg-green-500 roundShadow-md font-medium text-sm text-green-100 scale"
      >
        Confirm
      </button>
    </div>
  );
};

export default ModalButtons;
