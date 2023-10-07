/* eslint-disable react/prop-types */
import React, {forwardRef} from 'react';
// eslint-disable-next-line react/display-name
export const CustomInput = forwardRef(({value, type, placeholder, mode, className, ...props}, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`form-input py-3 px-3 text-md w-[90%] lg:w-[100%] outline-none rounded-md ${mode === 'dark' ? 'bg-[#383838]  text-[#adb5bd]' : ''} ${className}`}
      value={value}
      ref={ref}
      {...props}
    />
  );
});
