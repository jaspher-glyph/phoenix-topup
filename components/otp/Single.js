import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "./hooks";

function SingleComponent(props) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} />;
}

const Single = memo(SingleComponent);
export default Single;
