import { Overlay, ModalEl } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClick, children }) {
  const onImgKeyDown = e => {
    if (e.key === 'Escape') {
      onClick();
    }
  };
  const onOverlayClick = e => {
    if (e.target.classList.contains('overlay')) {
      onClick();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onImgKeyDown);
    return () => {
      window.removeEventListener('keydown', onImgKeyDown);
    };
  }, []);

  return createPortal(
    <>
      <Overlay onClick={onOverlayClick} className="overlay">
        <ModalEl>{children}</ModalEl>
      </Overlay>
    </>,
    modalRoot
  );
}
