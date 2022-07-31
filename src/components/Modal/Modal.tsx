const Modal = ({ heading, message, onSuccess, onCancel }: ModelProps) => {
  return (
    <div id="confirmation-modal" className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{heading}</p>
          <button onClick={(e) => {
            e.preventDefault();
            onCancel()
          }} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">{message}</section>
        <footer className="modal-card-foot">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (typeof onSuccess === "function") onSuccess();
            }}
            className="button is-success"
          >
            Yes
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
            className="button"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;

Modal.defaultProps = {
  heading: "Example heading",  
  message: "Example message",
  onSuccess: () => {},
  onCancel: () => {},
};

interface ModelProps {
  heading: string,
  message: string;
  onSuccess?: Function;
  onCancel: Function;
}
