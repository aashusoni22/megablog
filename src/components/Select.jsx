import React, { useId } from "react";

const Select = React.forwardRef(
  ({ options, label, className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <select
          {...props}
          id={id}
          ref={ref}
          className={`px-4 py-2 rounded-lg bg-white text-black outline-none border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-150 ease-in-out w-full ${className}`}
        >
          {options?.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
