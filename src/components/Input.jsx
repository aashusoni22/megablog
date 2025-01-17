import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    error,
    icon: Icon,
    variant = "default",
    size = "default",
    ...props
  },
  ref
) {
  const id = useId();

  const variants = {
    default:
      "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-coral-500 dark:focus:border-coral-400",
    ghost:
      "border-transparent bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800",
    transparent:
      "bg-transparent border-b border-gray-200 dark:border-gray-700 rounded-none px-0 hover:border-gray-300 dark:hover:border-gray-600 focus:border-coral-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2",
    lg: "px-5 py-2.5 text-lg",
  };

  const baseClassName = `
    block w-full 
    text-gray-900 dark:text-gray-100 
    placeholder-gray-400 dark:placeholder-gray-500
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-coral-500/20 dark:focus:ring-coral-400/20
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${
      error
        ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
        : ""
    }
    ${className}
  `;

  return (
    <div className="relative">
      {label && (
        <label
          className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          className={`${baseClassName} ${Icon ? "pl-10" : ""}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
