import React from "react";
import PropTypes from "prop-types";
import "./progress.scss";

export default function Progress(props) {
  return (
    <>
      <div className="outer">
        <div className="inner" style={{ width: props.value + "%" }}></div>
      </div>
    </>
  );
}

Progress.propTypes = {
  width: PropTypes.number.isRequired
};
