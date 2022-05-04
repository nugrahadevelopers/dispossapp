<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use App\Models\Product;
use App\Models\Setting;
use App\Models\TransaksiPenjualan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenjualanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $penjualan = Penjualan::with('user')->get();

        $data = array();

        foreach ($penjualan as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['id'] = $item->id;
            $row['nomor_trx_penjualan'] = $item->nomor_trx_penjualan;
            $row['created_at'] = tanggal_indonesia($item->created_at, false);
            $row['total_item'] = $item->total_item;
            $row['total_harga'] = $item->total_harga;
            $row['diskon'] = $item->diskon;
            $row['bayar'] = $item->bayar;
            $row['diterima'] = $item->diterima;
            $row['user'] = $item->user->name;
            $data[] = $row;
        }

        return Inertia::render('Dashboard/Transaction/Penjualan', [
            'penjualan' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $penjualan = new Penjualan();
        $penjualan->nomor_trx_penjualan = 'DJTRX_' . date('Y.m.d') . '_' . rand(1000, 1999);
        $penjualan->total_item = 0;
        $penjualan->total_harga = 0;
        $penjualan->diskon = 0;
        $penjualan->bayar = 0;
        $penjualan->diterima = 0;
        $penjualan->user_id = auth()->id();
        $penjualan->save();

        session(['penjualan_id' => $penjualan->id]);

        return redirect()->route('transaksi_penjualan');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $penjualan = Penjualan::findOrFail($request->penjualan_id);
        $penjualan->total_item = $request->total_item;
        $penjualan->total_harga = $request->total;
        $penjualan->diskon = $request->diskon;
        $penjualan->bayar = $request->bayar;
        $penjualan->diterima = $request->diterima;
        $penjualan->update();

        $detail = TransaksiPenjualan::where('penjualan_id', $penjualan->id)->get();
        foreach ($detail as $item) {
            $item->diskon = $request->diskon;
            $item->update();

            $produk = Product::find($item->product_id);
            $produk->stock -= $item->jumlah;
            $produk->update();
        }

        return redirect()->route('penjualan.selesai');
    }

    public function selesai()
    {
        return Inertia::render('Dashboard/Transaction/TransaksiSelesai');
    }

    public function notaKecil()
    {
        $penjualan = Penjualan::find(session('penjualan_id'));
        if (!$penjualan) {
            abort(404);
        }

        $setting = Setting::first();
        $detail = TransaksiPenjualan::with('product')->where('penjualan_id', session('penjualan_id'))->get();

        return view("penjualan.nota_kecil", compact('penjualan', 'detail', 'setting'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Penjualan  $penjualan
     * @return \Illuminate\Http\Response
     */
    public function show(Penjualan $penjualan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Penjualan  $penjualan
     * @return \Illuminate\Http\Response
     */
    public function edit(Penjualan $penjualan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Penjualan  $penjualan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Penjualan $penjualan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Penjualan  $penjualan
     * @return \Illuminate\Http\Response
     */
    public function destroy(Penjualan $penjualan)
    {
        try {
            $penjualan->delete();
            return redirect()->route("penjualan");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
