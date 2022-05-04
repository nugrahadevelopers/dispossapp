import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Dialog, Transition } from "@headlessui/react";

import DataTable from "react-data-table-component";
import styled from "styled-components";
import FilterButton from "@/Components/FilterButton";
import RowButton from "./RowButton";
const TextField = styled.input`
    height: 32px;

    width: 200px;

    border-radius: 3px;

    border-top-left-radius: 5px;

    border-bottom-left-radius: 5px;

    border-top-right-radius: 0;

    border-bottom-right-radius: 0;

    border: 1px solid #e5e5e5;

    padding: 0 32px 0 16px;

    &:hover {
        cursor: pointer;
    }
`;
const ClearButton = styled(FilterButton)`
    border-top-left-radius: 0;

    border-bottom-left-radius: 0;

    border-top-right-radius: 5px;

    border-bottom-right-radius: 5px;

    height: 34px;

    width: 32px;

    text-align: center;

    display: flex;

    align-items: center;

    justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter By Nama Supplier"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />

        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
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
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
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

    const data = products.map((item) => {
        return {
            id: item.id,
            barcode: item.barcode,
            nama: item.nama,
            harga_beli: item.harga_beli,
        };
    });

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
