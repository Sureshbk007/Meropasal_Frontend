import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Drawer({ isOpen, onClose, children, side = "right" }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.overflow = "auto";
    };
  }, [isOpen]);

  const sideValue = side == "right" ? "100%" : "-100%";
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          >
            <motion.div
              initial={{ x: sideValue }}
              animate={{ x: 0 }}
              exit={{ x: sideValue }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className={`fixed ${
                side === "right" ? "right-0" : "left-0"
              } top-0 bottom-0 text-sm md:text-base bg-slate-50 z-50`}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Drawer;
