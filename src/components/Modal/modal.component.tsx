import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./modal.style.css";
import closeIcon from "../../assets/x_button.svg";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  closeModal: () => void;
  children?: ReactNode | Array<ReactNode>;
  buttons?: any;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  children,
  title,
  buttons,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <img src={closeIcon} onClick={closeModal} height={30} width={30} />
        </div>

        {children}

        {/* <div className="modal-footer">
          {buttons.map((button: any) => {
            return <Button placeholder={button.text} />;
          })}
        </div> */}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
