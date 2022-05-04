import React, { useMemo, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";

import DataTable from "react-data-table-component";
import CustomTableActionButton from "@/Components/CustomTableActionButton";
import SupplierModal from "@/Components/SupplierModal";

const FilterComponent = ({ filterText, onFilter, onClear, openModal }) => (
    <div className="w-full flex items-center justify-between">
        <div>
            <button
                type="button"
                onClick={openModal}
                className="px-4 py-1 text-white text-sm bg-green-500 hover:bg-green-600 rounded-md"
            >
                Tambah
            </button>
        </div>
        <div>
            <input
                id="search"
                type="text"
                placeholder="Cari Product"
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

export default function Supplier(props) {
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [dataEdit, setDataEdit] = useState("");
    const [dataDelete, setDataDelete] = useState("");

    // Tambah Supplier
    const closeModal = () => {
        setIsOpen(!isOpen);
    };

    const openModal = () => {
        setIsOpen(!isOpen);
    };

    // Edit Supplier
    const closeModalEdit = () => {
        setIsOpenEdit(false);
    };

    const openModalEdit = (row) => {
        setDataEdit(row);
        setIsOpenEdit(true);
    };

    // Hapus Supplier
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
            width: "65px",
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
            sortable: true,
        },
        {
            name: "Telepon",
            selector: (row) => row.telepon,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row) => (
                <CustomTableActionButton
                    onEditRow={openModalEdit}
                    onDeleteRow={openModalDelete}
                    row={row}
                />
            ),
            allowOverflow: true,
            button: true,
            width: "120px",
        },
    ];

    const data = props.suppliers;

    const filteredItems = data.filter(
        (item) =>
            item.nama &&
            item.nama
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
            />
        );
    });

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Suppliers" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Daftar Supplier
                        </div>
                        <div className="p-6">
                            <div className="flex gap-2">
                                {/* <button
                                    onClick={openModal}
                                    className="w-32 p-1 mb-5 bg-green-600 hover:bg-orange-600 transition delay-150 rounded-full shadow-md flex items-center justify-center text-white text-xl font-semibold"
                                >
                                    Tambah
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

                        <SupplierModal
                            dialogTitle="Tambah Supplier"
                            isOpenProps={isOpen}
                            closeModal={closeModal}
                            isUpdate={false}
                        />

                        <SupplierModal
                            dialogTitle="Edit Supplier"
                            isOpenProps={isOpenEdit}
                            closeModal={closeModalEdit}
                            isUpdate={true}
                            dataEdit={dataEdit}
                        />

                        <SupplierModal
                            dialogTitle="Hapus Supplier"
                            isOpenProps={isOpenDelete}
                            closeModal={closeModalDelete}
                            isDelete={true}
                            dataEdit={dataDelete}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
