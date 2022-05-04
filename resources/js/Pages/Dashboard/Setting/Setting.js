import React, { useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function Setting(props) {
    const { data, setData, post, processing, errors } = useForm({
        nama_perusahaan: "",
        telepon: "",
        alamat: "",
    });

    useEffect(() => {
        setData({
            nama_perusahaan: props.setting.nama_perusahaan,
            telepon: props.setting.telepon,
            alamat: props.setting.alamat,
        });
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submitData = (e) => {
        e.preventDefault();

        post(route("setting.update"));
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Setting" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Pengaturan
                        </div>
                        <div className="p-6">
                            {Object.keys(errors).length > 0 ? (
                                <div className="px-4 py-2 text-sm text-white bg-red-600 rounded mb-4">
                                    Ada Error
                                </div>
                            ) : (
                                ""
                            )}
                            <form onSubmit={submitData}>
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                        <label htmlFor="nama_perusahaan">
                                            Nama Perusahaan
                                        </label>
                                        <input
                                            type="text"
                                            name="nama_perusahaan"
                                            value={data.nama_perusahaan}
                                            onChange={onHandleChange}
                                            className="col-span-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                            placeholder="Nama Perusahaan"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                        <label htmlFor="telepon">Telepon</label>
                                        <input
                                            type="text"
                                            pattern="[0-9]*"
                                            name="telepon"
                                            value={data.telepon}
                                            onChange={onHandleChange}
                                            className="col-span-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                            placeholder="Telepon"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                        <label htmlFor="alamat">Alamat</label>
                                        <textarea
                                            name="alamat"
                                            rows="5"
                                            value={data.alamat}
                                            onChange={onHandleChange}
                                            className="col-span-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none w-full border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200"
                                            placeholder="Alamat Perusahaan"
                                        ></textarea>
                                    </div>
                                    <div className="flex items-center justify-end border-t border-gray-200 pt-4 mt-4">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
                                            disabled={processing}
                                        >
                                            Simpan
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
