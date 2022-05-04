<?php

namespace App\Http\Controllers;

use App\Models\Pembelian;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\TransaksiPembelian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TransaksiPembelianController extends Controller
{
    public function index()
    {
        $pembelian_id = session('pembelian_id');
        $pembelian = Pembelian::findOrFail($pembelian_id);
        $products = Product::all();
        $supplier = Supplier::find(session('supplier_id'));
        $transaksi_pembelian = TransaksiPembelian::with('product')->where('pembelian_id', $pembelian_id)->get();

        if (!$supplier) {
            abort(404);
        }

        $dataTransaksiPembelian = array();
        $total = 0;
        $total_item = 0;

        foreach ($transaksi_pembelian as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['pembelian_id'] = $item->pembelian_id;
            $row['id'] = $item->id;
            $row['barcode'] = $item->product->barcode;
            $row['nama'] = $item->product->nama;
            $row['harga_beli'] = $item->harga_beli;
            $row['jumlah'] = $item->jumlah;
            $row['subtotal'] = $item->subtotal;
            $dataTransaksiPembelian[] = $row;

            $total += $item->harga_beli * $item->jumlah;
            $total_item += $item->jumlah;
        }

        $dataTotal = array();
        $dataTotal['total'] = $total;
        $dataTotal['terbilang'] = ucwords(terbilang($total) . ' Rupiah');
        $dataTotal['total_item'] = $total_item;

        return Inertia::render('Dashboard/Transaction/CreatePembelian', [
            'pembelian' => $pembelian,
            'products' => $products,
            'supplier' => $supplier,
            'dataTransaksiPembelian' => $dataTransaksiPembelian,
            'dataTotal' => $dataTotal
        ]);
    }

    public function store(Request $request)
    {
        $product = Product::where('barcode', $request->barcode)->first();
        if (!$product) {
            return redirect()->back()->withErrors("Produk Tidak Ditemukan");
        }

        $trx = new TransaksiPembelian();
        $trx->pembelian_id = $request->pembelian_id;
        $trx->product_id = $product->id;
        $trx->harga_beli = $product->harga_beli;
        $trx->jumlah = 1;
        $trx->subtotal = $product->harga_beli;
        $trx->save();

        return Redirect::route('transaksi_pembelian');
    }

    public function update(Request $request)
    {
        $trx = TransaksiPembelian::find($request->id);
        $trx->jumlah = $request->jumlah;
        $trx->subtotal = $trx->harga_beli * $request->jumlah;
        $trx->update();

        return Redirect::route('transaksi_pembelian');
    }

    public function destroy(TransaksiPembelian $transaksiPembelian)
    {
        try {
            $transaksiPembelian->delete();
            return redirect()->route("transaksi_pembelian");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
