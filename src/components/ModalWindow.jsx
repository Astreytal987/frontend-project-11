import React, { useContext } from "react";
import ThemeContext from "../context/index";

const ModalWindow = () => {
  const { selectedItem, setSelectedItem } = useContext(ThemeContext);

  return (
      <div
        className="modal fade"
        id="modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedItem ? selectedItem.title : null}</h5>
              <button
                type="button"
                className="btn-close close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-break">{selectedItem ? selectedItem.description : null}</div>
            <div className="modal-footer">
              <a
                className="btn btn-primary full-article"
                href= {selectedItem ? selectedItem.href : "#"}
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Читать полностью{" "}
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ModalWindow;
