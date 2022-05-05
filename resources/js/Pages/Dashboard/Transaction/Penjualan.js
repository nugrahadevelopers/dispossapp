import React, { useMemo, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";

import DataTable from "react-data-table-component";
import styled from "styled-components";
import FilterButton from "@/Components/FilterButton";
import CustomTableActionButton from "@/Components/CustomTableActionButton";
import DeleteModal from "@/Components/DeleteModal";
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
            placeholder="Filter By Kasir"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />

        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
);

const onEdit = (row) => {
    alert("Edit Pembelian " + row.supplier);
};

export default function Penjualan(props) {
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState("");

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
            selector: (row) => row.nomor_trx_penjualan,
            sortable: true,
            width: "15%",
        },
        {
            name: "Tanggal",
            selector: (row) => row.created_at,
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
            name: "Diterima",
            selector: (row) => row.diterima,
            sortable: true,
        },
        {
            name: "Kasir",
            selector: (row) => row.user,
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

    const data = props.penjualan;

    const filteredItems = data.filter(
        (item) =>
            item.user &&
            item.user
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
            <Head title="Penjualan" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Daftar Penjualan
                        </div>
                        <div className="p-6">
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

                        <DeleteModal
                            dialogTitle="Hapus Transaksi"
                            isOpenProps={isOpenDelete}
                            closeModal={closeModalDelete}
                            dataEdit={dataDelete}
                            routeURL="penjualan.destroy"
                            penjualan={true}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
