import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";

import DataTable from "react-data-table-component";

export default function Laporan(props) {
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const { data, setData, get } = useForm({
        tanggal_awal: "",
        tanggal_akhir: "",
    });

    const columns = [
        {
            name: "No",
            selector: (row) => row.DT_RowIndex,
            width: "5%",
        },
        {
            name: "Tanggal",
            selector: (row) => row.tanggal,
        },
        {
            name: "Penjualan",
            selector: (row) => row.penjualan,
        },
        {
            name: "Pembelian",
            selector: (row) => row.pembelian,
        },
        {
            name: "Pengeluaran",
            selector: (row) => row.pengeluaran,
        },
        {
            name: "Pendapatan",
            selector: (row) => row.pendapatan,
        },
    ];

    const dataOnTable = props.data;

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submitData = (e) => {
        e.preventDefault();

        get(route("laporan", data));
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Laporan" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Laporan Pendapatan{" "}
                            {props.tanggalAwal + ` s/d ` + props.tanggalAkhir}
                        </div>
                        <div className="p-6">
                            <form onSubmit={submitData}>
                                <div className="flex flex-row gap-4">
                                    <input
                                        type="date"
                                        name="tanggal_awal"
                                        value={
                                            data.tanggal_awal ??
                                            props.tanggalAwal
                                        }
                                        onChange={onHandleChange}
                                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                    />
                                    <input
                                        type="date"
                                        name="tanggal_akhir"
                                        value={
                                            data.tanggal_akhir ??
                                            props.tanggalAkhir
                                        }
                                        onChange={onHandleChange}
                                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded"
                                    >
                                        Cari
                                    </button>
                                </div>
                            </form>
                            <div>
                                <DataTable
                                    columns={columns}
                                    data={dataOnTable}
                                    pagination
                                    paginationResetDefaultPage={
                                        resetPaginationToggle
                                    }
                                    persistTableHead
                                    highlightOnHover
                                    pointerOnHover
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
