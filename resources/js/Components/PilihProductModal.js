import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Dialog, Transition } from "@headlessui/react";

import DataTable from "react-data-table-component";
import RowButton from "./RowButton";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <div className="w-full flex items-center justify-between">
        <div>
            {/* <button
                type="button"
                onClick={openModal}
                className="px-4 py-1 text-white text-sm bg-green-500 hover:bg-green-600 rounded-md"
            >
                Tambah
            </button> */}
        </div>
        <div>
            <input
                id="search"
                type="text"
                placeholder="Cari Produk"
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

export default function PilihProductModal({
    isOpenProps,
    closeModal,
    dialogTitle,
    childToParent,
}) {
    const { products } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);

    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const onPilihRow = (row) => {
        childToParent(row);
        closeModal(false);
    };

    const columns = [
        {
            name: "No",
            selector: (row) => row.no,
            sortable: true,
            width: "65px",
        },
        {
            name: "Barcode",
            selector: (row) => row.barcode,
            sortable: true,
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
            sortable: true,
        },
        {
            name: "Harga Beli",
            selector: (row) => row.harga_beli,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row) => (
                <RowButton onPilihRow={onPilihRow} row={row}>
                    Pilih
                </RowButton>
            ),
            allowOverflow: true,
            button: true,
            width: "120px",
        },
    ];

    const data = products;

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
            />
        );
    });

    useEffect(() => {
        if (isOpenProps != isOpen) {
            setIsOpen(isOpenProps);
        }
    }, [isOpenProps]);

    const submitData = (e) => {
        e.preventDefault();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-tl-2xl rounded-bl-2xl border border-l-8 border-orange-500">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-semibold leading-6 text-gray-900"
                            >
                                {dialogTitle}
                            </Dialog.Title>
                            <div className="mt-16">
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
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
