import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";

export default ({ row, onJumlahChange, routeURL }) => {
    const { data, setData } = useForm({
        jumlah: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submitData = (e) => {
        e.preventDefault();

        Inertia.visit(route(routeURL), {
            method: "put",
            data: {
                id: row.id,
                jumlah: data.jumlah,
            },
        });
    };

    return (
        <form onSubmit={submitData}>
            <input
                type="number"
                min="1"
                name="jumlah"
                value={data.jumlah != "" ? data.jumlah : row.jumlah}
                onChange={onHandleChange}
                className="x-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-20 border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
            />
            <button
                type="submit"
                className="bg-green-500 text-white px-2 rounded-full"
            >
                Update
            </button>
        </form>
    );
};
