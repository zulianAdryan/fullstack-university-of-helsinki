import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { useVisible } from "../hooks";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const { toggle, visible } = useVisible();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  useImperativeHandle(refs, () => {
    return {
      toggle,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type="button" onClick={toggle}>
          {props.buttonShowLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type="button" onClick={toggle}>
          {props.buttonHideLabel}
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonShowLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired,
};

export default Togglable;
