import React, { useMemo, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";

import DataTable from "react-data-table-component";
import styled from "styled-components";
import FilterButton from "@/Components/FilterButton";
import CustomTableActionButton from "@/Components/CustomTableActionButton";
import CategoryModal from "@/Components/CategoryModal";
import PengeluaranModal from "@/Components/PengeluaranModal";
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
            placeholder="Filter By Deskripsi"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />

        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
);

export default function Pengeluaran(props) {
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [dataEdit, setDataEdit] = useState("");
    const [dataDelete, setDataDelete] = useState("");

    // Tambah Pengeluaran
    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    // Edit Pengeluaran
    const closeModalEdit = () => {
        setIsOpenEdit(false);
    };

    const openModalEdit = (row) => {
        setDataEdit(row);
        setIsOpenEdit(true);
    };

    // Hapus Pengeluaran
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
            name: "Dibuat",
            selector: (row) => row.created_at,
            sortable: true,
            width: "100px",
        },
        {
            name: "Diubah",
            selector: (row) => row.updated_at,
            sortable: true,
            width: "100px",
        },
        {
            name: "Nomor Transaksi",
            selector: (row) => row.nomor_trx_pengeluaran,
            sortable: true,
        },
        {
            name: "Deskripsi",
            selector: (row) => row.deskripsi,
            sortable: true,
        },
        {
            name: "Nominal",
            selector: (row) => row.nominal,
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

    const dataOnTable = props.pengeluaran;

    const filteredItems = dataOnTable.filter(
        (item) =>
            item.deskripsi &&
            item.deskripsi
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

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Pengeluaran" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Daftar Pengeluaran
                        </div>
                        <div className="p-6">
                            <button
                                onClick={openModal}
                                className="w-32 p-1 mb-5 bg-green-600 hover:bg-orange-600 transition delay-150 rounded-full shadow-md flex items-center justify-center text-white text-xl font-semibold"
                            >
                                Tambah
                            </button>
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

                        <PengeluaranModal
                            dialogTitle="Tambah Pengeluaran"
                            isOpenProps={isOpen}
                            closeModal={closeModal}
                            isUpdate={false}
                        />

                        <PengeluaranModal
                            dialogTitle="Edit Pengeluaran"
                            isOpenProps={isOpenEdit}
                            closeModal={closeModalEdit}
                            isUpdate={true}
                            dataEdit={dataEdit}
                        />

                        <PengeluaranModal
                            dialogTitle="Hapus Pengeluaran"
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
