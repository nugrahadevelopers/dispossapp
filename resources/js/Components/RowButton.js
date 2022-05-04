import React from "react";

export default ({ row, onPilihRow, btnColor, children }) => {
    const pilihRow = () => {
        if (onPilihRow) {
            onPilihRow(row);
        }
    };

    return (
        <div className="flex">
            <button
                onClick={pilihRow}
                className={`p-1 mr-1 ${
                    btnColor == "red" ? "bg-red-600" : "bg-green-600"
                } text-sm text-white rounded-sm`}
            >
                {children}
            </button>
        </div>
    );
};
