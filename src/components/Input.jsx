import React from "react";
import { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="relative">
      {label && (
        <label
          className="block mb-1 text-sm font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`block w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 duration-300 ease-in-out ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
