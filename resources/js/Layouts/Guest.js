import React from "react";

export default function Guest({ children, setting }) {
    return (
        <div className="min-h-screen flex bg-white">
            <div className="w-1/2 flex items-center justify-center">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4">
                    {children}
                </div>
            </div>

            <div className="w-1/2 flex flex-col items-center justify-between bg-green-600">
                <div className="mt-36 flex flex-col items-center justify-center">
                    <img src="/img/basket.png" alt="aplication logo" />
                    <div className="mt-8 text-3xl font-semibold text-white">
                        {setting.nama_perusahaan}
                    </div>
                    <div className="w-24 mt-2 border border-b-2 border-white"></div>
                </div>
                <div className="mb-4">
                    <img src="/img/img_login_2.png" alt="pos" />
                </div>
            </div>
        </div>
    );
}
