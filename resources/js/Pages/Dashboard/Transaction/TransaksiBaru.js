import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import PilihProductModal from "@/Components/PilihProductModal";

import DataTable from "react-data-table-component";
import RowButton from "@/Components/RowButton";
import TransaksiPembelianModal from "@/Components/TransaksiPembelianModal";
import RowInput from "@/Components/RowInput";
import FormInput from "@/Components/FormInput";
import { Inertia } from "@inertiajs/inertia";
import TransaksiPenjualanModal from "@/Components/TransaksiPenjualanModal";

export default function TransaksiBaru(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState("");
    const [diskon, setDiskon] = useState(0);
    const [bayar, setBayar] = useState(0);
    const [diterima, setDiterima] = useState(0);
    const [kembali, setKembali] = useState(0);

    const diskonOnChange = (e) => {
        setDiskon(e.target.value);
    };

    const diterimaOnChange = (e) => {
        setDiterima(e.target.value);
    };

    useEffect(() => {
        hitungBayar();
        hitungKembali();
    }, [diskonOnChange, diterimaOnChange]);

    const hitungBayar = () => {
        let nomTotal = props.dataTotal.total;
        let nomDiskon = diskon / 100;
        let nomTotalBayar = nomTotal - nomTotal * nomDiskon;
        setBayar(nomTotalBayar);
    };

    const hitungKembali = () => {
        let nomKembali = diterima != 0 ? diterima - bayar : 0;
        setKembali(nomKembali);
    };

    const { data, setData, post } = useForm({
        penjualan_id: "",
        barcode: "",
        jumlah: "",
    });

    const childToParent = (childData) => {
        setData({
            penjualan_id: props.penjualan.id,
            barcode: childData.barcode,
        });
    };

    const closeModal = (status) => {
        setIsOpen(status);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModalDelete = () => {
        setIsOpenDelete(false);
    };

    const hapusData = (row) => {
        setDataDelete(row);
        setIsOpenDelete(true);
    };

    const columns = [
        {
            name: "No",
            selector: (row) => row.no,
            width: "5%",
        },
        {
            name: "Barcode",
            selector: (row) => row.barcode,
            width: "10%",
        },
        {
            name: "Nama",
            selector: (row) => row.nama,
        },
        {
            name: "Harga",
            selector: (row) => row.harga_jual,
        },
        {
            name: "Jumlah",
            cell: (row) => (
                <RowInput routeURL="transaksi_penjualan.update" row={row} />
            ),
        },
        {
            name: "Diskon",
            selector: (row) => row.diskon,
        },
        {
            name: "Subtotal",
            selector: (row) => row.subtotal,
        },
        {
            name: "Aksi",
            cell: (row) => (
                <RowButton onPilihRow={hapusData} row={row} btnColor="red">
                    Hapus
                </RowButton>
            ),
            allowOverflow: true,
            button: true,
            width: "120px",
        },
    ];

    const dataOnTable = props.dataTransaksiPenjualan;

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submitData = (e) => {
        e.preventDefault();
        post(route("transaksi_penjualan.store"));
    };

    const simpanPenjualan = (e) => {
        e.preventDefault();

        Inertia.visit(route("penjualan.store"), {
            method: "post",
            data: {
                penjualan_id: props.penjualan.id,
                total_item: props.dataTotal.total_item,
                total: props.dataTotal.total,
                diskon: diskon,
                bayar: bayar,
                diterima: diterima,
            },
        });
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Transaksi Penjualan" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Transaksi Penjualan
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between pb-4 mb-4 border-b border-gray-100">
                                <div className="flex flex-col gap-2 text-sm"></div>
                                <div className="text-sm">
                                    No Transaksi :{" "}
                                    {props.penjualan.nomor_trx_penjualan}
                                </div>
                            </div>
                            <div className="text-sm flex items-center justify-center gap-4 pb-4 mb-4 border-b border-gray-100">
                                <div>Kode Produk</div>
                                <form onSubmit={submitData}>
                                    <div className="flex item-center">
                                        <input
                                            type="hidden"
                                            name="penjualan_id"
                                            value={data.penjualan_id}
                                        />
                                        <input
                                            type="text"
                                            name="barcode"
                                            value={data.barcode}
                                            onChange={onHandleChange}
                                            className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full pr-10 border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-600 transition delay-100 px-4 py-2 mr-4 rounded-sm text-white"
                                        >
                                            Input
                                        </button>
                                        <button
                                            type="button"
                                            onClick={openModal}
                                            className="bg-green-500 hover:bg-green-600 transition delay-100 px-4 py-2 rounded-sm text-white"
                                        >
                                            Cari
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-sm pb-4 mb-4 border-b border-gray-100">
                                <DataTable
                                    columns={columns}
                                    data={dataOnTable}
                                    pagination
                                    persistTableHead
                                    highlightOnHover
                                    pointerOnHover
                                />
                            </div>
                            <form onSubmit={simpanPenjualan}>
                                <div className="text-sm flex pb-4 mb-4 border-b border-gray-100">
                                    <div className="w-2/3">
                                        <div className="bg-green-500 h-32 flex items-center justify-center text-2xl font-semibold text-white">
                                            {diterima != 0
                                                ? `Kembali : Rp ${kembali}`
                                                : `Bayar : Rp ${props.dataTotal.total}`}
                                        </div>
                                        <div className="bg-green-100 py-2 px-2 flex items-center justify-start text-sm">
                                            {props.dataTotal.terbilang}
                                        </div>
                                    </div>
                                    <div className="bg-green-50 w-1/3">
                                        <div className="p-2">
                                            <input
                                                type="hidden"
                                                name="penjualan_id"
                                                value={props.penjualan.id}
                                            />

                                            <div className="grid grid-cols-3 grid-rows-1 items-center mb-1">
                                                <div>
                                                    <label htmlFor="total">
                                                        Total
                                                    </label>
                                                </div>
                                                <div className="col-span-2 flex items-center gap-1">
                                                    Rp.{" "}
                                                    <FormInput
                                                        name="total"
                                                        value={
                                                            props.dataTotal
                                                                .total
                                                        }
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 grid-rows-1 items-center mb-1">
                                                <div>
                                                    <label htmlFor="diskon">
                                                        Diskon
                                                    </label>
                                                </div>
                                                <div className="col-span-2 flex items-center gap-1">
                                                    %&nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        name="diskon"
                                                        value={diskon}
                                                        onChange={
                                                            diskonOnChange
                                                        }
                                                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 grid-rows-1 items-center">
                                                <div>
                                                    <label htmlFor="bayar">
                                                        Bayar
                                                    </label>
                                                </div>
                                                <div className="col-span-2 flex items-center gap-1">
                                                    Rp.{" "}
                                                    <FormInput
                                                        name="bayar"
                                                        value={bayar}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 grid-rows-1 items-center">
                                                <div>
                                                    <label htmlFor="bayar">
                                                        Diterima
                                                    </label>
                                                </div>
                                                <div className="col-span-2 flex items-center gap-1">
                                                    Rp.{" "}
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        name="diterima"
                                                        value={diterima}
                                                        onChange={
                                                            diterimaOnChange
                                                        }
                                                        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 grid-rows-1 items-center">
                                                <div>
                                                    <label htmlFor="bayar">
                                                        Kembali
                                                    </label>
                                                </div>
                                                <div className="col-span-2 flex items-center gap-1">
                                                    Rp.{" "}
                                                    <FormInput
                                                        name="kembali"
                                                        value={kembali}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm flex justify-between pb-4">
                                    <div></div>
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm"
                                    >
                                        Simpan Transaksi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <PilihProductModal
                dialogTitle="Pilih Produk"
                isOpenProps={isOpen}
                closeModal={closeModal}
                childToParent={childToParent}
            />

            <TransaksiPenjualanModal
                dialogTitle="Hapus Produk"
                isOpenProps={isOpenDelete}
                closeModal={closeModalDelete}
                dataEdit={dataDelete}
            />
        </Authenticated>
    );
}
