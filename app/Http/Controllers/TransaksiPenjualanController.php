<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use App\Models\Product;
use App\Models\TransaksiPenjualan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TransaksiPenjualanController extends Controller
{
    public function index()
    {
        $penjualan_id = session('penjualan_id');
        $penjualan = Penjualan::findOrFail($penjualan_id);
        $products = Product::all();
        $transaksi_penjualan = TransaksiPenjualan::with('product')->where('penjualan_id', $penjualan_id)->get();

        $dataTransaksiPenjualan = array();
        $total = 0;
        $total_item = 0;

        foreach ($transaksi_penjualan as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['penjualan_id'] = $item->penjualan_id;
            $row['id'] = $item->id;
            $row['barcode'] = $item->product->barcode;
            $row['nama'] = $item->product->nama;
            $row['harga_jual'] = $item->harga_jual;
            $row['jumlah'] = $item->jumlah;
            $row['diskon'] = $item->diskon;
            $row['subtotal'] = $item->subtotal;
            $dataTransaksiPenjualan[] = $row;

            $total += $item->harga_jual * $item->jumlah - (($item->diskon * $item->jumlah) / 100 * $item->harga_jual);
            $total_item += $item->jumlah;
        }

        $dataTotal = array();
        $dataTotal['total'] = $total;
        $dataTotal['terbilang'] = ucwords(terbilang($total) . ' Rupiah');
        $dataTotal['total_item'] = $total_item;

        return Inertia::render('Dashboard/Transaction/TransaksiBaru', [
            'penjualan' => $penjualan,
            'products' => $products,
            'dataTransaksiPenjualan' => $dataTransaksiPenjualan,
            'dataTotal' => $dataTotal
        ]);
    }

    public function store(Request $request)
    {
        $product = Product::where('barcode', $request->barcode)->first();
        if (!$product) {
            return redirect()->back()->withErrors("Produk Tidak Ditemukan");
        }

        $trx = new TransaksiPenjualan();
        $trx->penjualan_id = $request->penjualan_id;
        $trx->product_id = $product->id;
        $trx->harga_jual = $product->harga_jual;
        $trx->jumlah = 1;
        $trx->diskon = $product->diskon;
        $trx->subtotal = $product->harga_jual - ($product->diskon / 100 * $product->harga_jual);
        $trx->save();

        return Redirect::route('transaksi_penjualan');
    }

    public function update(Request $request)
    {
        $trx = TransaksiPenjualan::find($request->id);
        $trx->jumlah = $request->jumlah;
        $trx->subtotal = $trx->harga_jual * $request->jumlah - (($trx->diskon * $request->jumlah) / 100 * $trx->harga_jual);
        $trx->update();

        return Redirect::route('transaksi_penjualan');
    }

    public function destroy(TransaksiPenjualan $transaksiPenjualan)
    {
        try {
            $transaksiPenjualan->delete();
            return redirect()->route("transaksi_penjualan");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
