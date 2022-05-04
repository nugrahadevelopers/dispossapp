import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";

function popupCenter(url, title, w, h) {
    const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
    const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
        url,
        title,
        `
        scrollbars=yes,
        width  = ${w / systemZoom}, 
        height = ${h / systemZoom}, 
        top    = ${top}, 
        left   = ${left}
    `
    );

    if (window.focus) newWindow.focus();
}

export default function TransaksiSelesai(props) {
    const notaKecil = (title = "Nota") => {
        popupCenter(route("penjualan.notakecil"), title, 625, 500);
    };
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Transaksi Selesai" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md">
                        <div className="p-2 bg-green-600 font-semibold text-xl text-white">
                            Transaksi Selesai
                        </div>
                        <div className="p-6">
                            <div className="bg-green-400 text-sm text-white px-2 py-2 rounded-sm">
                                Transaksi Telah Selesai
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={notaKecil}
                                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-sm text-white font-semibold mr-4"
                                >
                                    Cetak Nota
                                </button>
                                <Link href={route("penjualan.create")}>
                                    <span className="px-4 py-3 bg-green-500 hover:bg-green-600 rounded-sm text-white font-semibold">
                                        Transaksi Baru
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
