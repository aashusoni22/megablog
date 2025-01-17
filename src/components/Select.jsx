import React, { useId } from "react";
import { ChevronDown } from "lucide-react";

const Select = React.forwardRef(
  ({ options, label, className = "", error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            {...props}
            id={id}
            ref={ref}
            className={`
              block w-full px-4 py-2.5
              text-gray-900 dark:text-gray-100
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-lg
              appearance-none
              transition-all duration-200
              hover:border-gray-300 dark:hover:border-gray-600
              focus:outline-none focus:border-coral-500 dark:focus:border-coral-400
              focus:ring-2 focus:ring-coral-500/20 dark:focus:ring-coral-400/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-red-500 dark:border-red-500" : ""}
              ${className}
            `}
            style={{
              // Ensure dropdown has proper styling
              backgroundImage: "none", // Remove default arrow
            }}
          >
            {options?.map((option) => (
              <option
                value={option}
                key={option}
                className="py-2 px-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none border-l border-gray-200 dark:border-gray-700 h-full ml-auto">
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}

        <style jsx global>{`
          select option {
            padding: 8px 12px;
            background-color: white;
            color: #111827;
          }

          select option:checked {
            background: linear-gradient(0deg, #ff6b54 0%, #ff6b54 100%);
            color: white;
          }

          @media (prefers-color-scheme: dark) {
            select option {
              background-color: #1f2937;
              color: #f3f4f6;
            }
          }

          select:focus option:checked {
            background: linear-gradient(0deg, #ff6b54 0%, #ff6b54 100%);
            color: white;
          }
        `}</style>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
