import { useEffect, useRef } from 'react';

export default function Modal({ open, title, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} onCancel={onClose}>
      <article className="modal">
        <header className="modal__head">
          <h3>{title}</h3>
          <button type="button" id="closeModal" aria-label="Tutup modal" title="Tutup" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </article>
    </dialog>
  );
}
