import { NextPage } from "next";
import { motion } from "framer-motion";

interface props {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const Modal: NextPage<props> = ({ children, styles, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center w-full backdrop-blur-sm backdrop-brightness-50 z-20"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        style={styles}
        className="px-8 pt-10 pb-7 relative rounded-md shadow-lg bg-gray-50"
      >
        <button
          className="absolute right-0 top-0 flex justify-center items-center aspect-square w-8 font-medium text-2xl cursor-pointer scale-lg z-10 hover:text-red-400"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
