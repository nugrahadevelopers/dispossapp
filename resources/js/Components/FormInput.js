import React, { useEffect, useRef } from "react";

export default function FormInput({
    type = "text",
    name,
    value,
    patern,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
    readOnly,
    defaultValue,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            pattern={patern}
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
            readOnly={readOnly}
            className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
        />
    );
}
