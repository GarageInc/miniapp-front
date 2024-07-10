import React, { ReactNode, useEffect, useRef, useState } from "react";

export type InputProps = {
  label: string | ReactNode;
  autoFocus?: boolean;
  isInvalid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  autoFocus,
  isInvalid,
  ...props
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  // impl autoFocus
  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [autoFocus]);

  const id = props.id || props.name;

  return (
    <div className="relative text-black text-t1 font-medium">
      <input
        ref={ref}
        {...props}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(!!ref.current?.value)}
        className={`block w-full appearance-none outline-none bg-white rounded-[12px] px-5 pt-2 h-[58px] ring-inset ring-[#7D3BE5] focus:ring-2 ${isInvalid ? "ring-2 ring-[#E53B45]" : ""}`}
      />
      <label
        htmlFor={id}
        className={`absolute leading-[1.125] top-5 left-5 origin-left ${isFocused ? "translate-y-[-15px] scale-75 text-[#808080]" : "text-[#2F2F2F]"} transition-all duration-200 ease-in-out`}
      >
        {label}
      </label>
    </div>
  );
};
