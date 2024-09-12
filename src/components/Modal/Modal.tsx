import { CSSProperties, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import './Modal.css'
interface IModalProps {
    active: boolean;
    onSubmit?: () => void;
    onClose: () => void;
    style?: CSSProperties;
}

const ModalTypeProduct = ({active, onClose, children, style}: PropsWithChildren<IModalProps>) =>{
    if (!active){
        return null;
    }
    const portalDiv = document.getElementById('modal');
    if (!portalDiv) {
        throw new Error("The element #portal wasn't found");
    }
    return createPortal (
        <dialog className="modal" onClick={onClose}>
            <div className="modal-content "
                 onClick={(event) => event.stopPropagation()}
                 style={style}>
                <div className='modal-body'>
                    {children}
                </div>
                <button className='modal-close' onClick={onClose}>
                    X
                </button>
            </div>
        </dialog>,
        portalDiv

    )
};
export default ModalTypeProduct;