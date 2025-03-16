import React from "react";
import "../css/modal.css";

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay-unique" onClick={onClose}>
      <div
        className="modal-content-unique"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-unique" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
