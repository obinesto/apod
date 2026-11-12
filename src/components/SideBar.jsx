import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function SideBar({ handleToggleModal, res, isFallback }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const desktop = window.matchMedia("(min-width: 640px)");

    function showDialog() {
      if (dialog.open) dialog.close();
      if (desktop.matches) dialog.show();
      else dialog.showModal();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape" && desktop.matches) {
        event.preventDefault();
        handleToggleModal();
      }
    }

    showDialog();
    desktop.addEventListener("change", showDialog);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      desktop.removeEventListener("change", showDialog);
      document.removeEventListener("keydown", handleKeyDown);
      dialog.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, [handleToggleModal]);

  return (
    <dialog
      id="picture-details"
      className="sidebar"
      ref={dialogRef}
      aria-labelledby="picture-details-title"
      onCancel={(event) => {
        event.preventDefault();
        handleToggleModal();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) handleToggleModal();
      }}
    >
      <div className="sidebarContents">
        <div className="sidebarHeader">
          <h2 id="picture-details-title">{res?.title}</h2>
          <button
            type="button"
            onClick={handleToggleModal}
            aria-label="Close picture details"
            title="Close picture details"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="m9 5 7 7-7 7M4 12h12" />
            </svg>
          </button>
        </div>
        <div className="sidebarBody" tabIndex={0} role="region" aria-label="Picture explanation">
          {isFallback ? (
            <strong>Featured image</strong>
          ) : (
            <time dateTime={res?.date}>{res?.date}</time>
          )}
          <p>{res?.explanation}</p>
        </div>
      </div>
    </dialog>
  );
}

SideBar.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
  res: PropTypes.object.isRequired,
  isFallback: PropTypes.bool,
};
