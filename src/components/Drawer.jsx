import ReactDOM from "react-dom";

function Drawer({ isOpen, onClose, children }) {
  if (isOpen) {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.marginRight = "17px";
  } else {
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.marginRight = "0";
  }

  return ReactDOM.createPortal(
    <div className={`${isOpen ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 bg-black z-50 opacity-80"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-2/5 bg-slate-50 z-50 transition-all duration-200">
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}

export default Drawer;
