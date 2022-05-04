import React from "react";

export default ({ row, onDeleteRow, onEditRow }) => {
    const editRow = () => {
        if (onEditRow) {
            onEditRow(row);
        }
    };

    const deleteRow = () => {
        if (onDeleteRow) {
            onDeleteRow(row);
        }
    };

    return (
        <div className="flex">
            <button
                onClick={editRow}
                className="p-1 mr-1 bg-green-600 text-sm text-white rounded-sm"
            >
                Edit
            </button>
            <button
                onClick={deleteRow}
                className="p-1 bg-red-600 text-sm text-white rounded-sm"
            >
                Delete
            </button>
        </div>
    );
};
