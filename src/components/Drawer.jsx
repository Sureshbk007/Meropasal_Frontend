import { useEffect } from "react";
import ReactDOM from "react-dom";

function Drawer({ isOpen, onClose, children, side = "right", className }) {
  useEffect(() => {
    const body = document.body.style;

    if (isOpen) {
      body.overflow = "hidden";
      body.marginRight = "17px";
    } else {
      body.overflow = "";
      body.marginRight = "";
    }

    return () => {
      body.overflow = "";
      body.marginRight = "";
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity ${
          isOpen ? "visible opacity-80" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed ${
          side === "right" ? "right-0" : "left-0"
        } top-0 bottom-0 text-sm md:text-base bg-slate-50 z-50 transition-transform ease-in-out duration-300 ${className} ${
          isOpen
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        } `}
      >
        {children}
      </div>
    </>,
    document.getElementById("portal-root")
  );
}

export default Drawer;
