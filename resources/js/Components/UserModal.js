import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Dialog, Transition } from "@headlessui/react";
import FormInput from "./FormInput";
import ValidationErrors from "./ValidationErrors";

export default function UserModal({
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
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpenProps != isOpen) {
            setIsOpen(isOpenProps);
        }

        if (dataEdit != null) {
            setData(dataEdit);
        }
    }, [isOpenProps, dataEdit]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submitData = (e) => {
        e.preventDefault();

        if (isUpdate) {
            put(route("user.update", data.id));
            Object.keys(errors).length > 0 ? setIsOpen(true) : setIsOpen(false);
        } else if (isDelete) {
            destroy(route("user.destroy", data.id));
            Object.keys(errors).length > 0 ? setIsOpen(true) : setIsOpen(false);
        } else {
            post(route("user.store"));
            Object.keys(errors).length > 0 ? setIsOpen(true) : setIsOpen(false);
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

                            <ValidationErrors errors={errors} />

                            <form onSubmit={submitData}>
                                <div className="mt-16 flex flex-col gap-4">
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="name"
                                            className="text-sm font-semibold"
                                        >
                                            Nama
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                isFocused={true}
                                                handleChange={onHandleChange}
                                                placeholder="Nama User"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-semibold"
                                        >
                                            Email
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="text"
                                                name="email"
                                                value={data.email}
                                                handleChange={onHandleChange}
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-semibold"
                                        >
                                            Password
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                handleChange={onHandleChange}
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 grid-cols-3 grid-rows-1 items-center">
                                        <label
                                            htmlFor="password_confirmation"
                                            className="text-sm font-semibold"
                                        >
                                            Konfirmasi Password
                                        </label>
                                        <div className="col-span-2">
                                            <FormInput
                                                type="password"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                handleChange={onHandleChange}
                                                placeholder="Konfirmasi Password"
                                            />
                                        </div>
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
