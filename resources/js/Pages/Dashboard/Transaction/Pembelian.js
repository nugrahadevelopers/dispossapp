import React, { useMemo, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";

import DataTable from "react-data-table-component";
import CustomTableActionButton from "@/Components/CustomTableActionButton";
import PilihSuplierModal from "@/Components/PilihSupplierModal";
import DeleteModal from "@/Components/DeleteModal";
import { Inertia } from "@inertiajs/inertia";

const FilterComponent = ({
    filterText,
    onFilter,
    onClear,
    openModal,
    openPembelianAktif,
    session,
}) => (
    <div className="w-full flex items-center justify-between">
        <div className="flex gap-3">
            <button
                type="button"
                onClick={openModal}
                className="px-4 py-1 text-white text-sm bg-green-500 hover:bg-green-600 rounded-md"
            >
                Tambah
            </button>

            <button
                type="button"
                onClick={openPembelianAktif}
                className={`${
                    session != null ? "flex" : "hidden"
                } px-4 py-1 text-white text-sm bg-orange-400 hover:bg-orange-500 rounded-md`}
            >
                Pembelian Aktif
            </button>
        </div>
        <div>
            <input
                id="search"
                type="text"
                placeholder="Cari Transaksi"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
                className="h-8 w-52 rounded-tl-md rounded-bl-md placeholder-slate-300 text-slate-600 relative bg-white text-sm shadow outline-none focus:outline-none border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
            />

            <button
                type="button"
                onClick={onClear}
                className="h-8 w-8 text-white text-sm bg-green-500 hover:bg-green-600 rounded-tr-md rounded-br-md"
            >
                X
            </button>
        </div>
    </div>
);

const onEdit = (row) => {
    alert("Edit Pembelian " + row.supplier);
};

export default function Pembelian(props) {
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState("");

    // Open Pilih Supplier
    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const openPembelianAktif = () => {
        Inertia.visit(route("transaksi_pembelian"));
    };

    // Delete
    const closeModalDelete = () => {
        setIsOpenDelete(false);
    };

    const openModalDelete = (row) => {
        setDataDelete(row);
        setIsOpenDelete(true);
    };

    const columns = [
        {
            name: "No",
            selector: (row) => row.no,
            sortable: true,
            width: "5%",
        },
        {
            name: "Nomor Transaksi",
            selector: (row) => row.nomor_trx_pembelian,
            sortable: true,
            width: "15%",
        },
        {
            name: "Tanggal",
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: "Supplier",
            selector: (row) => row.supplier_id,
            sortable: true,
        },
        {
            name: "Total Item",
            selector: (row) => row.total_item,
            sortable: true,
        },
        {
            name: "Total Harga",
            selector: (row) => row.total_harga,
            sortable: true,
        },
        {
            name: "Diskon",
            selector: (row) => row.diskon,
            sortable: true,
        },
        {
            name: "Total Bayar",
            selector: (row) => row.bayar,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row) => (
                <CustomTableActionButton
                    onEditRow={onEdit}
                    onDeleteRow={openModalDelete}
                    row={row}
                />
            ),
            allowOverflow: true,
            button: true,
            width: "120px",
        },
    ];

    const data = props.pembelian;

    const filteredItems = data.filter(
        (item) =>
            item.nomor_trx_pembelian &&
            item.nomor_trx_pembelian
                .toLocaleLowerCase()
                .includes(filterText.toLocaleLowerCase())
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleclear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleclear}
                filterText={filterText}
                openModal={openModal}
                openPembelianAktif={openPembelianAktif}
                session={props.pembelianSession}
            />
        );
    });

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Pembelian" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Daftar Pembelian
                        </div>
                        <div className="p-6">
                            <div className="flex gap-2">
                                {/* <button
                                    onClick={openModal}
                                    className="w-52 p-1 mb-5 bg-green-600 hover:bg-orange-600 transition delay-150 rounded-full shadow-md flex items-center justify-center text-white text-xl font-semibold"
                                >
                                    Transaksi Baru
                                </button> */}
                                {/* <button className="w-52 p-1 mb-5 bg-orange-500 hover:bg-orange-600 transition delay-150 rounded-full shadow-md flex items-center justify-center text-white text-xl font-semibold">
                                    Transaksi Baru
                                </button> */}
                            </div>
                            <div>
                                <DataTable
                                    columns={columns}
                                    data={filteredItems}
                                    pagination
                                    paginationResetDefaultPage={
                                        resetPaginationToggle
                                    }
                                    subHeader
                                    subHeaderComponent={subHeaderComponentMemo}
                                    persistTableHead
                                    highlightOnHover
                                    pointerOnHover
                                />
                            </div>
                        </div>

                        <PilihSuplierModal
                            dialogTitle="Pilih Supplier"
                            isOpenProps={isOpen}
                            closeModal={closeModal}
                        />

                        <DeleteModal
                            dialogTitle="Hapus Transaksi"
                            isOpenProps={isOpenDelete}
                            closeModal={closeModalDelete}
                            dataEdit={dataDelete}
                            routeURL="pembelian.destroy"
                            penjualan={false}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
