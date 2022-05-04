import React, { useEffect, useRef } from "react";

export default function Input({
    type = "text",
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
    iconimg,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
                type={type}
                name={name}
                value={value}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
                className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full pr-10 border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
            />
            <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <img src={iconimg} alt="username icon" />
            </span>
        </div>
    );
}
