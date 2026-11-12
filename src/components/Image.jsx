import PropTypes from "prop-types";
import { useState } from "react";
import Loader from "./Loader";

export default function Image({ res, onError }) {
  const [status, setStatus] = useState("loading");

  return (
    <main className="bgImageContainer" aria-busy={status === "loading"}>
      {status === "loading" && (
        <div className="imageLoading">
          <Loader />
        </div>
      )}
      <img
        src={res?.hdurl}
        alt={res?.title || "Astronomy picture"}
        className={`bgImage${status !== "loaded" ? " bgImageHidden" : ""}`}
        onLoad={() => setStatus("loaded")}
        onError={() => {
          setStatus("error");
          onError?.();
        }}
      />
      {status === "error" && (
        <p className="imageError" role="status">
          This image could not be displayed. You can still read its details.
        </p>
      )}
    </main>
  );
}

Image.propTypes = {
  res: PropTypes.object.isRequired,
  onError: PropTypes.func,
};
