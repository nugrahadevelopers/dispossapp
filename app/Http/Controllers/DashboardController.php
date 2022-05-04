<?php

namespace App\Http\Controllers;

use App\Models\Pembelian;
use App\Models\Pengeluaran;
use App\Models\Penjualan;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $tanggalAwal = date('Y-m-01');
        $tanggalAkhir = date('Y-m-d');

        $jumlahProduct = Product::count();
        $jumlahSupplier = Supplier::count();

        $pendapatan = 0;
        $total_pendapatan_kotor = 0;
        $total_pendapatan_bersih = 0;
        $data_tanggal = array();
        $data_pendapatan_bersih = array();
        $data_pendapatan_kotor = array();

        while (strtotime($tanggalAwal) <= strtotime($tanggalAkhir)) {
            $data_tanggal[] = (int) substr($tanggalAwal, 8, 2);

            $total_penjualan = Penjualan::where('created_at', 'LIKE', "%$tanggalAwal%")->sum('bayar');
            $total_pembelian = Pembelian::where('created_at', 'LIKE', "%$tanggalAwal%")->sum('bayar');
            $total_pengeluaran = Pengeluaran::where('created_at', 'LIKE', "%$tanggalAwal%")->sum('nominal');

            $pendapatan = $total_penjualan - $total_pembelian - $total_pengeluaran;
            $total_pendapatan_bersih += $pendapatan;
            $total_pendapatan_kotor += $total_penjualan;
            $data_pendapatan_bersih[] += $pendapatan;
            $data_pendapatan_kotor[] += $total_penjualan;

            $tanggalAwal = date('Y-m-d', strtotime("+1 day", strtotime($tanggalAwal)));
        }

        $tanggalAwal = date('Y-m-01');

        return Inertia::render('Dashboard/Dashboard', [
            'dataPendapatanBersih' => $data_pendapatan_bersih,
            'dataPendapatanKotor' => $data_pendapatan_kotor,
            'totalPendapatanKotor' => format_uang($total_pendapatan_kotor),
            'totalPendapatanBersih' => format_uang($total_pendapatan_bersih),
            'tanggalAwal' => $tanggalAwal,
            'tanggalAkhir' => $tanggalAkhir,
            'data_tanggal' => $data_tanggal,
            'jumlahProduct' => $jumlahProduct,
            'jumlahSupplier' => $jumlahSupplier,
        ]);
    }
}
