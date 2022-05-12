import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Report Bulanan",
            },
        },
    };

    const labels = props.data_tanggal.map((item) => {
        return item;
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Laba Total",
                borderColor: "rgb(225, 89, 12)",
                backgroundColor: "rgba(225, 89, 12, 0.5)",
                data: props.dataPendapatanKotor.map((item) => {
                    return item;
                }),
            },
            {
                label: "Laba Bersih",
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                data: props.dataPendapatanBersih.map((item) => {
                    return item;
                }),
            },
        ],
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <div className="py-12 container">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center gap-6">
                        <div className="bg-green-600 shadow-lg rounded-t-3xl rounded-br-3xl">
                            <div className="w-60 p-6 text-center text-3xl font-semibold text-white">
                                Rp. {props.totalPendapatanKotor}
                            </div>
                            <div className="mr-6">
                                <div className="py-1 px-2 font-semibold text-lg bg-yellow-500 rounded-tr-full rounded-br-full">
                                    Laba Total
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-600 shadow-lg rounded-t-3xl rounded-br-3xl">
                            <div className="w-60 p-6 text-center text-3xl font-semibold text-white">
                                Rp. {props.totalPendapatanBersih}
                            </div>
                            <div className="mr-6">
                                <div className="py-1 px-2 font-semibold text-lg bg-yellow-500 rounded-tr-full rounded-br-full">
                                    Laba Bersih
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-600 shadow-lg rounded-t-3xl rounded-br-3xl">
                            <div className="w-60 p-6 text-center text-3xl font-semibold text-white">
                                {props.jumlahProduct}
                            </div>
                            <div className="mr-6">
                                <div className="py-1 px-2 font-semibold text-lg bg-yellow-500 rounded-tr-full rounded-br-full">
                                    Total Produk
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-600 shadow-lg rounded-t-3xl rounded-br-3xl">
                            <div className="w-60 p-6 text-center text-3xl font-semibold text-white">
                                {props.jumlahSupplier}
                            </div>
                            <div className="mr-6">
                                <div className="py-1 px-2 font-semibold text-lg bg-yellow-500 rounded-tr-full rounded-br-full">
                                    Total Supplier
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8 p-4 bg-white rounded-md shadow-sm">
                        <Line options={options} data={data} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
