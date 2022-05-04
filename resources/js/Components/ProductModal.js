import React, { Fragment, useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import FormInput from "./FormInput";

export default function ProductModal({
    isOpenProps,
    closeModal,
    dialogTitle,
    isUpdate,
    isDelete,
    dataEdit,
}) {
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        barcode: "",
        nama: "",
        category_id: "",
        merk: "",
        harga_beli: "",
        harga_jual: "",
        diskon: "",
        stock: "",
        satuan: "",
    });

    const { categories } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(categories[0]);

    useEffect(() => {
        if (isOpenProps != isOpen) {
            setIsOpen(isOpenProps);
        }

        if (dataEdit != null) {
            setData(dataEdit);
        } else {
            setData("category_id", selected.id.toString());
        }

        return () => {
            reset(
                "nama",
                "barcode",
                "category_id",
                "merk",
                "harga_beli",
                "harga_jual",
                "diskon",
                "stock",
                "satuan"
            );
        };
    }, [isOpenProps, dataEdit, selected]);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.validity.valid
                ? event.target.value
                : "Hanya boleh angka"
        );
    };

    const submitData = (e) => {
        e.preventDefault();

        if (isUpdate) {
            put(route("product.update", data.id));
            setIsOpen(!isOpen);
        } else if (isDelete) {
            destroy(route("product.destroy", data.id));
            setIsOpen(!isOpen);
        } else {
            post(route("product.store"));
            setIsOpen(!isOpen);
        }
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
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-tl-2xl rounded-bl-2xl border border-l-8 border-orange-500">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-semibold leading-6 text-gray-900"
                            >
                                {dialogTitle}
                            </Dialog.Title>
                            <form onSubmit={submitData}>
                                <div className="mt-16 flex flex-col gap-4">
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="barcode"
                                            className="text-lg font-semibold"
                                        >
                                            Barcode
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                patern="[0-9]*"
                                                name="barcode"
                                                value={data.barcode}
                                                isFocused={true}
                                                handleChange={onHandleChange}
                                                placeholder="Barcode Produk"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="nama"
                                            className="text-lg font-semibold"
                                        >
                                            Nama
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                name="nama"
                                                value={data.nama}
                                                handleChange={onHandleChange}
                                                placeholder="Nama Produk"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="category_id"
                                            className="text-lg font-semibold"
                                        >
                                            Kategory
                                        </label>
                                        <div className="z-10 col-span-2">
                                            <Listbox
                                                name="category_id"
                                                value={selected.id}
                                                onChange={setSelected}
                                            >
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                        <span className="block truncate">
                                                            {selected.nama}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            V
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                                                            {categories.map(
                                                                (category) => (
                                                                    <Listbox.Option
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        className={({
                                                                            active,
                                                                        }) =>
                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                                active
                                                                                    ? "bg-amber-100 text-amber-900"
                                                                                    : "text-gray-900"
                                                                            }`
                                                                        }
                                                                        value={
                                                                            category
                                                                        }
                                                                    >
                                                                        {({
                                                                            selected,
                                                                        }) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${
                                                                                        selected
                                                                                            ? "font-medium"
                                                                                            : "font-normal"
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        category.nama
                                                                                    }
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                        V
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                )
                                                            )}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="merk"
                                            className="text-lg font-semibold"
                                        >
                                            Merk
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                name="merk"
                                                value={data.merk}
                                                handleChange={onHandleChange}
                                                placeholder="Merk Produk"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="harga_beli"
                                            className="text-lg font-semibold"
                                        >
                                            Harga Beli
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                patern="[0-9]*"
                                                name="harga_beli"
                                                value={data.harga_beli}
                                                handleChange={onHandleChange}
                                                placeholder="Harga Beli"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="harga_jual"
                                            className="text-lg font-semibold"
                                        >
                                            Harga Jual
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                patern="[0-9]*"
                                                name="harga_jual"
                                                value={data.harga_jual}
                                                handleChange={onHandleChange}
                                                placeholder="Harga Jual"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="diskon"
                                            className="text-lg font-semibold"
                                        >
                                            Diskon
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                patern="[0-9]*"
                                                name="diskon"
                                                value={data.diskon}
                                                handleChange={onHandleChange}
                                                placeholder="Diskon"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="stock"
                                            className="text-lg font-semibold"
                                        >
                                            Stock
                                        </label>
                                        <FormInput
                                            type="text"
                                            patern="[0-9]*"
                                            name="stock"
                                            value={data.stock}
                                            handleChange={onHandleChange}
                                            placeholder="Stock"
                                        />
                                        <FormInput
                                            type="text"
                                            name="satuan"
                                            value={data.satuan}
                                            handleChange={onHandleChange}
                                            placeholder="Satuan"
                                        />
                                    </div>
                                </div>

                                <div className="mt-16 flex justify-between">
                                    <div></div>
                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                                            disabled={processing}
                                        >
                                            {isUpdate
                                                ? "Perbarui"
                                                : isDelete
                                                ? "Hapus"
                                                : "Simpan"}
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                                            onClick={closeModal}
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
