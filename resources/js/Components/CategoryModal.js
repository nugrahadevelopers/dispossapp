import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Dialog, Transition } from "@headlessui/react";
import FormInput from "./FormInput";
import ValidationErrors from "./ValidationErrors";

export default function CategoryModal({
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
        nama: "",
    });

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpenProps != isOpen) {
            setIsOpen(isOpenProps);
        }

        if (dataEdit != null) {
            setData(dataEdit);
        }

        return () => {
            reset("nama");
        };
    }, [isOpenProps, dataEdit]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submitData = (e) => {
        e.preventDefault();

        if (isUpdate) {
            put(route("category.update", data.id));
            setIsOpen(!isOpen);
        } else if (isDelete) {
            destroy(route("category.destroy", data.id));
            setIsOpen(!isOpen);
        } else {
            post(route("category.store"), {
                onSuccess: setIsOpen(!isOpen),
            });
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
                    {/* <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span> */}
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
                                className="text-lg mb-4 font-semibold leading-6 text-gray-900"
                            >
                                {dialogTitle}
                            </Dialog.Title>

                            <ValidationErrors errors={errors} />

                            <form onSubmit={submitData}>
                                <div className="mt-8">
                                    <div className="flex items-center justify-center gap-4">
                                        <label
                                            htmlFor="nama"
                                            className="text-lg font-semibold"
                                        >
                                            Kategori
                                        </label>
                                        <FormInput
                                            type="text"
                                            name="nama"
                                            value={data.nama}
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                            placeholder="Nama Kategori"
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
