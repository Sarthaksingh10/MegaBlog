import React, { useId } from "react";
import PropTypes from "prop-types";
const Input = React.forwardRef(function Input(
  { label, type = "text", classname = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className={`inline-block mb-1 pl-1`}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none duration-200 focus:bg-gray-50
                border-gray-200 w-full ${classname}`}
                ref={ref}
                {...props}
                id={id}
      />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  classname: PropTypes.string,
};
export default Input;
