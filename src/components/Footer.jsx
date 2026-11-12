import PropTypes from "prop-types";
export default function Footer({ handleToggleModal, res, showModal, isFallback }) {
  return (
    <footer>
      <div className="bgGradient" aria-hidden="true"></div>
      <div>
        <h1>APOD</h1>
        <h2>{res?.title}</h2>
        {isFallback && <p className="pictureType">Featured image</p>}
      </div>
      <button
        type="button"
        onClick={handleToggleModal}
        aria-label={showModal ? "Close picture details" : "Open picture details"}
        aria-expanded={showModal}
        aria-controls={showModal ? "picture-details" : undefined}
        title={showModal ? "Close picture details" : "Open picture details"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M12 11v6" stroke="#030615" strokeWidth="2" />
          <circle cx="12" cy="7" r="1.2" fill="#030615" />
        </svg>
      </button>
    </footer>
  );
}

Footer.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
  res: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  isFallback: PropTypes.bool,
};
